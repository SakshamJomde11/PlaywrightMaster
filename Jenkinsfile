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
          bat "docker build -t ${DOCKER_IMAGE} ."
        }
      }
    }

    stage('Verify Playwright Installation') {
      steps {
        script {
          bat "docker run --ipc=host ${DOCKER_IMAGE} npx playwright --version"
        }
      }
    }

    stage('Run Tests') {
      steps {
        script {
          bat "docker run --ipc=host -v %CD%/playwright-report:/app/playwright-report ${DOCKER_IMAGE} bash -c 'npx playwright test'"
        }
      }
    }

    stage('Publish Report') {
      steps {
        script {
          archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
        }
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
