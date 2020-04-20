---
path: "/blog/post/2020-04-20_upgrade_openshift"
date: "2020-04-20"
title: "How To Upgrade OpenShift"
summary: "Recently, I had to explore a new version of OpenShift but I could only provision the current stable version. In this post, I describe to procedure to upgrade your cluster to a newer version using the CLI."
abstract: "Recently, I had to explore a new version of OpenShift but I could only provision the current stable version. In this post, I describe to procedure to upgrade your cluster to a newer version using the CLI."
author: "Joel Lord"
formattedDate: "April 20th, 2020"
keywords: ["openshift", "cli"]
banner: "puzzle"
---
Recently, I had to explore the new features in the new release candidate version of OpenShift. Unfortunately, I did not have access to such a cluster. So I had to use an older stable version and upgrade it. The process is simple enough, and even easily scriptable. Here is how.

## Find Your Upgrade Path
I’ve had a few issues upgrading from version 4.3.5 directly to 4.4.0-rc.8. When I tried to upgrade to 4.3.9 first, I had much more success. So it seems like a direct upgrade might now possible. In my case, the path was 4.3.5->4.3.9->4.4.0-rc.8 which worked successfully on a few attemps now.

## Update The Available Cluster Versions
You can see the list of available upgrades to you by using 

```bash
oc adm upgrade
```

You can update this list by patching the clusterversions.  To do so, tell OpenShift to query a channel to find available versions. TYou will need to specify either stable, fast or candidate and a specific version number. To find the 4.3.x stable upgrades

```bash
oc patch clusterversions/version -p '{"spec":{"channel":"stable-4.3"}}' --type=merge
```

To find the release candidates for 4.4

```bash
oc patch clusterversions/version -p '{"spec":{"channel":"candidate-4.4"}}' --type=merge
```

This process will take a few seconds. You should see the version you want to upgrade to in the list provided by `oc adm upgrade`.

## Upgrade the cluster
You are now ready to upgrade OpenShift. You can use the following command to do so.

```bash
oc adm upgrade --to=<OPENSHIFT_VERSION>
```

The process will take anywhere between 30 and 90 minutes. You can see the progress with

```bash
oc get clusterversion
```

Eventually, you will see that the upgrade was completed successfully.

That's it, that's all you need to upgrade OpenShift from the CLI. To simplify all this, I wrote a small script.

```bash
echo "Time to upgrade!"
echo "What version do you want to upgrade to?"
read OPENSHIFT_UPGRADE_VERSION
echo "Upgrading this cluster to version $OPENSHIFT_UPGRADE_VERSION"
# You might need to change the channel here
oc patch clusterversions/version -p '{"spec":{"channel":"candidate-4.4"}}' --type=merge
echo "Waiting 2 minutes for patching to happen..."
sleep 150
echo "Ready to upgrade cluster to version $OPENSHIFT_UPGRADE_VERSION"
echo "This will take approximately 30-60 minutes"
echo "You should get an update every minute or so"
oc adm upgrade --to $OPENSHIFT_UPGRADE_VERSION
sleep 120
while [ $(oc get clusterversion | awk '{print $4}' | grep True) ]; do
  echo $(oc get clusterversion | awk 'FNR == 2 { s = ""; for (i = 6; i <= NF; i++) s = s $i " "; print s }')
  sleep 120
done
echo "Cluster should have been upgraded now, you can verify here"
oc get clusterversion
```


## All Done!

That's it! You can now upgrade OpenShift to the latest version to explore the new features that are available to you.