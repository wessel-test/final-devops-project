module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_name    = var.cluster_name
  cluster_version = "1.31"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  eks_managed_node_groups = {
    gui-node-group = {
      desired_size = 3
      min_size     = 1
      max_size     = 5
    }
  }

  enable_irsa = true
  cluster_endpoint_public_access = true
  cluster_endpoint_private_access = true

  depends_on = [module.vpc]
}

# Inbound Rules for Default EKS Security Group
resource "aws_security_group_rule" "allow_all_node_to_node_traffic" {
  type                     = "ingress"
  from_port                = 0
  to_port                  = 0
  protocol                 = "-1" # Allow all protocols
  source_security_group_id = aws_security_group.gui_sg.id

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_http" {
  type        = "ingress"
  from_port   = 80
  to_port     = 80
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_https" {
  type        = "ingress"
  from_port   = 443
  to_port     = 443
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_ssh" {
  type        = "ingress"
  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_frontend" {
  type        = "ingress"
  from_port   = 3000
  to_port     = 3000
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_grafana" {
  type        = "ingress"
  from_port   = 3333
  to_port     = 3333
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_redis" {
  type        = "ingress"
  from_port   = 6379
  to_port     = 6379
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_backend" {
  type        = "ingress"
  from_port   = 8706
  to_port     = 8706
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_prometheus" {
  type        = "ingress"
  from_port   = 9090
  to_port     = 9090
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_mongodb" {
  type        = "ingress"
  from_port   = 27017
  to_port     = 27017
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_kubelet_api" {
  type        = "ingress"
  from_port   = 10250
  to_port     = 10250
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_security_group_rule" "allow_read_only_kubelet_api" {
  type        = "ingress"
  from_port   = 10255
  to_port     = 10255
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]

  security_group_id = module.eks.cluster_security_group_id
}

resource "aws_iam_role" "eks_node_group_role" {
  name = var.eks_node_group_role

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Effect = "Allow"
        Sid    = ""
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "eks_node_group_policy" {
  role       = aws_iam_role.eks_node_group_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_role_policy_attachment" "eks_node_group_cni_policy" {
  role       = aws_iam_role.eks_node_group_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "eks_node_group_worker_policy" {
  role       = aws_iam_role.eks_node_group_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy" "eks_node_group_custom_policy" {
  name = "gui-eks-node-group-custom-policy"
  role = aws_iam_role.eks_node_group_role.id

  policy = var.custom_policy_statement
}

data "aws_eks_cluster_auth" "gui" {
  name = module.eks.cluster_name
}

resource "aws_eks_access_entry" "admin_access_entry" {
  cluster_name  = module.eks.cluster_name
  principal_arn = "arn:aws:iam::438465169137:user/Gui_Wessel"
  type          = "STANDARD"
}

resource "aws_iam_policy" "eks_access_policy" {
  name = "eks_access_policy_nodes"

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "EKSAccess",
        "Effect" : "Allow",
        "Action" : [
          "eks:*"
        ],
        "Resource" : "*"
      },
      {
        "Sid" : "AssumeRole",
        "Effect" : "Allow",
        "Action" : "sts:AssumeRole",
        "Resource" : "*"
      }
    ]
  })
}

resource "aws_eks_access_policy_association" "admin_policy_association" {
  cluster_name  = module.eks.cluster_name
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
  principal_arn = aws_eks_access_entry.admin_access_entry.principal_arn

  access_scope {
    type = "cluster"
  }
}

resource "aws_eks_addon" "vpc_cni" {
  cluster_name                = module.eks.cluster_name
  addon_name                  = "vpc-cni"
  addon_version               = "v1.19.2-eksbuild.1"
  resolve_conflicts_on_update = "OVERWRITE"
}

resource "aws_eks_addon" "metrics_server" {
  cluster_name                = module.eks.cluster_name
  addon_name                  = "metrics-server"
  addon_version               = "v0.7.2-eksbuild.1"
  resolve_conflicts_on_update = "OVERWRITE"
}

