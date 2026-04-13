resource "vercel_project" "lab_deployment" {
  name      = "lab6-terraform-pukhalskyi" # Ім'я проєкту у Vercel
  framework = null # Vercel сам визначить тип (Express/Node)

  git_repository = {
    type = "github"
    repo = "vladyslavpukhalskyi/lab5-cicd" # Твій актуальний репо
  }
}

resource "vercel_project_domain" "custom_domain" {
  project_id = vercel_project.lab_deployment.id
  domain     = "lab6-${var.student_id}.vercel.app"
}