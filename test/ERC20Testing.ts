import { Provider } from "@ethersproject/abstract-provider";
import { expect } from "chai";
import { Contract, Signer, BigNumber } from "ethers";
import { ethers } from "hardhat";

describe("BLC Token Contract", () => {
  let owner: string | Signer | Provider | any;
  let Token;
  let hardhartToken: Contract;
  let addr1: { address: any };
  let addr2;
  let mintAmount: any;
  let powValue: any;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    Token = await ethers.getContractFactory("ERC20Token");
    hardhartToken = await Token.deploy();

    powValue = BigNumber.from("10").pow(18);
    mintAmount = await BigNumber.from("1000").mul(powValue);
  });

  describe("Mint to Address", () => {
    it("should check minted token basic details", async () => {
      expect(await hardhartToken.name()).to.be.equal("Token Name");
      expect(await hardhartToken.symbol()).to.be.equal("Token Symbol");
      expect(await hardhartToken.decimals()).to.be.equal(BigNumber.from("18"));
      expect(await hardhartToken.totalSupply()).to.be.equal(
        BigNumber.from(mintAmount)
      );
      expect(await hardhartToken.balanceOf(owner.address)).to.be.equal(
        BigNumber.from(mintAmount)
      );
    });

    it("should check all working transfer amout or not", async () => {
      let amount = BigNumber.from("8000000000000000");
      await hardhartToken.transfer(addr1.address, amount);

      let remainingAmount = mintAmount.sub(amount);

      expect(await hardhartToken.balanceOf(owner.address)).to.be.equal(
        BigNumber.from(remainingAmount)
      );
      expect(await hardhartToken.balanceOf(addr1.address)).to.be.equal(amount);
    });

    it("Should test 'approve' and 'allowance' from the owner to firstComer.", async function () {
      await hardhartToken.approve(addr1.address, 1000000);
      const allowance = await hardhartToken.allowance(
        owner.address,
        addr1.address
      );
      expect(allowance.toString()).to.equal(BigNumber.from("1000000"));
    });

    it("Should check owner of contract", async function () {
      expect(await hardhartToken.owner()).to.equal(owner.address);
      await hardhartToken.connect(owner).transferOwnership(addr1.address);

      expect(await hardhartToken.owner()).to.equal(addr1.address);
    });
  });
});
