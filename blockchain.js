let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

async function connectMetamask() {
    try {
        document.getElementById("user-message").innerHTML = "Connecting to your wallet please check metamask";
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        document.getElementById("user-message").innerHTML = `Account address: ${await signer.getAddress()}`;
        console.log("Account address:", await signer.getAddress());
        const balance = await signer.getBalance()
        const convertToEth = 1e18;
        console.log("account's balance in ether:", balance.toString() / convertToEth);
    } catch (error) {
        document.getElementById("user-message").innerHTML = error.message;
    }
}

async function claimTokens() {
    try {
        const runTokenContractAddress = "0x663ed886dBdcDf4085E75591fad2C84a9e88f04B";
        const runTokenContractAbi = [
            "function mintTokens(address account, uint256 amount) public",
        ];
        const runTokenContract = new ethers.Contract(runTokenContractAddress, runTokenContractAbi, provider);
        let convertToWei = 1000000000
        let amountToClaim = window.totalGweiScore * convertToWei
        window.totalGweiScore = 0
        await runTokenContract.connect(signer).mintTokens(signer.getAddress(), amountToClaim.toString())
        window.location.reload(true)
    } catch (error) {
        document.getElementById("user-message").innerHTML = "Oops, Start over again, Please connect your wallet before claiming tokens";
        setTimeout(window.location.reload(true), 3000);   
    }
} 

async function claimNFT() {
    try {
        const nftContractAddress = "0x24aCfbf06234A30601D5221592664bbB33f4b7c4";
        const mintContractAbi = [
            "function mint(uint256 amount) public",
        ];
        const nftContract = new ethers.Contract(nftContractAddress, mintContractAbi, provider);
        window.totalNFTScore = 0
        await nftContract.connect(signer).mint(window.totalNFTScore.toString())
        window.location.reload(true)
    } catch (error) {
        document.getElementById("user-message").innerHTML = "Oops, Start over again, Please connect your wallet before claiming NFTs";
    }
} 