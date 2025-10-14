# Installation Guide - GoodChop Menu Replacement

Before using this application, you need to complete this **one-time setup** of AWS and Kubectl.

If you're not a technical person, it is recommended to ask support from an Engineer to do this first setup. Although you can also try it out as the doc was written to make it as simple as possible to follow the steps.

## Prerequisites

First of all, open your **Terminal** by going to Applications → Utilities → Terminal or Command + Space and searching for Terminal

You'll need the following tools to authenticate and work with EKS (that's done under the hood by the Good Chop Replacement application):

1. [brew](https://brew.sh/)

Install it by running the following command in your Terminal

```
sudo sh -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

It will ask for your machine password and will run for a few minutes. That's expected! Homebrew needs admin access to modify protected system folders and install developer tools. macOS asks for your password because it's running different privileged steps securely. The slowness mostly comes from downloading and configuring command-line tools and repos.

When the operation is finished, close your Terminal with Command + Q. Then open it again. This will refresh your Terminal with the new tool installed.

2. [kubelogin](https://azure.github.io/kubelogin/index.html)

Install it by running the following command in your Terminal

```
brew install Azure/kubelogin/kubelogin
```

3. [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

Install it by running the following command in your Terminal

```
brew install kubectl
```

4. Download [eksconfig.sh](https://github.com/hellofresh/hf-kubernetes/raw/master/eks/eksconfig.sh) and [eksconfig.yml](https://github.com/hellofresh/hf-kubernetes/raw/master/eks/eksconfig.yml) by clicking File → Save Page As and saving each file. Place them in a folder of your preference. The recommendation is to create a folder on your Desktop for easy access, e.g., Desktop → good-chop-menu-replacement.

If you can't access the links above, it's likely because you don't have the Github access to these files. In that case, ask support from an Engineer to download them for you.

5. Make the script executable

In your Terminal, go to the folder location where you put the downloaded files.

```
cd Desktop/good-chop-menu-replacement
```

Then run this command to make it executable

```
chmod +x eksconfig.sh
```

6. Run `eksconfig.sh` to setup your EKS Kube config by executing the following commands:

Still in the Terminal, run this command below to run the script

```
./eksconfig.sh
```

7. Make the configuration permanent (required for the app to work)

Run this command to add the KUBECONFIG to your shell configuration:

```
echo 'export KUBECONFIG=$HOME/.kube/config:$HOME/.kube/eksconfig' >> ~/.zshrc
```

Then reload your Terminal configuration:

```
source ~/.zshrc
```

**Why is this needed?** The GoodChop Menu Replacement app runs kubectl commands in new terminal windows. Without this step, those terminal windows won't know where to find your Kubernetes configuration, and the app won't work.

8. Request Kubernetes access

You now need to request access to the Kubernetes cluster by raising a ticket with the IT team [using this link](https://hellofresh.atlassian.net/servicedesk/customer/portal/4/group/252/create/1287).

In your ticket, request the following:

- **Groups**: `css_iam_eks_platform-live-eks_menu_basic` and `css_iam_eks_platform-staging-eks_menu_basic`
- **Cluster**: EKS Live
- **Namespaces**: `menu` and `new-ventures`
- **Permission level**: Admin

Add your line manager as the approver, and in the description explain why you need access. Here's an example:

```
Hi team, I need access to the following groups:

- `css_iam_eks_platform-live-eks_menu_basic` for live cluster (to access live cluster with k8s context upn-eks-live)
- `css_iam_eks_platform-staging-eks_menu_basic` for staging cluster (to access staging cluster with k8s context upn-eks-staging)

I need this access to run kubectl commands on the upn-eks-live pod in order to perform
meal replacements for the GoodChop operational team using the Box-Content-Service.
```

9. Verify your access

Once your access request is approved, open your Terminal again and run this command to test it:

```
kubectl config use-context upn-eks-live
```

**Success**: If it outputs `Switched to context "upn-eks-live"`, you're all set! Continue to the [App Installation](README.md#app-installation) section in the README.

**Error**: If it outputs `no context exists with the name "upn-eks-live"`, you'll need to ask an Engineer for support. The `#sec-eks-oidc` Slack channel is also a good resource.
