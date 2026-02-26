---
title: "[KR] 백준 33527 - 신촌 길찾기 서비스"
date: 2025-01-02
draft: false
tags: ["PS", "graph", "floyd-warshall"]
---

# 백준 33527 - 신촌 길찾기 서비스
> 해당 문제는 BFS로 접근했다가 실패해 Floyd-Warshall 기법으로 푼 문제입니다.

## **문제 설명**
5개의 대학교에 $$N$$개의 버스 정류장이 있으며, 각 대학교는 자체적으로 $$X$$개의 버스 노선을 운영합니다.
서로 다른 대학교에서 운영하는 동일한 번호의 버스 노선은 **서로 다른 노선**이므로, **총 $$5X$$개의 고유한 버스 노선이 존재**합니다.

---

## **문제 풀이**
초기에는 BFS를 사용하여 **$$N \times N$$ 크기의 버스 노선 정보를 기반으로 탐색**하는 방식을 시도했습니다.
그러나 $$N$$의 최대 크기가 $$100,000$$으로 매우 크기 때문에, 이 방식은 **비효율적이며 시간 초과가 발생**합니다.
반면, $$X$$의 최대 크기는 $$100$$으로 상대적으로 작아, **$$X$$를 기준으로 최적화하는 방법이 더 효율적**임을 알 수 있습니다.

이를 해결하기 위해, **각 대학교의 버스 노선을 고유하게 변환**하여 처리하였습니다.
$$new\_route\_number = route\_number + route\_index * X - 1$$ 연산을 사용하여 **각 대학교의 노선을 고유한 번호로 매핑**했습니다.

### **1. 인접 행렬 초기화**
$$5X \times 5X$$ 크기의 2D `bus` 행렬을 생성하여,
정류장 $$i$$에서 정류장 $$j$$로 이동할 때 필요한 **최소 환승 횟수를 저장**합니다.
각 버스 노선에서 **직접 연결된 정류장은 환승 없이 이동 가능**하므로 `bus[i][j] = 1`로 설정합니다.

---

### **2. Floyd-Warshall 알고리즘 적용**
이제 **Floyd-Warshall 알고리즘**을 사용하여 **모든 정류장 간 최소 환승 횟수를 계산**합니다.
점화식은 다음과 같습니다:
$$bus[i][j] = min(bus[i][j], bus[i][k] + bus[k][j])$$

여기서,
- `bus[i][j]` : 정류장 $$i$$에서 정류장 $$j$$까지의 최소 환승 횟수
- `bus[i][k] + bus[k][j]` : 정류장 $$i$$에서 $$k$$를 거쳐 $$j$$로 가는 경우

이 과정을 **$$5X$$번 반복**하여 **모든 정류장 쌍 간의 최소 환승 횟수를 계산**합니다.

---

### **3. 쿼리 처리**
Floyd-Warshall 알고리즘이 끝난 후, 질문 수 $$Q$$를 입력받고, 각 질문마다 **출발 정류장 $$U_i$$와 도착 정류장 $$V_i$$**를 받습니다.
이미 구해둔 `bus` 행렬을 활용하여 **$$U_i$$에서 $$V_i$$까지 가는 최소 환승 횟수를 찾고 출력**합니다.

---

## **시간 복잡도 분석**
Floyd-Warshall 알고리즘의 시간 복잡도는 **$$O(V^3)$$**이며,
여기서 $$V = 5X$$이므로 전체 시간 복잡도는: $$O(5X^3) = O(X^3)$$
따라서, **$$N$$이 커도 $$X$$가 작기 때문에 충분히 효율적인 방식**입니다.

## 코드
```python
import sys
input = sys.stdin.readline

N, X = map(int, input().split())
routes = [[r + j * X - 1 for j, r in enumerate(map(int, input().split()))] for _ in range(N)]
sz, INF = 5*X, float('inf')
bus = [[0 if i == j else INF for j in range(sz)] for i in range(sz)]

for r in routes:
    for i in r:
        for j in r:
            if i != j:
                bus[i][j] = 1
# Floyd-Warshall Algorithm
for k in range(sz):
    for i in range(sz):
        if bus[i][k] < INF:
            for j in range(sz):
                bus[i][j] = min(bus[i][j], bus[i][k] + bus[k][j])

Q = int(input())
for _ in range(Q):
    u, v = map(lambda y: y - 1, map(int, input().split()))
    res = min((bus[i][j] for i in routes[u] for j in routes[v]), default=INF)
    sys.stdout.write(f'{res + 1 if res < INF else -1}\n')
```
