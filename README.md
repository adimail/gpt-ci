<div style="display: flex; align-items: center;">
    <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status">
    <img src="https://img.shields.io/npm/v/package-name" alt="npm version">
</div>

# GPT CI

Chrome extension to save prompts for chat GPT custom instructions.

# Usage

- download/clone this repository
- open [chrome://extensions/](chrome://extensions/) in your browser
- turn on the developer mode
- select `load unpacked` button
- Locate the `dist` directory in your local clone of this repository
- and all set 🤗

# You can:

    - Add instructions
    - edit them
    - delete them
    - export CIs to JSON
    - import CIs from JSON
    - simple, fast & fun

# Screenshots

![Popup Window](repo/main.png)
![Custom Instruction](repo/inst.png)

# Use cases

- create custom instructions tailored to your preferences, allowing ChatGPT to provide more personalized responses based on individual needs.
- craft instructions for specific tasks or topics, enabling ChatGPT to better understand and respond in a targeted manner.
- easily switch between different sets of instructions based on the context of your conversation, ensuring that ChatGPT adapts to different scenarios.
- export instructions to a JSON file allows users to share your custom instruction sets with others or backup your configurations.
- import instructions from a json file
- iteratively refine their instructions to achieve the desired level of response accuracy and style from ChatGPT.

# What else?

The custom instructions are stored using Chrome's `chrome.storage.sync` API, allowing users to access their saved instructions across different devices.
