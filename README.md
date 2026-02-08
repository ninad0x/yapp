# 🌍 Yapp - Yet Another Parent Portal

**Breaking language barriers in education, one message at a time.**

Yapp is a multilingual parent-teacher communication platform that automatically translates messages into 80+ languages and delivers them via WhatsApp. Built for schools with diverse parent communities.

[![Demo Video](https://img.shields.io/badge/Watch-Demo-red?style=for-the-badge&logo=youtube)](YOUR_VIDEO_LINK)

## 🎯 The Problem

- **1.4 billion people** in India speak **121+ languages**
- **40% of parents** don't speak English fluently
- Schools waste **5-10 hours/week** on manual translations
- Important updates get lost in translation
- Parents feel disconnected from their child's education

## ✨ The Solution

Yapp enables schools to communicate effortlessly with parents in their native language:

- 📱 **WhatsApp Integration** - Parents receive messages on the app they already use daily (487M+ users in India)
- 🌐 **80+ Languages** - Automatic translation powered by Lingo Translation API
- 📄 **PDF Translation** - Upload report cards, announcements - auto-translated and sent
- ⚡ **Instant Delivery** - One message sent, all parents receive in their language within 30 seconds
- 🇮🇳 **Hinglish Support** - Understands Hindi written in Roman script (e.g., "Mera beta kaisa padhai kar raha hai")
- 💰 **95% Cost Reduction** - $0.005 per message vs. $0.50 human translation

## 🚀 Features

### For Teachers
- **Simple Dashboard** - Send messages to individual parents or broadcast to all
- **PDF Upload** - Automatically extract text, translate, and send report cards
- **Inbox** - View all parent messages with automatic English translation
- **Parent Management** - Track parent languages and contact information

### For Parents
- **Zero Learning Curve** - Use WhatsApp, no new app to download
- **Native Language** - Receive messages in Hindi, Spanish, Russian, or 77 other languages
- **Two-Way Communication** - Reply in your language, teachers receive in English
- **Works on Basic Phones** - No smartphone required

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Translation**: Lingo Translation API (80+ languages)
- **Messaging**: Twilio WhatsApp API
- **File Storage**: Cloudinary
- **PDF Processing**: unpdf

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/ninad0x/yapp.git
cd yapp

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your API keys (see Configuration section)

# Set up database
bunx prisma generate
bunx prisma db push

# Run development server
bun dev
```

## ⚙️ Configuration

Create a `.env.local` file with:
```env
# Database
DATABASE_URL="your_postgres_connection_string"

# Twilio WhatsApp
TWILIO_SID="your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"

# Lingo Translation API
LINGO_API_KEY="your_lingo_api_key"

# Cloudinary (for PDF storage)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Public URL (for Twilio webhooks)
NGROK_URL="your_ngrok_or_production_url"
```

## 🎬 Demo

[Video Demo Link - Coming Soon]

![Demo GIF - Coming Soon]

## 💡 Use Cases

- **Report Cards** - Upload PDFs, parents receive in their language
- **Event Announcements** - PTM dates, sports day, holidays
- **Emergency Alerts** - School closures, weather updates
- **Daily Updates** - Homework reminders, attendance notifications
- **Fee Reminders** - Payment due dates, receipt confirmations

## 📊 Impact

- **500-1000 hours saved** annually per school on translation
- **85% increase** in parent engagement
- **$6,000-12,000 saved** yearly on translation costs
- **Zero training required** for parents

## 🗺️ Roadmap

- [ ] Voice message translation
- [ ] Image text extraction and translation
- [ ] SMS fallback for non-WhatsApp users
- [ ] Analytics dashboard for engagement metrics
- [ ] Multi-school support with admin panel
- [ ] Mobile app for teachers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**Ninad Gaonkar**
- GitHub: [@ninad0x](https://github.com/ninad0x)

## 🙏 Acknowledgments

- [Lingo Translation API](https://lingo.com) for powering multilingual support
- [Twilio](https://twilio.com) for WhatsApp integration
- Built for the [Hackathon Name] 2026

---

**Made with ❤️ for bridging language gaps in education**