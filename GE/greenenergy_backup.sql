/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.3.1-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: greenenergy
-- ------------------------------------------------------
-- Server version	12.3.1-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Current Database: `greenenergy`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `greenenergy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;

USE `greenenergy`;

--
-- Table structure for table `carrinho`
--

DROP TABLE IF EXISTS `carrinho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrinho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `fk_carrinho_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrinho`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `carrinho` WRITE;
/*!40000 ALTER TABLE `carrinho` DISABLE KEYS */;
INSERT INTO `carrinho` VALUES
(1,6),
(3,7);
/*!40000 ALTER TABLE `carrinho` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES
(5,'Acessórios e Componentes'),
(6,'Aquecimento Sustentável'),
(3,'Armazenamento de Energia'),
(4,'Energia Eólica'),
(1,'Energia Solar'),
(2,'Iluminação Sustentável'),
(8,'Kits e Soluções Completas'),
(7,'Mobilidade Elétrica');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telefone` (`telefone`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES
(1,'Iago Damazio Amorim','iagobldep@gmail.com','eb68bc37c0418444bbbd6a26c36f2778:898b333bbcfb032af6f21b5cb46f30679e32a9103918ece13611123277c7b2930347849e5c863a7c7c41646daa2d5b07ccb9cc85c3d09b1187985f80a4454f70','Rua Silas Lino Ramos, 73','11992844806'),
(6,'IAGO DAMAZIO AMORIM','iago.amorim@edu.senai.br','41e0936113d2ee549ddd43997e955f20:2dab379e86c43c0bf31ac687c4dd921a38937651437f8f5c9a11095ada1012909e0e1469ba41c056505c89edbc94c3e8428bcada8e9db11ee1ede3f91d79bbab','Rua Silas Lino Ramos, 73','1140028922'),
(7,'Guilherme Antonio Araujo Fernandes','guilhermeviadotsundere@gmail.com','b8625e8d6f1e4f511c6d6a0572cfeb3b:deefb400ad764f6fce7defdf8095e8c4c9b4a64a4d1c2acdd8f96717e440822aeb6d1d8f2925fe7791a0338c543ca482238315fafed801d3f92b5977f0c9c07c','Casa do caralho, 69','119969696969');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) NOT NULL,
  `data_compra` datetime DEFAULT current_timestamp(),
  `valor_total` decimal(10,2) NOT NULL,
  `estado` varchar(30) DEFAULT 'pendente',
  PRIMARY KEY (`id`),
  KEY `fk_compra_cliente` (`id_cliente`),
  CONSTRAINT `fk_compra_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
INSERT INTO `compra` VALUES
(1,6,'2026-11-19 10:44:51',19099.60,'pendente');
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `item_carrinho`
--

DROP TABLE IF EXISTS `item_carrinho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_carrinho` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_carrinho` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_item_carrinho` (`id_carrinho`),
  KEY `fk_item_carrinho_produto` (`id_produto`),
  CONSTRAINT `fk_item_carrinho` FOREIGN KEY (`id_carrinho`) REFERENCES `carrinho` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_item_carrinho_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_carrinho`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `item_carrinho` WRITE;
/*!40000 ALTER TABLE `item_carrinho` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_carrinho` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `item_compra`
--

DROP TABLE IF EXISTS `item_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_compra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_compra` int(11) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_itemcompra` (`id_compra`),
  KEY `fk_item_produto` (`id_produto`),
  CONSTRAINT `fk_item_produto` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id`),
  CONSTRAINT `fk_itemcompra` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_compra`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `item_compra` WRITE;
/*!40000 ALTER TABLE `item_compra` DISABLE KEYS */;
INSERT INTO `item_compra` VALUES
(1,1,2,2,8999.90),
(2,1,3,2,549.90);
/*!40000 ALTER TABLE `item_compra` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `nota_fiscal`
--

DROP TABLE IF EXISTS `nota_fiscal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `nota_fiscal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_compra` int(11) NOT NULL,
  `data_emissao` datetime DEFAULT current_timestamp(),
  `valor_total` decimal(10,2) NOT NULL,
  `estado` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_notafiscal_compra` (`id_compra`),
  CONSTRAINT `fk_notafiscal_compra` FOREIGN KEY (`id_compra`) REFERENCES `compra` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nota_fiscal`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `nota_fiscal` WRITE;
/*!40000 ALTER TABLE `nota_fiscal` DISABLE KEYS */;
INSERT INTO `nota_fiscal` VALUES
(1,1,'2026-11-19 10:44:51',19099.60,'emitida');
/*!40000 ALTER TABLE `nota_fiscal` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `imagem_url` varchar(500) DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int(11) NOT NULL DEFAULT 0,
  `id_categoria` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_produto_categoria` (`id_categoria`),
  CONSTRAINT `fk_produto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES
(1,'Painel Solar Fotovoltaico 550W','Painel solar de alta eficiência para captação e conversão da luz solar em energia elétrica.','https://www.neosolar.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/p/a/painel_solar_fotovoltaico_550w_-_sunova_-_ss-550-72-m_3.jpg',899.90,25,1),
(2,'Kit Energia Solar Residencial 3kWp','Kit completo para geração de energia solar residencial, ideal para reduzir o consumo de eletricidade da rede convencional.','https://images.tcdn.com.br/img/img_prod/609952/kit_energia_solar_residencial_2_3_kwp_300kwh_mes_2702_1_53d0b10227cd670fab83bd3e7518678d.png',8999.90,6,1),
(3,'Painel Solar Portátil 100W','Painel solar dobrável e portátil, indicado para camping, viagens e carregamento de dispositivos compatíveis.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuDe5qbO70cfqGzYyx2wIGQJAW3eEQPK1sjTOJnyH9-NsFP_A7UBHMJ2bd&s=10',549.90,16,1),
(4,'Placa Solar Fotovoltaica 450W','Módulo fotovoltaico projetado para instalações residenciais e comerciais, oferecendo boa eficiência na geração de energia renovável.','https://www.neosolar.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/s/c/screenshot_2026-09-30_at_15-51-40_ztp-450mi-04.png_imagem_webp_800_800_pixels_-_redimensionada_91_.png',749.90,30,1),
(5,'Telha Solar Fotovoltaica','Telha com tecnologia fotovoltaica integrada, capaz de gerar energia elétrica enquanto compõe a cobertura de construções.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToxLjTvI8cWs-j_C48pQx_ONXHrTJbyzfKjTKYDTkh9ti0QRV8M5slw9U&s=10',1299.90,12,1),
(6,'Lâmpada LED Econômica 12W','Lâmpada LED de baixo consumo energético, ideal para iluminação residencial e comercial.','https://cdn.awsli.com.br/19/19830/produto/21620173/5ab5ef447c.jpg',19.90,100,2),
(7,'Refletor Solar LED 100W','Refletor com painel solar integrado, sensor de presença e iluminação automática, ideal para áreas externas.','https://cdn.awsli.com.br/600x1000/233/233932/produto/195868954/2-b03053275d.jpg',159.90,35,2),
(8,'Luminária Solar de Jardim','Luminária decorativa alimentada por energia solar, perfeita para jardins, caminhos e áreas externas.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbn_TeECnEcbQIblA5IiiB-MxFrlSd9NFVahx-K6X1G0D17uDjGnuFdOk&s=10',49.90,60,2),
(9,'Fita LED de Baixo Consumo 5m','Fita LED flexível de baixo consumo energético, indicada para decoração e iluminação de ambientes internos.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoxsNTXdNvSJCf1KGr3tyJVNol9Tha4G8pc3n6TVsmQ&s',39.90,45,2),
(10,'Poste de Iluminação Solar LED','Poste de iluminação externa com painel fotovoltaico e bateria recarregável, ideal para ruas, estacionamentos e espaços abertos.','https://cdn.awsli.com.br/2500x2500/722/722536/produto/140618782/799fb995-0634-4c83-860e-28be20be295d-50c999d1add26c24db2408e1acdcf287-batxpd.jpg',799.90,12,2),
(11,'Bateria de Lítio 100Ah','Bateria de alta capacidade para armazenamento de energia solar, ideal para sistemas residenciais e comerciais.','https://cdn.awsli.com.br/600x450/209/209157/produto/292358981/whatsapp-image-2024-08-08-at-16-56-25-wecxz9zusv.jpeg',2499.90,15,3),
(12,'Bateria Estacionária 150Ah','Bateria desenvolvida para ciclos de carga e descarga, indicada para sistemas de energia solar e aplicações que exigem fornecimento contínuo.','https://http2.mlstatic.com/D_NQ_NP_694435-MLB52204524260_102022-O.webp',1899.90,20,3),
(13,'Power Bank Solar 20000mAh','Carregador portátil com capacidade de 20.000mAh e painel solar auxiliar, ideal para viagens, camping e emergências.','https://down-br.img.susercontent.com/file/sg-11134201-7rdwm-md0gwqay28qfaf',189.90,40,3),
(14,'Estação de Energia Portátil 500W','Estação portátil com bateria recarregável e múltiplas saídas para alimentar dispositivos eletrônicos durante viagens e quedas de energia.','https://www.neosolar.com.br/pub/media/catalog/product/p/5/p500.png',3299.90,10,3),
(15,'Sistema de Armazenamento Residencial 5kWh','Sistema de baterias para armazenamento de energia gerada por painéis solares, permitindo utilizar a eletricidade armazenada em períodos sem geração solar.','https://image.made-in-china.com/202f0j00CkqWpoicbzMR/OEM-51-2V100ah-5kw-10kw-15kw-16kwh-30kw-Home-Energy-Storage-System.webp',12999.90,5,3),
(16,'Mini Turbina Eólica 400W','Pequena turbina eólica capaz de converter a força dos ventos em energia elétrica, indicada para pequenas instalações residenciais.','https://http2.mlstatic.com/D_NQ_NP_981947-MLU79011825588_092024-O.webp',1899.90,12,4),
(17,'Gerador Eólico Residencial 1000W','Gerador de energia eólica para residências e pequenas propriedades, aproveitando a força dos ventos para produzir eletricidade.','https://m.media-amazon.com/images/I/51jitdE7j5L.jpg',4299.90,8,4),
(18,'Kit Energia Eólica 600W','Kit composto por turbina eólica e componentes básicos para geração de energia renovável em locais com boa incidência de ventos.','https://m.media-amazon.com/images/I/41xawm-6BoL._AC_UF1000,1000_QL80_.jpg',2799.90,10,4),
(19,'Controlador de Carga Eólico 12V/24V','Equipamento responsável por regular a energia produzida por turbinas eólicas e controlar o carregamento das baterias.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHIOSqhodz9CyaRjJZ_2htqgGzxZ6bVX4d4eo-cn5dRQ&s',349.90,25,4),
(20,'Aerogerador Vertical 2000W','Aerogerador de eixo vertical projetado para transformar a energia dos ventos em eletricidade, podendo ser utilizado em instalações residenciais e comerciais.','https://m.media-amazon.com/images/I/51YIcwDjybL._AC_UF1000,1000_QL80_.jpg',7499.90,6,4),
(21,'Inversor Solar 3000W','Equipamento responsável por converter a energia elétrica em corrente contínua gerada pelos painéis solares em corrente alternada, utilizada em instalações residenciais.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRPRVK-SMy6QD9CRdEp-xfvBxKJLGuQInYauXbooKoFZs9KIHQDMD4Ygk&s=10',2199.90,15,5),
(22,'Controlador de Carga MPPT 40A','Controlador inteligente que otimiza o aproveitamento da energia gerada pelos painéis solares e regula o carregamento das baterias.','https://www.neosolar.com.br/media/catalog/product/e/p/epever_xtra_1_3.jpg',599.90,20,5),
(23,'Cabo Solar Fotovoltaico 6mm² (10 metros)','Cabo elétrico desenvolvido para instalações fotovoltaicas, com resistência à exposição solar e às condições climáticas externas.','https://http2.mlstatic.com/D_NQ_NP_704214-MLB103487295070_012026-O-10-metros-cabo-solar-6mm-verde-fotovoltaico-abnt-nbr-16612.webp',129.90,50,5),
(24,'Par de Conectores MC4','Conectores específicos para sistemas fotovoltaicos, utilizados para realizar conexões seguras entre painéis solares e cabos elétricos.','https://images.tcdn.com.br/img/img_prod/900872/par_de_conectores_mc4_para_painel_solar_fotovoltaico_4mm_3779_1_aca9a17eb2ed6e493d420dd5db46bae5_20250818175942.jpg',29.90,100,5),
(25,'Suporte para Painel Solar de Alumínio','Estrutura de fixação em alumínio resistente à corrosão, desenvolvida para instalar painéis solares em telhados e outras superfícies.','https://images.tcdn.com.br/img/img_prod/644524/cavalete_p_estrutura_suporte_laje_1287_1_45f026a0a131847be04dcb1160461902_20260429104303.jpg',249.90,30,5),
(26,'Aquecedor Solar de Água 200L','Sistema de aquecimento de água que utiliza energia solar para abastecimento residencial, reduzindo a necessidade de energia elétrica convencional.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxzO7E-iGb12OKE2bWci7Tkp1PtpG6NCKzLiZWqHB30mjAmQYqy6pcCFYo&s=10',2499.90,10,6),
(27,'Coletor Solar Térmico','Equipamento desenvolvido para captar a radiação solar e transferir o calor para a água utilizada em sistemas de aquecimento.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKILRkb_HNQ-jEkh1ss0Drfdrrcko1uToaq6Vt007IoBasODv-L2aka8sr&s=10',899.90,18,6),
(28,'Kit de Aquecimento Solar Residencial','Conjunto de equipamentos para aquecimento de água por energia solar, indicado para residências que buscam economia e sustentabilidade.','https://design.jet.com.br/sodramar/Produto/multifotos/hd/6780643Design%20sem%20nome%20(33).png',4299.90,7,6),
(29,'Bomba de Circulação para Aquecimento Solar','Bomba hidráulica responsável por movimentar a água entre os coletores solares e o reservatório térmico.','https://cdn.awsli.com.br/800x800/614/614351/produto/348134446/bomba-circulador-93w-qjryzs4zhk.jpg',499.90,22,6),
(30,'Reservatório Térmico Solar 300L','Tanque com isolamento térmico desenvolvido para armazenar água aquecida por energia solar, mantendo sua temperatura por mais tempo.','https://lojaagrometal.fbitsstatic.net/img/p/reservatorio-termico-standart-kort-sd304-30bp-300l-komeco-85640/272173.jpg?w=400&h=400&v=no-change&qs=ignore',3199.90,8,6),
(31,'Carregador Veicular Wallbox 7kW','Estação de recarga residencial para veículos elétricos, oferecendo carregamento eficiente e seguro para o uso diário.','https://cdn.awsli.com.br/2655/2655712/produto/246465733/principalwalboxpretocomcaixa-eu1o0pp6le.jpg',3299.90,12,7),
(32,'Carregador Portátil para Carro Elétrico','Carregador compacto para veículos elétricos, ideal para recargas em diferentes locais com tomadas compatíveis.','https://cdn.awsli.com.br/2655/2655712/arquivos/p-7.jpg',1199.90,20,7),
(33,'Estação de Recarga Pública 22kW','Equipamento de recarga para veículos elétricos, indicado para estacionamentos, estabelecimentos comerciais e espaços públicos.','https://www.neosolar.com.br/media/catalog/product/cache/207e23213cf636ccdef205098cf3c8a3/e/s/estacao_de_recarga_carro_eletrico_weg_wemob_parking_com_display_e_cabo_t2_-_frente.jpg',8999.90,5,7),
(34,'Carregador para Bicicleta Elétrica 48V','Carregador desenvolvido para baterias de bicicletas elétricas de 48V, com sistema de proteção contra sobrecarga.','https://images.tcdn.com.br/img/img_prod/394779/carregador_de_bateria_sousa_bike_48v_2ah_1_20260525114034_f13fd48a9c1f.jpg',249.90,35,7),
(35,'Carregador para Patinete Elétrico 42V','Carregador para patinetes elétricos compatíveis com baterias de 36V nominais, oferecendo recarga prática e segura.','https://down-br.img.susercontent.com/file/br-11134207-7r98o-m9965q2c8veq1d',179.90,40,7),
(36,'Kit Solar Off-Grid 5kWp','Sistema completo de energia solar independente da rede elétrica, composto por painéis fotovoltaicos, inversor e baterias para armazenamento de energia.','https://http2.mlstatic.com/D_NQ_NP_2X_723632-MLB119585752265_102026-F-kit-solar-off-grid-548kwh-mes-6-paineis-630w-bateria-litio.webp',18999.90,5,8),
(37,'Kit Solar On-Grid 3kWp','Kit de geração de energia solar conectado à rede elétrica, ideal para residências que desejam reduzir o consumo de energia convencional.','https://www.meugerador.com.br/cdn/shop/files/KIT_ENERGIA_SOLAR_ONGRID_GROWATT_MIC-MIN_X2_PAINEL_HANERSUN_620W_BIFACIAL_PRETO_COMPOSITO.png?v=1780055465',9999.90,8,8),
(38,'Kit Solar para Camping','Conjunto portátil composto por painel solar dobrável, controlador de carga e acessórios para fornecer energia durante viagens e atividades ao ar livre.','https://minhacasasolar.fbitsstatic.net/img/p/kit-solar-camping-de-150w-com-bateria-de-litio-81808/268277-13.jpg?w=400&h=400&v=202609111017',1299.90,20,8),
(39,'Kit de Iluminação Solar Externa','Conjunto de luminárias solares para iluminação de jardins, quintais e áreas externas, dispensando a necessidade de conexão com a rede elétrica.','https://http2.mlstatic.com/D_NQ_NP_800499-MLB98868521481_112025-O.webp',499.90,25,8),
(40,'Kit de Energia Solar para Pequenas Propriedades','Sistema de geração e armazenamento de energia solar desenvolvido para pequenas propriedades rurais, incluindo painéis fotovoltaicos, inversor, baterias e controlador de carga.','https://http2.mlstatic.com/D_NQ_NP_733757-MLB112507471804_062026-O-kit-energia-solar-monofasico-mercearia-livre-mini-stralink.webp',14999.90,6,8);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-11-19 13:25:07
