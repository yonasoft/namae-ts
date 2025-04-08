#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, index_1.loadNames)();
    const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .option('gender', {
        alias: 'g',
        type: 'string',
        description: 'Gender of the given name (male, female, all)',
        choices: ['male', 'female', 'all'],
        default: 'all',
    })
        .help()
        .alias('help', 'h').argv;
    const gender = argv.gender;
    const fullName = (0, index_1.getRandomFullName)(gender);
    if (fullName) {
        console.log(`Surname: ${fullName.surname.kanji} (${fullName.surname.romaji})`);
        console.log(`Given Name: ${fullName.given.kanji} (${fullName.given.romaji})`);
    }
    else {
        console.log('No names found.');
    }
});
run().catch(console.error);
