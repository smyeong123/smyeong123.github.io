---
title: "[EN] Linear Algebra Interview Prep"
date: 2025-03-10
draft: false
tags: ["CS"]
---

# Linear Algebra

We are going to revise Linear Algebra assuming you had learnt it before.
This note aims to cover the concepts that may appear in the technical interview.

## What is basis of a vector?

A **basis** of a vector space is a set of linearly independent vectors that span the entire space. Any vector in the space can be expressed as a unique linear combination of basis vectors.

For example, in $\mathbb{R}^2$ the standard basis is:

$$\mathbf{e}_1 = \begin{bmatrix}1 \\\ 0\end{bmatrix}, \quad \mathbf{e}_2 = \begin{bmatrix}0 \\\ 1\end{bmatrix}$$

## What is unit vector?

A **unit vector** is a vector with a magnitude (or length) of 1.

If $\vec{v}$ is a vector, then the unit vector $\hat{v}$ in the direction of $\vec{v}$ is:

$$\hat{v} = \frac{\vec{v}}{\|\vec{v}\|}$$

## What is span of vector?

The **span** of a set of vectors is the set of all linear combinations of those vectors.

If $\vec{v}_1, \vec{v}_2, \dots, \vec{v}_n$ are vectors, then:

$$\text{span}(\vec{v}_1, \dots, \vec{v}_n) = \left\\{ \sum_{i=1}^n a_i \vec{v}_i \mid a_i \in \mathbb{R} \right\\}$$

## What is linearly dependent?

Vectors are **linearly dependent** if at least one of them can be written as a linear combination of the others.

Formally, vectors $\vec{v}_1, \dots, \vec{v}_n$ are linearly dependent if

$$\exists \; a_1, \dots, a_n \text{ not all zero, such that } \sum_{i=1}^n a_i \vec{v}_i = 0$$

## What is the vector space?

A **vector space** is a collection of vectors that can be added together and multiplied by scalars, satisfying the axioms of vector addition and scalar multiplication. 

Examples include $\mathbb{R}^n$, the set of all n-dimensional real vectors.

## What is rank of a matrix?

The **rank** of a matrix is the dimension of its column space (or row space).

It equals the number of linearly independent columns (or rows).

## What are eigenvector and eigenvalue?

Given a square matrix $A$, a non-zero vector $\vec{v}$ is an **eigenvector** of $A$ if:

$$A\vec{v} = \lambda \vec{v}$$

for some scalar $\lambda$, which is called the **eigenvalue** corresponding to $\vec{v}$.

## What is the transpose of a matrix?

The **transpose** of a matrix $A$ is obtained by flipping rows and columns.

If $A = [a_{ij}]$ , then the transpose $A^T$ is:

$$A^T = [a_{ji}]$$

## What is PCA and how to compute it?

**Principal Component Analysis (PCA)** is a technique to reduce the dimensionality of data while retaining the most variance.

Steps to compute PCA:

1. Standardise the data.
2. Compute the covariance matrix $\Sigma$.
3. Perform eigen-decomposition on $\Sigma$.
4. Project data onto the top $k$ eigenvectors (principal components).

## What is SVD (Singular Value Decomposition) and when do I use it?

**Singular Value Decomposition (SVD)** factorizes any matrix $A \in \mathbb{R}^{m \times n}$ into three matrices:

$$A = U \Sigma V^T$$

Where:
1. $U$ is an $m \times m$ orthogonal matrix
2. $\Sigma$ is an $m \times n$ diagonal matrix with singular values
3. $V$ is an $n \times n$ orthogonal matrix

**SVD is used for:**

- Dimensionality reduction
- Noise reduction
- Solving linear systems
- Data compression

## What does the determinant of a matrix tell you?

The **determinant** of a square matrix tells you:

- Whether the matrix is **invertible**: $\det(A) \ne 0$ means invertible, $\det(A) = 0$ means singular.
- How the matrix **scales volume**: $|\det(A)|$ is the volume scaling factor.
- Whether the transformation **preserves orientation**: sign of the determinant matters.
- Whether the rows/columns are **linearly independent**: if not, the determinant is zero.

## Example: Determinant is Zero if Columns Are Dependent

Let:

$$\begin{bmatrix}
1 & 2 & 3 \\\
4 & 8 & 5 \\\
7 & 14 & 6 \\\
\end{bmatrix}$$

Here, Column 2 is two times of Column 1, so Columns 1 and 2 are linearly dependent.

Using cofactor expansion:

$$\det(A) = 1 \cdot (8 \cdot 6 - 5 \cdot 14) - 2 \cdot (4 \cdot 6 - 5 \cdot 7) + 3 \cdot (4 \cdot 14 - 8 \cdot 7)$$

$$= 1(-22) - 2(-11) + 3(0) = -22 + 22 + 0 = 0$$

Thus, $\det(A) = 0$.
