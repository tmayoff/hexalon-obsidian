{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, flake-utils, nixpkgs, rust-overlay, }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [ (import rust-overlay) ];
        pkgs = (import nixpkgs) {
          inherit system overlays;
        };

        rust = pkgs.rust-bin.stable.latest.default;

      in
      rec {
        # For `nix develop`:
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            vulkan-loader
            xorg.libXcursor
            xorg.libXi
            xorg.libXrandr
            alsa-lib
            udev
            pkg-config
            openssl
          ];

          nativeBuildInputs = with pkgs;
            [
              (rust.override { targets = [ "wasm32-unknown-unknown" ]; extensions = [ "rust-src" ]; })
              bun
              biome

              wasm-pack

              mold
            ];

        };
      }
    );
}
