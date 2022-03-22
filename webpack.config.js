const path = require('path'); //Esto siempre se pone 

// Agregamos el html, lo instalamos con npm install html-webpack-plugin -D
const HtmlWebpackPlugin = require('html-webpack-plugin');

//este es un plugin para agregar el css, lo instalamos con npm install mini-css-extract-plugin -D
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//copiar archivos, se instala con npm install copy-webpack-plugin -D
const CopyWebpackPlugin = require ('copy-webpack-plugin')

//esto es para minimizar el css
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

//esto es para limpiar el proyecto de carpetas innecesarias 
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const { webpack, util } = require('webpack')

module.exports = { //estos son los modulos donde se configura todo
        
    entry : './src/index.js', //este es el punto de entrada donde webpack va a leer todo el codigo

    output:{
        path:path.resolve(__dirname,'dist'), //esta es la carpeta donde ira nuestra salida, 
        filename: 'main.js'//este es el nombre que va a contener todo el codigo que compiló
    },
    module:
    {rules: 
        [
            {
            test: /\.s?css$/,
            use: [MiniCssExtractPlugin.loader,
                "css-loader"]
            },
            // {
            //     test:/\.(woff|woff2)$/,
            //     use:{
            //         loader:'url-loader',
            //         options:{
            //             limit:10000,
            //             mimetype:"application/font-woff",
            //             name: "[name].[ext]",
            //             outputPath:"./assets/fonts/",
            //             publicPath:"./assets/fonts/",
            //             esModule:false
            //         },
            //     }
            // }
        ]
    },
    resolve:{
        extensions:['.js'], //estos son las extensiones que vamos a usar, si se usa typescript entonces se agrega '.ts', si es react entonces '.jsx'
        
        //aqui creamos el alias para renombrar nuestras carpetas 
        alias:{
            '@utils':path.resolve(__dirname,'src/utils/'),
            '@templates':path.resolve(__dirname,'src/templates/'),
            '@styles':path.resolve(__dirname,'src/styles/'),
            '@images':path.resolve(__dirname,'src/images/')
        }
    },

    //añadimos el plugin de esta manera
    plugins:[
        //se le da el nombre que le pusimos al inicio
        new HtmlWebpackPlugin({
            inject:'body', //decimos que si a inject
            template:'./public/index.html', //este es el template de donde viene el antiguo html 
            filename:'./index.html' //este es el nombre que va a tener el archivo html que produzca
        }),

        new MiniCssExtractPlugin(
            {filename:'assets/[name].[contenthash].css'}
        ),

        new CopyWebpackPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname,"src","assets/images"),//esta es la ruta de donde trae los archivos para copiarlos
                    to: "assets/imagenes" //esto significa que dentro de la carpeta dist va a crear la carpeta assets y dentro de ella la carpeta imagenes que es donde irán las imagenes que copia ---- SE DEBE DE CAMBIAR LA RUTA EN NUESTRO TEMPLATE(public/index.html) YA NO SERÁ src/assets/imagenes sino assets/imagenes-tiene que ir tal cual como se ponga acá en la ruta assets/imagenes 
                    
                }
            ]
        }),
        new CleanWebpackPlugin()
    ],
     //esto es para minimizar el css
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
}

//PARA HACER QUE EL PROYECTO LEA ESTO USAMOS (npx webpack --mode production --config webpack.config.js)