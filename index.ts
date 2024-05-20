#!/usr/bin/env bun

import { readFileSync } from "fs";
import { resolve } from "path";
import { parse } from "yaml";

interface FishHistoryEntry {
  when: string;
  cmd: string;
}

// Probably wouldn't work on Windows, but who really cares YOLO
const homeDir = process.env.HOME ?? process.env.USERPROFILE ?? "~";

const fishHistoryPath = resolve(homeDir, ".local/share/fish/fish_history");

const fish = parse(readFileSync(fishHistoryPath, "utf8"));

fish.forEach((entry: FishHistoryEntry) => {
  const preparedCmd = entry.cmd.replaceAll("\\\\\\n", "\\\\\n");
  process.stdout.write(`: ${entry.when}:0;${preparedCmd}\n`);
});
