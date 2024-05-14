



#!/bin/bash

file_path='./src/services/user.js'  # 文件名
line_number=32  # 要替换的行号
explainType="export const VISIT_TYPE = 1;"  # 要替换的内容

sed -i'' -e "${line_number}s/.*/${explainType}/g" ${file_path}
npm run build
rm -rf explain-ipo
mkdir explain-ipo
mv dist/*  explain-ipo/


explainType="export const VISIT_TYPE = 2;"
sed -i'' -e "${line_number}s/.*/${explainType}/g" ${file_path}
npm run build
rm -rf explain-i
mkdir explain-i
mv dist/*  explain-i/

explainType="export const VISIT_TYPE = 3;"
sed -i'' -e "${line_number}s/.*/${explainType}/g" ${file_path}
npm run build
rm -rf explain-p
mkdir explain-p
mv dist/*  explain-p/

explainType="export const VISIT_TYPE = 4;"
sed -i'' -e "${line_number}s/.*/${explainType}/g" ${file_path}
npm run build
rm -rf explain-o
mkdir explain-o
mv dist/*  explain-o/

explainType="export const VISIT_TYPE = 5;"
sed -i'' -e "${line_number}s/.*/${explainType}/g" ${file_path}
npm run build
rm -rf explain-n
mkdir explain-n
mv dist/*  explain-n/

explainType="export const VISIT_TYPE = 6;"
sed -i'' -e "${line_number}s/.*/${explainType}/g" ${file_path}
npm run build
rm -rf explain-ip
mkdir explain-ip
mv dist/*  explain-ip/

explainType="export const VISIT_TYPE = 7;"
sed -i'' -e "${line_number}s/.*/${explainType}/g" ${file_path}
npm run build
rm -rf explain-io
mkdir explain-io
mv dist/*  explain-io/

explainType="export const VISIT_TYPE = 8;"
sed -i'' -e "${line_number}s/.*/${explainType}/g" ${file_path}
npm run build
rm -rf explain-po
mkdir explain-po
mv dist/*  explain-po/




