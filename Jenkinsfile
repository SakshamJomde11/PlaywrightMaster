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

    // stage('Build Docker Image') {
    //   steps {
    //     script {
    //       // Rebuild Docker image to ensure latest dependencies
    //       bat 'docker build --no-cache -t playwright-auto .'
    //     }
    //   }
    // }

    // stage('Verify Playwright Installation') {
    //   steps {
    //     script {
    //       // Check if Playwright is installed inside the container
    //       bat 'docker run --ipc=host playwright-auto npx playwright --version'
    //     }
    //   }
    // }

    stage('Run Tests') {
      steps {
        script {
          bat 'docker build --no-cache -t playwright-auto .'
          bat 'docker run -it --rm playwright-auto /bin/bash'
          bat 'docker run --ipc=host playwright-auto npx playwright --version'
          bat 'docker run --ipc=host playwright-auto bash -c "npx playwright test"'
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
