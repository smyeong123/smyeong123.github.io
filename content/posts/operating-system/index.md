---
title: "[KR] Operating System Note"
date: 2024-11-01
draft: false
tags: ["CS", "OS"]
---

# Operating System (운영체제)

## 개요

Operating System (OS)는 사용자가 컴퓨터를 사용하기 위해 필요한 시스템 소프트웨어이다. OS는 컴퓨터의 HW와 SW의 자원을 관리해준다.
OS는 오늘날 개발자가 알아야하는 필수 지식중 하나로 다음과 같은 아젠다로 복습을 할 수 있다.

<details>
<summary>Agenda</summary>

- Kernel & System Call
- Process vs Thread
- Scheduling
- Virtual memory
- Address Translation, Paging, Swapping
- Concurrency
- File System, Crash Consistency

</details>

## User Mode (사용자 모드)
사용자 모드로 실행되는 프로그램은 시스템의 자원에 직접 접근을 할 수 없다.

### System Call (시스템 호출)
시스템 호출: 사용자 프로그램이 커널의 기능을 요청하는 인터페이스이다. 사용자 모드에서 커널 모드로 *전환*을 한다.
예시로 `read()`, `write()`, `fork()` 등이 있다.

## Kernel Mode (커널 모드)
OS의 커널이 실행되는 모드다. 시스템의 모든 자원에 대한 접근이 가능하다. 또한 하드웨어와 직접적으로 상호작용을 한다.

## Kernel (커널)
커널: OS의 핵심으로 하드웨어와 소프트웨어를 연결하는 인터페이스다.
커널은 프로세스 관리, 메모리 관리, 하드웨어 자원 제어, 시스템 호출 관리를 해준다.

## Process (프로세스) vs Thread (스레드)
프로세스와 쓰레드의 차이를 알기전에 프로그램에 대해서 다시 한 번 집고 넘어가겠다.

프로그램이은 실행 파일(executable file)로 실행을 하기전 까지는 저장 장치에 저장만 되어있는 상태이며,아직 메모리에 할당이 안되어 있는 **정적**인 상태다.

프로그램을 실행을 하면 정적인 상태에서 **동적**인 상태로 변환이 되며, 해당 파일은 컴퓨터 메모리에 올라가며 이 상태를 **프로세스**라고 한다. 더 간단하게 말하자면 실행중인 프로그램이라고 생각하면 된다. 이 프로세스를 좀 더 작은 단위로 나눠서 접근을 할려고 하면 이제 우리는 이걸 **스레드**라고 한다.

![processes](/media/processes.png)

### **프로세스**
프로세스는 OS로 부터 할당 받은 독립적인 실행 단위로, 프로그램이 실행 중인 상태를 나타낸다.

커널 안에 있는 무수히 많은 요소 중에서 프로세스를 관리하기 위해 관련 정보를 저장하는 집합이 있는데 PCB이다.

#### Process Control Block (PCB)
PCB는 프로세스 상태 및 정보를 저장하는 자료구조를 뜻한다. 프로세스는 OS로부터 스케줄링 알고리즘을 이용해 CPU의 사용량을 할당 받는다. 프로세스를 실행 중에 Context Switching 이 발생하면 현제 상태를 저장하고 CPU를 반환해야 한다. 그리고 나중에 다시 실행 됬을때 이전 상태를 불러온다. 그 정보가 저장되는 곳이 PCB이다.

PCB 에는 다음과 같은 정보가 저장된다.
1. PID (프로세스 아이디) : 고유한 프로세스 아이디이다.
2. Process State (프로세스 상태) :

    | 상태         | 설명                        |
    | ---------- | ------------------------- |
    | New        | 프로세스가 막 생성된 상태            |
    | Ready      | 프로세스가 CPU에 실행되기 위해 대기하는 상 |
    | Running    | 프로세스가 작동이 되는 상태           |
    | Waiting    | 프로세스가 특정 이벤트를 기다리는 상태     |
    | Terminated | 프로세스가 실행은 완료한 상태          |

