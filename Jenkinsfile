pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/microsoft/playwright.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
