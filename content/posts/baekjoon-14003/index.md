---
title: "[KR] 백준 14003 - 가장 긴 증가하는 부분 수열 5"
date: 2025-02-01
draft: false
tags: ["PS", "DP", "LIS"]
---

# 백준 14003 - 가장 긴 증가하는 부분 수열 5

> 이글을 읽으면 LIS(Longest Increasing Sequence) 알고리즘을 이해 할 수 있고 관련 문제를 풀 수 있습니다.

## 문제 리스트

- [가장 큰 증가하는 부분 수열 - 11053](https://www.acmicpc.net/problem/11053)
- [가장 큰 증가하는 부분 수열 - 11055](https://www.acmicpc.net/problem/11055)
- [가장 긴 증가하는 부분 수열 2 - 12015](https://www.acmicpc.net/problem/12015)
- [가장 긴 증가하는 부분 수열 5 - 14003](https://www.acmicpc.net/problem/14003)

## 문제 설명

수열 $$X$$가 주어졌을때 가장 긴 증가하는 부분 수열을 구하는 문제 입니다.
입력으로 $$X = [10, 20, 10, 30, 20, 50]$$가 주어졌을때 가장 긴 증가하는 부분을 굵게 표현하자면 다음과 같습니다. $$A$$ = {**10**, **20**, 10, **30**, 20, **50**} 그러므로, 출력이 되어야 하는것은 최대 길이인 4와 $$10, 20, 30, 50$$입니다.

## 문제 풀이

### DP(Memoization) + Double Loop

가장 쉬운 풀이 방법은 메모이제이션 방법과 이중 루프를 이용해 푸는 방법입니다. 11053풀이는 $$N$$ 길이로 모든 $$dp$$ 원소를 1으로 초기화 합니다. 여기서 $$dp[i]$$는 $$i$$번째 원소를 마지막으로 한 LIS의 길이를 저장합니다.

그 다음 각 $$i$$번쨰 원소에서 전에 발생한 $$j$$번째 원소들을 순회 하면서 다음과 같은 점화식을 실행해 $$dp[i] = max(dp[i], dp[j] + 1)\text{, where }0<j<i$$, 가장 큰 증가하는 부분 수열의 길이를 구할 수 있습니다. 이 이중 루프의 실제 연산 횟수는 $$\frac{N(N-1)}{2}$$ 과 같으므로, $$O(\frac{N(N-1)}{2}) = O(N^2)$$입니다.

### Binary Search + Traceback

이제 더 효율적인 방법으로 문제를 풀어보겠습니다. 이 방법은 이분탐색과 역추적(traceback)을 활용해서 푸는 방법으로 크게 두가지로 나눌 수 있습니다.
우선 `dp` 배열을 사용해 길이별 증가 수열의 최소 마지막 값을 추적합니다.
즉, `dp[i]`는 길이 $$i+1$$인 수열 중에서 가장 마지막 값이 가장 작은 수를 의미합니다.

이 과정을 통해 $$O(N log N)$$ 시간 내에 LIS 길이를 구할 수 있고,
동시에 position[i] 배열을 만들어 각 원소가 몇 번째 길이에 해당하는 수인지 기록합니다.

LIS 길이를 구한 후, 원래 수열을 뒤에서부터 탐색하면서 다음 조건을 만족하는 원소를 찾습니다:

`position[i]` == `현재 기대하는 길이 - 1`

예를 들어 LIS의 길이가 4라면, 우리는 다음과 같이 찾습니다:

```
position[i] == 3
position[i] == 2
position[i] == 1
position[i] == 0
```

이렇게 뒤에서부터 찾아서 리스트에 추가하면, 수열이 거꾸로 저장되므로 마지막에 reverse()를 해주면 실제 LIS를 얻을 수 있습니다.

> 그러면 왜 뒤에서 부터 찾을까요?

LIS는 단순히 수만 증가하는 게 아니라, 인덱스 조건도 만족해야 합니다:

$$i < j$$ 이면서 `X[i]` < `X[j]`

앞에서부터 탐색하면 이미 선택한 값보다 작은 값을 다시 고를 가능성이 생기기 때문에,
뒤에서부터 길이에 맞는 값을 하나씩 선택하는 게 가장 안전한 방식입니다.

## 예제 입력

예시로 입력이 `N = 8, X = 5 7 3 8 4 9 2 6`으로 주어지면 다음과 같은 방법으로 `dp`와 `position`이 구해지고

| i   | X[i] | dp (before)  | lower_bound(dp, X[i]) | dp (after)   | position[i] |
| --- | ---- | ------------ | --------------------- | ------------ | ----------- |
| 0   | 5    | []           | 0                     | [5]          | 0           |
| 1   | 7    | [5]          | 1                     | [5, 7]       | 1           |
| 2   | 3    | [5, 7]       | 0                     | [3, 7]       | 0           |
| 3   | 8    | [3, 7]       | 2                     | [3, 7, 8]    | 2           |
| 4   | 4    | [3, 7, 8]    | 1                     | [3, 4, 8]    | 1           |
| 5   | 9    | [3, 4, 8]    | 3                     | [3, 4, 8, 9] | 3           |
| 6   | 2    | [3, 4, 8, 9] | 0                     | [2, 4, 8, 9] | 0           |
| 7   | 6    | [2, 4, 8, 9] | 2                     | [2, 4, 6, 9] | 2           |

역순으로 X를 탐색하면서 position의 값이 `len(dp)-1` 에서 0까지 작아지는 순서로 X의 원소를 찾아 넣어줍니다. 그러면 $$[9,8,7,5]$$가 나오는데, 이를 뒤집어 출력합니다.

## 소스 코드

$$O(N^2)$$ 풀이 방법

```python
# given we got N,X from the input
dp = [1] * N
for i in range(N):
    for j in range(i):
        if X[i] > X[j]:
            dp[i] = max(dp[i], dp[j]+1)
print(max(dp))
```

$$O(Nlog(N))$$ 풀이 방법

```python
# given we got N,X from the input

def lower_bound(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left

dp, position = [], [0] * N

for i in range(N):
    x = X[i]
    idx = lower_bound(dp, x)
    if idx == len(dp):
        dp.append(x)
    else:
        dp[idx] = x
    position[i] = idx

lis, length = [], len(dp)
current_length = length - 1

for i in range(N-1, -1, -1):
    if position[i] == current_length:
        lis.append(X[i])
        current_length -= 1
        if current_length < 0:
            break

print(length)
print(*reversed(lis))
```
