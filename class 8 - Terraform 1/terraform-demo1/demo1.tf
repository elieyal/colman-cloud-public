# Terraform Settings Block
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      #version = "~> 3.21" # Optional but recommended in production
    }
  }
}

# Provider Block
provider "aws" {
  profile = "default" # AWS Credentials Profile configured on your local desktop terminal  $HOME/.aws/credentials
  region  = "eu-central-1"
}

# Resource Block
resource "aws_instance" "colman-demo" {
  ami           = "ami-0669b163befffbdfc" # Amazon Linux in eu-central-1, update as per your region
  instance_type = "t2.micro"
}

output "public_ip" {
  value       = aws_instance.colman-demo.public_ip
  description = "The public IP of the web server"
}