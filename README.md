1. composer install
2. Création du fichier // .env.local 
3. Création de la base de données // php bin/console doctrine:database:create
4. Pousser la migration // php bin/console doctrine:migrations:migrate
5. Inserer les données // php bin/console doctrine:fixtures:load
