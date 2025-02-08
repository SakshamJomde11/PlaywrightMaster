pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/SakshamJomde11/PlaywrightMaster.git'
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
