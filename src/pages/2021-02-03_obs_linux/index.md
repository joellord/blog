---
path: "/blog/post/2021-02-03_obs_linux"
date: "2021-02-03"
title: "OBS, Overlays and Virtual Camera"
summary: "I don’t like most online presentations. I feel like looking at slide with someone reading the content is not the best way for me to learn. I’ve seen some videos that are a bit more engaging though. Using a few simple tools, I managed to get some scenes in order to provide the attendees with what I hope to be a more engaging experience."
abstract: "I don’t like most online presentations. I feel like looking at slide with someone reading the content is not the best way for me to learn. I’ve seen some videos that are a bit more engaging though. Using a few simple tools, I managed to get some scenes in order to provide the attendees with what I hope to be a more engaging experience."
author: "Joel Lord"
formattedDate: "February 3rd, 2021"
keywords: ["obs", "webcam", "virtual cam", "presentation"]
banner: "machine"
---
I don’t like most online presentations. I feel like looking at slide with someone reading the content is not the best way for me to learn. I’ve seen some videos that are a bit more engaging though. Using a few simple tools, I managed to get some scenes in order to provide the attendees with what I hope to be a more engaging experience.

Here are some quick notes that I put together after a call with my co-workers.

## Streaming and Recording with OBS

For streaming or recording any video, I recommend giving OBS a try. For more information about using OBS, here is a document that explains it well. [gDoc](https://docs.google.com/document/d/1TMI60ew9HFxU8KuMg79mNrTz5RKdptYRF57E0g0HbIg/edit#heading=h.hbknutfydz2y)
OBS works on both Linux and MacOS.

When streaming or recording, it’s just a matter of creating scenes and then hitting the “Start Recording” or “Start Streaming” buttons.

## Virtual Cameras

If you want to use OBS with BlueJeans, Zoom or any other video conference software, you will need some way to add a virtual camera.

### Windows
On Windows, there is a plugin for OBS called [OBS-VirtualCam](https://obsproject.com/forum/resources/obs-virtualcam.539/). It seems fairly straightforward to use.

### Mac OS
On Mac OS, I haven’t found a way to do it on Mac OS 10.14+. I’ve asked around and the consensus seems to be that with the new permissions model, this is simply not possible anymore.

EDIT: I just noticed that MacOS should have a native support for virtual cameras built-in OBS and it seems easy enough to use.

### Linux
On Linux, it was a bit tricky but I managed to get it to work with Ubuntu.

The first thing you’ll need is v4l2loopback.  The installation process is fairly straightforward and I didn’t have any issues getting it to work on both Fedora and Ubuntu.  [v4l2loopback on Github](https://github.com/umlaeute/v4l2loopback)

Once you have it installed, you can start the virtual cameras with 

```
sudo modprobe v4l2loopback devices=1 card_label="dummy" exclusive_caps=1
```

To add more devices, you must stop v4l2loopback

```
sudo modprobe -r v4l2loopback
```

And restart it with the more than one device

```
sudo modprobe v4l2loopback devices=2 card_label=”dummy”,”flip” exclusive_caps=1,1
```

The label is not mandatory but will make your life easier when you are trying to find the camera in BlueJeans.  That exclusive_caps=1 parameter is required for v4l2loopback to work with Chrome.

If needed you can use v4l2-ctl to interact with the virtual devices you created.

In order to use that virtual camera with OBS, you will need the [obs-v4l2sink plugin](https://github.com/CatxFish/obs-v4l2sink). This is where it got tricky for me. With Ubuntu, you can go to the releases and download the .deb package. The plugin was not installed in the right folder but you can move them

```
cd /usr/lib/x86_64-linux-gnu/obs-plugins
sudo ln -s ../../obs-plugins/v4l2sink.so
```

As described in [the following issue](https://github.com/CatxFish/obs-v4l2sink/issues/14)

With Fedora, I never got the plugin to compile. If you manage to do it, feel free to update this document.

The first requirement is to have q5base-dev installed. In Fedora, the package is named “qt5-qtbase-devel” and can be installed with dnf. I followed the instructions to compile the plugin but I couldn’t get it to work, it kept complaining about not being able to find libobs.so. According to [this issue](https://github.com/CatxFish/obs-v4l2sink/issues/2#issuecomment-535124066) the trick seems to clone OBS, compile it and then link to those files but I never managed to compile OBS.

Once you have obs-v4l2sink installed, you can restart OBS. Then in Tools->v4l2sink, you can enter your device name (/dev/video#) and click start.  The device name can be found with 

```
v4l2-ctl --list-devices
```

EDIT: For Fedora 32, this package from worked for me: https://copr.fedorainfracloud.org/coprs/bluesman/obs-v4l2sink/

## Overlays
Creating scenes with OBS is relatively simple and you can do some really cool stuff with the basic tools provided there. However, if you use a web page as an overlay, you can have a lot more flexibility. The lower-third animation that I showed in the meeting was an example of such. For my next virtual presentations, I am thinking of adding a live Twitter feed on the screen.

To use a web page as a source to be displayed in your scene, you will need an additional plugin.

For Windows and MacOS, the official plugin is called [Browser Plugin](https://obsproject.com/forum/resources/browser-plugin.115/). For Linux, you can use [Linux Browser](https://github.com/bazukas/obs-linuxbrowser). I’ve downloaded the latest release and copied the files to my OBS plugins folder and it worked immediately.

Equipment
For my green screen, I use this kit [from Amazon](https://www.amazon.ca/gp/product/B00H0UVFHU/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1). It doesn’t seem to be available in the US though. It’s a simple green piece of fabric with a cheap frame. The trick here is really to have a good lighting. Aaron Parecki gives a few good tricks on how to have better lighting for your recordings [on his blog](https://aaronparecki.com/2020/03/24/4/tips-and-tools-for-remote-meetings-and-presentations).

For my camera, I use an old Android phone with the [IP Webcam](https://play.google.com/store/apps/details?id=com.pas.webcam) app. It transforms my phone into an IP Camera that I can then access via a browser or add as a source in OBS.