3. Program Counter (프로그램 카운터) : 프로세스가 다음에 실행할 명령어의 주소를 가르키는 리지스터이다.
4. CPU Register : CPU가 빠르게 접근할 수 있는 임시 저장소로,프로세스가 중단되었다가 다시 실행될떄를 위한 값을 저장한다.
5. Scheduling Information: Process 우선순위, 스케줄링 관련 정보 저장한다.
6. Memory Pointer : 메모리 영역을 가르키는 포인터다. 각 프로세스는 메모리가 Code Segment, Data Segment, Heap Segment, Stack Segment로 이루어져 있다.
	1. Code Segment : 프로세스가 실행하는 코드가 기계어로 저장된 공간이다.
	2. Data Segement : Global Variable, Static Variable등이 저장되어 있는 공간이며 실행 중에 변경이 가능하다.
	3. Heap Segment : 사용자가 관리하는 영역으로 동적으로 할당한 메모리가 저장되는 공간이다.
	4. Stack Segment: 함수안에 저장이 된 Local Variable, Parameter, Return Value, Return Address등이 저장된 공간이다. 스택 자료구조 처럼 LIFO 방식으로 작동이 되며 빈 스택은 제거한다.
7. Memmory Management Information: 프로세스 주소 정보를 저장한다. **Page Table**, **Segment Table** 등이 포함된다.
8. I/O Status Information : 프로세스 실행 중 발생하는 입출력 요청관련 정보를 저장한다.
9. Account Information : **프로세서**의 사용 시간, 시간 제한 등 실행 정보가 저장된다.

#### IPC (Inter-Process Communication)
IPC는 여러 프로세스 사이에서 서로 데이터를 주고 받는 행위를 뜻한다. 주로 파이프로 소통이 가능하며 메세지를 전달하고 받을 수 있다. 주로 `read()`와 `write()`를 이용을 한다.

예제 코드:
```c
void write_pipe(int fd, char *msg, Trader *trader) {
	if (fd == -1) {
		perror("FD is invalid\n");
		return;
	} else {
		if (trader -> is_online) {
			write(fd, msg, strlen(msg));
		}
	}
}
```

### **스레드**
스레드는 프로세스 내부의 작은 실행 단위로, 프로세스 내 자원을 공유를 한다. 즉 같은 프로세스 안에 있는 여러 쓰레드는 메모리 영역을 공유 할 수 있다. 그리고 여러작업을 동시에 실행할 수 있도록 지원을 한다.

## Multi-Processing vs Multi-Threading
**멀티 프로세싱**은 한개 이상의 프로세스가 실행되는 시스템이다.

**장점**:
- 실행 중에 한 프로세스가 죽어도 다른 프로세스에 영향을 끼치지 않고 계속 실행

**단점**:
- 멀티 스레딩보다 많은 메모리 공간 (각 프로세스 당 독립적인 메모리 공간 차지)과 CPU 시간을 차지

**멀티 스레딩**은 한 프로세스에서 여러 개의 스레드를 동시에 실행하는 것이다.

**장점**:
- 여러 스레드를 동시에 실행함으로서 프로그램이 효율적으로 자원을 공유하고, 활용
- 스레드 간의 Context Switching은 같은 프로세스 내에서 Heap을 공유하므로, 프로세스 간의 Context Switching보다 더 빠르고 가벼움

**단점**:
- 하나의 스레드에 문제가 발생하면 전체 스레드에 영향을 받음
- 다수의 스레드가 공유 데이터에 접근할 경우에 동기화 기법이 필수

### Context Switching (문맥 전환)
문맥 전환은 현재 실행하던 작업을 **저장**하고 다른 작업을 수행하기 위한 과정이다.

### Scheduling (스케줄링)
스케줄링: CPU 자원을 프로세스/쓰레드에 할당하는 전략이다.

### 스케줄링 알고리즘
- FCFS(First Come First Served) : 요청된 순서대로 프로세스를 실행하지만 긴 프로세스가 짧은 프로세스를 지연한다.
- Round Robin : 할당량을 정하고 : 정해진 시간만큼 하당한 후 각 프로세스를 실행하며, 응답 시간이 동일하지만 문맥 전환 비용이 발생한다.
- SJF(Shortest Job First) : 실행 기간이 짧은 프로세스를 먼저 실행하며 평균 대기 시간을 최소화하지만, 실행 중에 인터럽트가 불가능하다.
- Priority Scheduling : 우선 순위가 높은 프로세스부터 실행을 하며, 운선 순위에 밀려나가 프로세스는 실행이 안 될 가능성이 있다.

