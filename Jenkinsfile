pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'playwright-auto'
    SNYK_TOKEN = credentials('SNYK_TOKEN')  // Use Jenkins credentials for Snyk authentication
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', 
        url: 'https://github.com/SakshamJomde11/PlaywrightMaster.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        script {
          bat 'npm install'  // Install dependencies including Snyk
        }
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
               def result = sh(script: 'npx playwright test', returnStatus: true)
              if (result != 0) {
              currentBuild.result = 'FAILURE'
                }
        emailext(
          subject: "Playwright Tests: ${currentBuild.result ?: 'UNKNOWN'}",
          body: "Check report: ${env.BUILD_URL}artifact/playwright-report/index.html",
          to: 'jomdesaksham2@gmail.com'
        )
      }
    }
  }
}
