email_defaults = {
	"GMail": {
		"pop3_server": "pop.gmail.com",
		"use_ssl": 1,
		"enable_outgoing": 1,
		"smtp_server": "smtp.gmail.com",
		"smtp_port": 587,
		"use_tls": 1
	},
	"Outlook.com": {
		"pop3_server": "pop3.live.com",
		"use_ssl": 1,
		"enable_outgoing": 1,
		"smtp_server": "smtp.live.com",
		"smtp_port": 587,
		"use_tls": 1
	},
	"Yahoo Mail": {
		"pop3_server": "pop.mail.yahoo.com ",
		"use_ssl": 1,
		"enable_outgoing": 1,
		"smtp_server": "smtp.mail.yahoo.com",
		"smtp_port": 465,
		"use_tls": 1
	},
};

email_defaults_imap = {
	"GMail": {
		"pop3_server": "imap.gmail.com"
	},
	"Outlook.com": {
		"pop3_server": "imap.live.com"
	},
	"Yahoo Mail": {
		"pop3_server": "imap.mail.yahoo.com "
	},
};

frappe.ui.form.on("Email Account", {
	service: function(frm) {
		$.each(email_defaults[frm.doc.service], function(key, value) {
			frm.set_value(key, value);
		})
		if (frm.doc.use_imap) {
			$.each(email_defaults_imap[frm.doc.service], function(key, value) {
			frm.set_value(key, value);
			})
		}
	},

	use_imap: function(frm) {
		if (frm.doc.use_imap) {
			$.each(email_defaults_imap[frm.doc.service], function(key, value) {
			frm.set_value(key, value);
			})
		}
		else{
			$.each(email_defaults[frm.doc.service], function(key, value) {
			frm.set_value(key, value);
			})
		}
	},

	email_id: function(frm) {
		if(!frm.doc.email_account_name) {
			frm.set_value("email_account_name",
				(frm.doc.service ? frm.doc.service + " " : "")
				+ toTitle(frm.doc.email_id.split("@")[0].replace(/[._]/g, " ")));
		}
	},
	enable_incoming: function(frm) {
		frm.set_df_property("append_to", "reqd", frm.doc.enable_incoming);
	},
	notify_if_unreplied: function(frm) {
		frm.set_df_property("send_notification_to", "reqd", frm.doc.notify_if_unreplied);
	},
	onload: function(frm) {
		frm.set_df_property("append_to", "only_select", true);
		frm.set_query("append_to", "frappe.email.doctype.email_account.email_account.get_append_to");
	},
	refresh: function(frm) {
		frm.events.enable_incoming(frm);
		frm.events.notify_if_unreplied(frm);
	}
});

