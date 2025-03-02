pipeline{
    agent any

    stages{
        stage('Clonar o repositório') {
            steps{
                git branch: 'main', url: 'https://github.com/FelipeSilvaPortifolio/teste-api-ebac.git'
            }
        }
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Start server') {
            steps {
                sh 'nohup npm start &'
                sh 'sleep 10'  // Tempo para garantir que o servidor suba
            }
        }
        stage('Executar testes') {
            steps {
                sh 'NO_COLOR=1 npm run cy:run'
            }
        }
    }
}