resource "aws_eks_addon" "coredns" {
  cluster_name                = module.eks.cluster_name
  addon_name                  = "coredns"
  addon_version               = "v1.11.4-eksbuild.2"
  resolve_conflicts_on_update = "OVERWRITE"
}

resource "aws_eks_addon" "kube_proxy" {
  cluster_name                = module.eks.cluster_name
  addon_name                  = "kube-proxy"
  addon_version               = "v1.31.3-eksbuild.2"
  resolve_conflicts_on_update = "OVERWRITE"
}

data "aws_iam_openid_connect_provider" "github_oidc_provider" {
  arn = "arn:aws:iam::438465169137:oidc-provider/token.actions.githubusercontent.com"
}

resource "aws_iam_role" "github_oidc_role" {
  name = "eks_github_oidc-${module.eks.cluster_name}"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Action" : "sts:AssumeRoleWithWebIdentity",
        "Principal" : {
          "Federated" : data.aws_iam_openid_connect_provider.github_oidc_provider.arn
        },
        "Condition" : {
          "StringEquals" : {
            "token.actions.githubusercontent.com:aud" : [
              "sts.amazonaws.com"
            ]
          },
          "StringLike" : {
            "token.actions.githubusercontent.com:sub" : "repo:wessel-test/devops-final-project:*"
          }
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "github_oidc_role_attachment" {
  role       = aws_iam_role.github_oidc_role.name
  policy_arn = aws_iam_policy.eks_access_policy.arn
}

resource "aws_eks_access_entry" "github_actions_access_entry" {
  cluster_name  = module.eks.cluster_name
  principal_arn = aws_iam_role.github_oidc_role.arn
}

resource "aws_eks_access_policy_association" "github_actions_policy_association" {
  cluster_name  = module.eks.cluster_name
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSEditPolicy"
  principal_arn = aws_iam_role.github_oidc_role.arn

  access_scope {
    type = "cluster"
  }
}

resource "helm_release" "prometheus_grafana" {
  name = "monitoring"

  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  version    = "68.3.3"

  set {
    name  = "grafana.service.type"
    value = "LoadBalancer"
  }

  set {
    name  = "prometheus.service.type"
    value = "LoadBalancer"
  }
}

resource "null_resource" "update_kubeconfig" {
  depends_on = [module.eks]

  provisioner "local-exec" {
    command = "aws eks --region me-central-1 update-kubeconfig --name gui"
  }
}
resource "null_resource" "apply_backend_service" {
  depends_on = [null_resource.update_kubeconfig]

  provisioner "local-exec" {
    command = <<EOT
      # Check if backend-service.yml exists in k8s directory
      if [ ! -f "../k8s/backend-service.yml" ]; then
        echo "Error: ../k8s/backend-service.yml not found."
        exit 1
      fi
      
      # Apply backend service configuration
      kubectl apply -f ../k8s/backend-service.yml
      
      # Wait for the service to be available and get the EXTERNAL-IP of the load balancer
      for i in {1..10}; do
        EXTERNAL_IP=$(kubectl get svc backend -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null)
        if [ ! -z "$EXTERNAL_IP" ]; then
          echo "Found EXTERNAL_IP: $EXTERNAL_IP"
          break
        fi
        echo "Waiting for backend-service to be available..."
        sleep 10
      done

      if [ -z "$EXTERNAL_IP" ]; then
        echo "Error: backend-service did not get an EXTERNAL-IP."
        exit 1
      fi
      
      # Check if frontend-deployment.yml exists in k8s directory
      if [ ! -f "../k8s/frontend-deployment.yml" ]; then
        echo "Error: ../k8s/frontend-deployment.yml not found."
        exit 1
      fi
      
      # Replace the EXTERNAL-IP in frontend-deployment.yml
      awk -v ip="$EXTERNAL_IP" '{gsub(/http:\/\/.*:8706/, "http://" ip ":8706"); print}' ../k8s/frontend-deployment.yml > temp.yml && mv temp.yml ../k8s/frontend-deployment.yml
      
      # Apply all other Kubernetes manifests in k8s directory
      kubectl apply -f ../k8s/.
    EOT
  }
}