pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'playwright-auto'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/SakshamJomde11/PlaywrightMaster.git'
      }
    }

    stage('Check Docker Access') {
      steps {
        script {
          bat 'docker ps'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          bat 'docker build --no-cache -t %DOCKER_IMAGE% .'
        }
      }
    }

    stage('Run Tests') {
      steps {
        script {
          bat """
            docker run --rm --ipc=host -v %CD%/playwright-report:/app/playwright-report %DOCKER_IMAGE%
          """
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
      script {
        emailext(
          subject: "Playwright Tests: ${currentBuild.currentResult}",
          body: "Tests completed. Check the report at ${BUILD_URL}artifact/playwright-report/index.html",
          to: 'jomdesaksham2@gmail.com'
        )
      }
    }
  }
}
