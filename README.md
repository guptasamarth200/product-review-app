# 🛍️ Product Rating & Review Web App

This is a full-stack web application for users to rate and review products. Users can give a rating (1–5), a written review, or both. Tags are generated from frequent keywords in reviews, and images can optionally be uploaded.

---

## 📦 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Image Upload**: Multer (optional)
- **Tag Extraction**: Keyword frequency (basic NLP)

---

## ⚙️ Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/product-review-app.git
```
```Backend Setup```
```bash
cd backend
npm install
cp .env.example .env    # then fill it with your real DB values
npm start
```



```Frontend Setup```
```bash
cd frontend
npm install
npm start
```

##📊 Entity-Relationship Diagram

[Users] --------< (1:N) >-------- [Reviews] --------< (N:1) >-------- [Products]
                             |
                             |
                             V
                          [Tags]

- A user can write only one review per product (enforced via UNIQUE constraint)
- Reviews can optionally include tags (bonus feature)
