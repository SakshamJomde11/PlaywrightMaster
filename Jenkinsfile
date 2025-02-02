pipeline {
  agent any
  options {
    timeout(time: 30, unit: 'MINUTES')
  }

  environment {
    DOCKER_IMAGE = 'playwright-auto'
    API_KEY_CREDENTIAL_ID = credentials('sakshamjomde11')
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
          docker.build("${DOCKER_IMAGE}", "-f Dockerfile .")
        }
      }
    }

    stage('Run Tests') {
      steps {
        script {
          docker.image("${DOCKER_IMAGE}").run('--ipc=host -e API_KEY=${API_KEY_CREDENTIAL_ID}').inside {
            bat 'npx playwright test --workers=4'
          }
        }
      }
    }

    stage('Publish Report') {
      steps {
        allure includeProperties: false,
               jdk: '',
               results: [[path: 'allure-results']]
        archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      emailext body: 'Tests completed. Check report at ${BUILD_URL}artifact/playwright-report/index.html',
               subject: 'Playwright Tests: ${BUILD_STATUS}',
               to: 'jomdsaksham2@gmail.com'
      script {
        node{
              bat 'docker system prune -f'
        }
      }
    }
  }
}