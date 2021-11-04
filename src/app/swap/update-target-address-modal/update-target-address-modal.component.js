/** @format */

import { Component, EventEmitter } from "@angular/core";

@Component({
  selector: "app-update-target-address-modal",
  templateUrl: "./update-target-address-modal.component.html",
  styleUrls: ["./update-target-address-modal.component.scss"],
})
export class UpdateTargetAddressModalComponent {
  targetAddress;
  user;
  chain;

  constructor(
    userService,
    mockClientService,
    data = {
      chain,
      targetAddress,
      user,
    },
    dialogRef
  ) {
    this.user = data?.user ?? null;
    this.chain = data?.chain ?? null;
    this.back = new EventEmitter();
    this.targetAddress = data?.targetAddress ?? "";
  }

  updateAddress() {
    //====
    if (
      !this.mockClientService
        .getMockClientByChain(this.chain)
        .validateAddress(this.targetAddress)
    ) {
      return;
    }

    this.dialogRef.close(this.targetAddress);
  }

  formDisabled() {
    //====
    if (!this.user) {
      return true;
    }

    if (
      !this.mockClientService
        .getMockClientByChain(this.chain)
        .validateAddress(this.targetAddress)
    ) {
      return true;
    }

    return false;
  }

  updateAddressBtnText() {
    //====
    if (!this.user) {
      return "No User found";
    }

    if (
      !this.mockClientService
        .getMockClientByChain(this.chain)
        .validateAddress(this.targetAddress)
    ) {
      return `Invalid ${this.chain} Address`;
    }

    return "Set Address";
  }

  close() {
    //====
    this.dialogRef.close();
  }
}
