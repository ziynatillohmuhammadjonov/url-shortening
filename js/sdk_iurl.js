/**
 * iURL.uz SDK — JavaScript / Node.js
 *
 * Installation:
 *   npm install axios
 *
 * Usage:
 *   const iURLClient = require('./sdk');
 *   const client = new iURLClient('your_api_key_here');
 *
 * API Key olish: https://iurl.uz/dashboard
 */

const axios = require('axios');

class iURLClient {
	/**
	 * @param {string} apiKey  — iURL.uz API kaliti
	 * @param {string} baseURL — Asosiy URL (default: https://iurl.uz)
	 */
	constructor(apiKey, baseURL = 'https://iurl.uz') {
		if (!apiKey) throw new Error('API key majburiy');

		this.apiKey = apiKey;
		this.baseURL = baseURL.replace(/\/$/, '');

		this._http = axios.create({
			baseURL: this.baseURL,
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': this.apiKey,
			},
			timeout: 10_000,
		});
	}

	// ─────────────────────────────────────────────────────────────────
	// Ichki yordamchi
	// ─────────────────────────────────────────────────────────────────

	_err(error) {
		if (error.response) {
			return {
				success: false,
				error: error.response.data?.message || 'Server xatosi',
				statusCode: error.response.status,
			};
		}
		if (error.request) return { success: false, error: "Serverdan javob yo'q" };
		return { success: false, error: error.message || "Noma'lum xato" };
	}

	// ─────────────────────────────────────────────────────────────────
	// URL Qisqartirish
	// ─────────────────────────────────────────────────────────────────

	/**
	 * URL qisqartirish
	 * @param {string} original — Asl URL
	 * @param {string} [custom] — Ixtiyoriy qisqa kod (4-12 belgi, A-Z0-9)
	 * @returns {Promise<{success, data: {shortUrl, statsUrl, qrCode}, message}>}
	 */
	async shorten(original, custom = null) {
		try {
			const { data } = await this._http.post('/shorten', {
				original,
				...(custom && { custom }),
			});
			if (data.status)
				return { success: true, data: data.data, message: data.message };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * URL statistikasini olish
	 * @param {string} shortCode — Qisqa kod (masalan: "ABC123")
	 * @returns {Promise<{success, data: {original, short, clicks, createdAt, logs}}>}
	 */
	async getStats(shortCode) {
		try {
			const { data } = await this._http.get(`/short/${shortCode}`);
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Bir nechta URL larni ketma-ket qisqartirish
	 * @param {Array<string | {original: string, custom?: string}>} urls
	 * @returns {Promise<Array>}
	 */
	async batchShorten(urls) {
		const results = [];
		for (const url of urls) {
			if (typeof url === 'string') {
				results.push(await this.shorten(url));
			} else if (url?.original) {
				results.push(await this.shorten(url.original, url.custom || null));
			}
		}
		return results;
	}

	/**
	 * Umumiy sayt statistikasini olish
	 * @returns {Promise<{success, data: {totalUrls, totalClicks}}>}
	 */
	async globalStats() {
		try {
			const { data } = await this._http.get('/api/stats');
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	// ─────────────────────────────────────────────────────────────────
	// Taplink (Bio-Link) — Shaxsiy sahifa
	// ─────────────────────────────────────────────────────────────────

	/**
	 * Mening Taplink profilimni olish
	 * @returns {Promise<{success, data: TaplinkProfile}>}
	 */
	async getMyProfile() {
		try {
			const { data } = await this._http.get('/api/taplink/me');
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Yangi Taplink profil yaratish
	 * @param {string} username — Foydalanuvchi nomi (kichik harf, raqam, chiziq)
	 * @returns {Promise<{success, data: TaplinkProfile}>}
	 */
	async createProfile(username) {
		try {
			const { data } = await this._http.post('/api/taplink', { username });
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Profilni yangilash
	 * @param {Object} updates — displayName, bio, avatar, seoTitle, seoDescription, theme
	 * @returns {Promise<{success, data: TaplinkProfile}>}
	 */
	async updateProfile(updates) {
		try {
			const { data } = await this._http.patch('/api/taplink/me', updates);
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Profilga yangi link qo'shish
	 * @param {Object} link — {title, url, style?: {icon}, isActive?}
	 * @returns {Promise<{success, data}>}
	 */
	async addLink(link) {
		try {
			const { data } = await this._http.post('/api/taplink/me/links', link);
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Mavjud linkni yangilash
	 * @param {string} linkId — Link IDsi
	 * @param {Object} updates — {title, url, style, isActive, order}
	 * @returns {Promise<{success, data}>}
	 */
	async updateLink(linkId, updates) {
		try {
			const { data } = await this._http.patch(
				`/api/taplink/me/links/${linkId}`,
				updates
			);
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Linkni o'chirish
	 * @param {string} linkId — Link IDsi
	 * @returns {Promise<{success}>}
	 */
	async deleteLink(linkId) {
		try {
			const { data } = await this._http.delete(
				`/api/taplink/me/links/${linkId}`
			);
			if (data.status) return { success: true };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Mening Taplink analitikam
	 * @returns {Promise<{success, data: {totalViews, recentViews, totalClicks, topLinks, devices}}>}
	 */
	async getAnalytics() {
		try {
			const { data } = await this._http.get('/api/taplink/me/analytics');
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Ommaviy profil sahifasini ko'rish (autentifikatsiyasiz)
	 * @param {string} username — Foydalanuvchi nomi (@siz yoki sizdan tashqari)
	 * @returns {Promise<{success, data: TaplinkProfile}>}
	 */
	async getPublicProfile(username) {
		const slug = username.replace(/^@/, '');
		try {
			const { data } = await this._http.get(`/api/taplink/@${slug}`);
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Link bosilishini qayd etish (click tracking)
	 * @param {string} username — Profil egasi
	 * @param {string} linkId   — Bosilgan link IDsi
	 * @returns {Promise<{success}>}
	 */
	async trackClick(username, linkId) {
		const slug = username.replace(/^@/, '');
		try {
			await this._http.post(`/api/taplink/@${slug}/click/${linkId}`);
			return { success: true };
		} catch (e) {
			return this._err(e);
		}
	}

	// ─────────────────────────────────────────────────────────────────
	// Autentifikatsiya (Telegram orqali)
	// ─────────────────────────────────────────────────────────────────

	/**
	 * Telegram login uchun botga havola olish
	 * @returns {Promise<{success, data: {botUrl, loginToken}}>}
	 */
	async getTelegramLoginUrl() {
		try {
			const { data } = await this._http.get('/auth/telegram');
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}

	/**
	 * Telegram login holatini tekshirish
	 * @param {string} loginToken — getTelegramLoginUrl dan qaytgan token
	 * @returns {Promise<{success, data: {authenticated, token?}}>}
	 */
	async checkTelegramAuth(loginToken) {
		try {
			const { data } = await this._http.get(
				`/auth/telegram/check?token=${encodeURIComponent(loginToken)}`
			);
			if (data.status) return { success: true, data: data.data };
			return { success: false, error: data.message };
		} catch (e) {
			return this._err(e);
		}
	}
}

// ─── CommonJS export ───────────────────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
	module.exports = iURLClient;
}

// ─── Namuna foydalanish ────────────────────────────────────────────────────
if (typeof require !== 'undefined' && require.main === module) {
	(async () => {
		const client = new iURLClient('YOUR_API_KEY');

		// 1. URL qisqartirish
		const shortened = await client.shorten('https://example.com/very/long/url');
		console.log('Qisqartirildi:', shortened);

		// 2. Maxsus kod bilan qisqartirish
		const custom = await client.shorten('https://example.com/about', 'ABOUT');
		console.log('Maxsus:', custom);

		// 3. Statistika
		if (shortened.success) {
			const code = shortened.data.shortUrl.split('/').pop();
			const stats = await client.getStats(code);
			console.log('Statistika:', stats);
		}

		// 4. Ommaviy statistika
		const global = await client.globalStats();
		console.log('Umumiy:', global);

		// 5. Taplink — profilni olish
		const profile = await client.getMyProfile();
		console.log('Mening profilim:', profile);

		// 6. Taplink — yangi link qo'shish
		const link = await client.addLink({
			title: 'Mening saytim',
			url: 'https://example.com',
			style: { icon: '🌐' },
			isActive: true,
		});
		console.log("Link qo'shildi:", link);

		// 7. Analitika
		const analytics = await client.getAnalytics();
		console.log('Analitika:', analytics);
	})();
}
