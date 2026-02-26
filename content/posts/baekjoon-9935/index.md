---
title: "[KR] 백준 9935 - 문자열 폭발"
date: 2025-01-18
draft: false
tags: ["PS", "stack"]
---

# 백준 9935 - 문자열 폭발

## 문제 설명

주어진 문자열 `og_str`에서 특정 폭발 문자열 `explosive_str`을 찾아 제거하는 과정을 반복하여 최종적으로 남는 문자열을 구하는 문제입니다. 만약 모든 문자가 제거된다면 "FRULA"를 출력합니다.

## 문제 풀이

1. **입력 처리**
   - `sys.stdin.readline()`을 사용하여 문자열을 입력받고, 개행 문자를 제거합니다.
   - `og_str`을 리스트로 변환하여 한 글자씩 접근할 수 있도록 합니다.
   - `explosive_str`은 문자열 그대로 저장합니다.

2. **스택을 활용한 폭발 문자열 제거**
   - `parsed_str` 리스트를 스택처럼 사용하여 하나씩 문자를 추가합니다.
   - `parsed_str`의 마지막 `len(explosive_str)` 만큼을 확인하여 `explosive_str`과 동일하면 폭발시킵니다.
   - 문자열을 직접 조작하는 것보다 리스트에서 `pop()` 연산을 수행하는 것이 더 효율적이므로 이 방법을 사용합니다.

3. **결과 출력**
   - `parsed_str`에 남아 있는 문자가 있다면 이를 합쳐 출력하고, 없다면 "FRULA"를 출력합니다.

## 시간 복잡도 분석

- 입력 문자열의 길이를 `N`, 폭발 문자열의 길이를 `M`이라고 하면, 최악의 경우 모든 문자를 한 번씩 추가하고 폭발 문자열과 비교하는 과정이 반복됩니다.
- `''.join(parsed_str[-token_len:])`을 이용한 비교 연산이 O(M)이고, `pop()` 연산이 O(1)이므로 전체 시간 복잡도는 **O(NM)**이 됩니다.

## 코드
```python
import sys
input = sys.stdin.readline
og_str = [c for c in input().rstrip()]
explosive_str = input().rstrip()

token_len = len(explosive_str)

parsed_str = []

for i in range(len(og_str)):
    parsed_str.append(og_str[i])
    if ''.join(parsed_str[-token_len:]) == explosive_str:
        for _ in range(token_len):
            parsed_str.pop()

if parsed_str:
    print(''.join(parsed_str))
else:
    print('FRULA')
```
