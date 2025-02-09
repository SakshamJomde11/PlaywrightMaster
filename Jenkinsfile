pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'playwright-auto'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', 
        url: 'https://github.com/SakshamJomde11/PlaywrightMaster.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${DOCKER_IMAGE}")
        }
      }
    }

    stage('Run Tests') {
      steps {
        script {
          docker.image("${DOCKER_IMAGE}").run('--ipc=host')
        }
      }
    }

    stage('Publish Report') {
      steps {
        archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      emailext(
        subject: "Playwright Tests: ${currentBuild.currentResult}",
        body: "Check report: ${BUILD_URL}artifact/playwright-report/index.html",
        to: 'jomdesaksham2@gmail.com'
      )
    }
  }
}