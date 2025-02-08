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
          docker.build("${DOCKER_IMAGE}")
        }
      }
    }

    stage('Run Tests') {
      steps {
        script {
          docker.image("${DOCKER_IMAGE}").run('--ipc=host').inside {
            bat 'npx playwright test'
          }
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
      emailext body: 'Tests completed. Check report at ${BUILD_URL}artifact/playwright-report/index.html',
               subject: 'Playwright Tests: ${BUILD_STATUS}',
               to: 'jomdesaksham2@gmail.com'
    }
  }
}
