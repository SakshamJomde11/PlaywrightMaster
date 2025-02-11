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
          docker.build("${DOCKER_IMAGE}", "--build-arg NODE_ENV=ci .")
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

    stage('Publish Allure Report') {
      steps {
        step([$class: 'AllureReportPublisher', results: [[path: 'allure-results']]])
      }
    }

    stage('Security Scan') {
        steps {
            script {
                // Pull the latest Snyk CLI Docker image
                bat 'docker pull snyk/snyk-cli'

                // Run Snyk security scan on the Playwright Docker image
                bat 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock snyk/snyk-cli test --docker playwright-auto'

                // Run npm audit for package vulnerabilities
                bat 'npm audit --audit-level=high'
            }
        }
    }
  }

  post {
    always {
      script {
        emailext(
          subject: "Playwright Tests: ${currentBuild.result ?: 'UNKNOWN'}",
          body: "Check report: ${env.BUILD_URL}artifact/playwright-report/index.html",
          to: 'jomdesaksham2@gmail.com'
        )
      }
    }
  }
}
