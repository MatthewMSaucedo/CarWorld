#!/bin/bash

# Navigate to this directory (For Matt's personal setup).
alias mn-smt="cd ~/Documents/Github/Stock-Market-Tool/"

# Fetch updates.
alias gf="git fetch"

# Update branch to take in changes from master.
alias grom="gf; git rebase origin/master"

# Stage all changed files.
alias gaa="git add -A"

# Commit staged files with same message as last commit.
alias gcan="git commit --amend --no-edit"

# Stage changes with previous commit message. (smaller commit history).
alias gacan="gaa; gcan"

# Push commit to branch.
alias gp="git push"
alias gpf="git push -f"

# Start server.
alias server="npm run start:server"
