terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "angular" {
  name = "angular-app:latest"
  keep_locally = true
}

resource "docker_container" "angular" {
  name  = "angular-terraform"
  image = docker_image.angular.image_id

  ports {
    internal = 80
    external = 4200
  }

  restart = "always"
}