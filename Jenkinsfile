pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'playwright-auto'
    SNYK_TOKEN = credentials('SNYK_TOKEN')  // Jenkins credentials for Snyk authentication
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
          docker.build("${DOCKER_IMAGE.toLowerCase()}", "--build-arg NODE_ENV=ci .")
        }
      }
    }

    stage('Run Tests') {
      steps {
        script {
          bat "echo Running tests in Docker container: ${DOCKER_IMAGE.toLowerCase()}"
          def exitCode = bat(script: "docker run --rm --ipc=host --name playwright-tests -v \"%CD%:/app\" ${DOCKER_IMAGE.toLowerCase()}", returnStatus: true)
          
          if (exitCode != 0) {
            currentBuild.result = 'FAILURE'
            error("Tests failed inside Docker container.")
          }
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
          bat 'npx snyk auth $SNYK_TOKEN'  // Authenticate Snyk
          bat 'npx snyk test --all-projects --severity-threshold=high'  // Run Snyk scan
          bat 'npm audit --audit-level=high'  // Run npm audit for vulnerabilities
        }
      }
    }
  }

  post {
    always {
      script {
        emailext(
          subject: "Playwright Test Results: ${currentBuild.result}",
          body: "Check report: ${env.BUILD_URL}artifact/playwright-report/index.html",
          to: 'jomdesaksham2@gmail.com'
        )
      }
    }
  }
}
