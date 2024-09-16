# COMO EXECUTAR O PROJETO
<p>Primeiramente, é necessário ressaltar que esee projeto se trata de um aplicativo React alimentado por uma api Laravel. Logo, a execução correta depende da execução desses dois componentes.</p>

## Como executar a aplicação React
1. npm install
2. npm run start

## Como executar api laravel
A execução da api depende de um banco de dados Postgres instalado, e com a estrutura fornecida no documento do Projeto. Além, é claro, do PHP e do gerenciador de depências Composer.
1. cd app
2. cp .env.example .env
3. **atualizar informações de banco de dados no arquivo .env**
4. php artisan key:generate
5. composer install
6. npm install
7. php artisan migrate
8. php artisan db:seed
9. php artisan serve