### Interrupt (인터럽트)
인터럽트는 CPU의 현재 작업을 중단하고 우선 순위가 높은 작업을 처리하도록 주는 신호다.

인터럽트 처리 과정은 다음과 같다.
1. 인터럽트 발생
2. 언터럽트 서비스 루틴 실행 : 인터럽트 발생 시 실행되는 코드
3. 인터럽트 처리
4. 원래 작업으로 복귀

### Process Synchronization (동기화)
주요 문제: Race condition(경쟁 상태), Deadlock(교착 상태), Starvation(기아 상태).

Lock: 상호 배제(mutual exclusion)을 보장.

Conditional Variable: 특정 조건을 만족할 때까지 쓰레드를 대기시키는 동기화 도구.

#### Concurrency (동시성) vs Parallelism (병렬성)
- concurrency : 여러 작업이 동시에 처리
- Parallelism : 어떤 하나의 작업을 여러개로 나눈후, 이를 동시에 처리해서 완성하는 개념

#### Race Condition (경쟁 상태)
레이스 컨티션은 두개 이상의 스레드가 공유 자원을 읽고 수정하면서 시간에 따라 다른 출력을 나타내는 상황이다.

#### Critical Section (임계 구역)
임계 구역은 두개 이상의 프로세스를 실행할때 동일한 자원을 동시에 접근하는 작업을 실행하는 코드 구간이다.
1. Mutual Exclusion
2. Progress
3. Bounded Waiting

#### Solution
- Hardware
	1. Memory Barriers
	2. Compare & Swap
	3. Atomic Variables
- Software
	1. Mutex Locks
	2. Semaphores
	3. Monitor

## Memory Management (메모리 관리)

[PCB](#process-control-block-pcb)에 설명한대로 메모리는 Code, Data, Heap, Stack 구간으로 나뉘어 질 수 있다.

![memory structure](/media/memory-structure.png)

## Virtual Memory (가상 메모리)
Virtual Memory: 실제 물리적 메모리보다 큰 논리적 주소 공간을 제공 한다.

장점:
- 큰 프로그램 실행 가능
- 메모리 효율적 사용

### Paging (페이징)
페이징은 가상 주소 공간을 고정 크기 단위인 페이지로 나누고, 물리적 주소를 페이지 프레임으로 나눠서 매핑하는걸 의미한다. 이떄 페이지 테이블을 이용해서 가상 메모리를 관리를 해준다.

사용되는 알고리즘: FIFO, LRU(Least Recently Used), Optimal.

- 메모리 보호
- 페이징 테이블
- 접근 권한

### Swapping (스와핑)
스와핑은 물리 메모리 부족 시, 일부 페이지를 디스크로 이동하는 행위를 일컫는다.

**Page Fault** (페이지 폴트): 필요한 페이지가 메모리에 없을 때 발생한다.

## 기타

### Redundant Array of Independent (RAID)
RAID는 여러개의 하드디스크가 있을때 동일한 데이터를 다른 위치에 중복해서 저장하는 방법이다. 이는 **데이터 복구**를 위해 자주 쓰는 방법이다.

## References
- [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/)
- [Multi-Threading vs Multi-Processing](https://medium.com/@jamesypatch/multithreading-vs-hyperthreading-benefits-and-drawbacks-e82970686426)
- [User mode, Kernel Mode](https://velog.io/@hyungzin0309/User-mode-Kernel-mode)
- [메모리 구조](https://velog.io/@shindoyeon/%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B5%AC%EC%A1%B0)
- [프로세스와 스레드 차이](https://velog.io/@raejoonee/%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%99%80-%EC%8A%A4%EB%A0%88%EB%93%9C%EC%9D%98-%EC%B0%A8%EC%9D%B4)
- [프로세스 상태](https://velog.io/@mingadinga_1234/%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EB%9E%80-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4%EC%9D%98-%EC%83%81%ED%83%9C)
- [신입 백앤드 개발자(나)를 위한 면접 질문 정리 - 네트워크, 운영체제](https://liamkwo.github.io/interview1/)
