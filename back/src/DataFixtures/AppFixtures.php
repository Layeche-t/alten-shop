<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class AppFixtures extends Fixture
{
    public string $projectDir; 

    public function __construct(string $projectDir) 
    { 
      $this->projectDir = $projectDir;
    } 


    public function load(ObjectManager $manager): void
    {
        
        $data = json_decode(file_get_contents($this->projectDir. '/public/products.json')); 

        

        foreach ($data->data as $value) {

            $product = new Product(); 

           
            $product->setId($value->id); 
            $product->setCode($value->code); 
            $product->setName($value->name); 
            $product->setDescription($value->description); 
            $product->setImage($value->image);
            $product->setPrice($value->price); 
            $product->setCategory($value->category); 
            $product->setQuantity($value->quantity); 
            $product->setInventoryStatus($value->inventoryStatus); 
            $product->setRating($value->rating); 

            $manager->persist($product);
        }

        $manager->flush();
    }
}
