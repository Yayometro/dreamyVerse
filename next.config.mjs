/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'scontent-qro1-1.xx.fbcdn.net', 'scontent.fmex44-1.fna.fbcdn.net', 'res.cloudinary.com', "scontent-qro1-2.xx.fbcdn.net"]
//     },
//     // reactStrictMode: false,
// }

const nextConfig = {
    images: {
      domains: [
        'lh3.googleusercontent.com',
        'avatars.githubusercontent.com',
        'scontent-qro1-1.xx.fbcdn.net',
        'scontent.fmex44-1.fna.fbcdn.net',
        'res.cloudinary.com',
        'scontent-qro1-2.xx.fbcdn.net'
      ],
    },
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(mp3)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/sounds/',
            publicPath: '/_next/static/sounds/',
          },
        },
      });
  
      return config;
    },
  };

export default nextConfig;
