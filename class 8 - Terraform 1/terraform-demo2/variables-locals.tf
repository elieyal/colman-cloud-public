locals {
  common_tags = {
      owner = "Eli"
      usage = "demo2"
  }
  vpc_name       = "colman-cloud-demo2"
  vpc_cidr_block = "10.10.0.0/16"
  public_subnets = ["10.10.0.0/20", "10.10.16.0/20", "10.10.32.0/20"]
}