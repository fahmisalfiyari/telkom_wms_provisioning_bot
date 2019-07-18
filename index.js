// Telegram bot untuk pelaporan provisioning

const Telegraf      = require('telegraf'); //import telegraf file
const Markup        = require('telegraf/markup'); //get markup module
const Stage         = require('telegraf/stage'); //Per Telegraf: A stage is a simple scene-based control flow middle-ware.
const session       = require('telegraf/session');
const WizardScene   = require('telegraf/scenes/wizard');
const SubmitData    = require("./api/spreadsheet_middleware");

//define bot_token
const bot = new Telegraf('806635346:AAEkllJUGkC83PO5S45R9dGWCh2V5gNZ8Bo')
// const bot 		= new Telegraf(process.env.BOT_TOKEN);
const BOT_TOKEN = process.env.BOT_TOKEN || "";

var submittedData;
var current_date = new Date();
var current_month = current_date.getMonth();
current_month++;

if(current_month < 10){
	current_month = '0' + current_month;
}

var myDate = current_date.getDate() + "-" + current_month + "-" + current_date.getFullYear()

//Start bot
bot.start((ctx) => 
    ctx.reply(
        `Semangat Pagi ${ctx.from.first_name}!!, apa yang ingin anda laporkan?`,
        
        //buat 1x2 matrix keyboard
        Markup.inlineKeyboard([
            Markup.callbackButton("PT1", "PT_1"),
            Markup.callbackButton("PT2", "SUBMIT"),
            Markup.callbackButton("PT3", "PT_3")
        ]).extra()
    )
);

//PT1 Wizard
const pt1report = new WizardScene(
	"pt1_report",
	ctx => {
		ctx.reply("Masukan NIK teknisi anda");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.nikTeknisi = ctx.message.text;
		ctx.reply("Masukan Nama Venue");
		return ctx.wizard.next();
	},

	ctx => {
		// ctx.reply('NIK anda ' + ctx.wizard.state.nikTeknisi);
		ctx.wizard.state.venueName = ctx.message.text;
		ctx.reply("Masukan SCID");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.scid = ctx.message.text;
		ctx.reply("Masukan SOID");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.soid = ctx.message.text;
		ctx.reply("Masukan SSID");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.ssid = ctx.message.text;
		ctx.reply("Masukan NDEM");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.ndem = ctx.message.text;
		ctx.reply("Masukan PIC");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.pic = ctx.message.text;
		ctx.reply("Masukan PIC Number");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.picNumber = ctx.message.text;
		ctx.reply("Masukan Alamat");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.alamat = ctx.message.text;
		ctx.reply("Masukan ODP");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.odp = ctx.message.text;
		ctx.reply("Masukan Keterangan Tambahan (jika tidak ada, isi dengan 'kosong'");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.status = ctx.message.text;
		ctx.reply("Masukan Lokasi (Share Location dari aplikasi Telegram)");
		return ctx.wizard.next();
	},

	ctx => {
		if(ctx.message.location){
			var lat =  ctx.message.location.latitude;
			var long = ctx.message.location.longitude;
			var map = 'https://maps.google.com/?q='+lat+','+long;
			ctx.wizard.state.location = map;
		}else{
			ctx.wizard.state.location = '-';
		}
		https://maps.google.com/?q=<lat>,<lng>
		submittedData = {
			created_on 		: myDate,
			nik_teknisi 	: ctx.wizard.state.nikTeknisi,
			venue 			: ctx.wizard.state.venueName,
			scid 			: ctx.wizard.state.scid,
			soid 			: ctx.wizard.state.soid,
			ssid 			: ctx.wizard.state.ssid,
			ndem 			: ctx.wizard.state.ndem,
			pic 			: ctx.wizard.state.pic,
			pic_number 		: ctx.wizard.state.picNumber,
			alamat 			: ctx.wizard.state.alamat,
			odp 			: ctx.wizard.state.odp,
			status 			: ctx.wizard.state.status,
			location 		: ctx.wizard.state.location,
			provisioning 	: "PT1"
		}

		// console.log(ctx.message);
		ctx.reply('KONFIRMASI DATA :\n\nNIK TEKNISI: ' + ctx.wizard.state.nikTeknisi + '\nSITE/VENUE: ' + ctx.wizard.state.venueName + '\nSCID: ' + ctx.wizard.state.scid + '\nSOID: ' + ctx.wizard.state.soid + '\nSSID: ' + ctx.wizard.state.ssid + '\nNDEM: ' + ctx.wizard.state.ndem + '\nPIC: '+ctx.wizard.state.pic + '\nPIC Number: ' + ctx.wizard.state.picNumber + '\nALAMAT: ' +ctx.wizard.state.alamat + '\nODP: ' + ctx.wizard.state.odp + '\nKETERANGAN: '+ctx.wizard.state.status + '\nLOCATION: '+ ctx.wizard.state.location + '\nPROVISIONING TYPE: PT1'
			,
			Markup.inlineKeyboard([
	            Markup.callbackButton("Submit Data", "SUBMIT"),
	            Markup.callbackButton("Cancel", "CANCEL")
	        ]).extra()
			)

		 return ctx.scene.leave();
	}
);

//PT2 Wizard
const pt2report = new WizardScene(
	"pt2_report",
	ctx => {
		ctx.reply("Masukan NIK teknisi anda");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.nikTeknisi = ctx.message.text;

		ctx.reply('Nik anda ' + ctx.wizard.state.nikTeknisi);
	}
);

//PT3 Wizard
const pt3report = new WizardScene(
	"pt3_report",
	ctx => {
		ctx.reply("Masukan NIK teknisi anda");
		return ctx.wizard.next();
	},

	ctx => {
		ctx.wizard.state.nikTeknisi = ctx.message.text;

		ctx.reply('Nik anda ' + ctx.wizard.state.nikTeknisi);
	}
);

//cancel action
bot.action("CANCEL", ctx => {
    ctx.reply(`Membatalkan aksi terakhir...`);
    ctx.reply(
        `Semangat Pagi ${ctx.from.first_name}!!, apa yang ingin anda laporkan?`,
        
        Markup.inlineKeyboard([
            Markup.callbackButton("PT1", "PT_1"),
            Markup.callbackButton("PT2", "PT_2"),
            Markup.callbackButton("PT3", "PT_3")
        ]).extra()
    )
});

bot.action("BACK", ctx => {
    ctx.reply(
        `Semangat Pagi ${ctx.from.first_name}!!, apa yang ingin anda laporkan?`,
        
        Markup.inlineKeyboard([
            Markup.callbackButton("PT1", "PT_1"),
            Markup.callbackButton("PT2", "PT_2"),
            Markup.callbackButton("PT3", "PT_3")
        ]).extra()
    )
});

bot.action("SUBMIT", ctx => {
    ctx.reply(`Submit Data...`);
    var submit = "";
    var statusReq;
    if(submit = SubmitData.postProvisioningData(submittedData)){
    	ctx.reply(
            'Submit Data Complete',
            Markup.inlineKeyboard([
                Markup.callbackButton("🔙 Back to Menu", "BACK")
            ]).extra()
        );
    }else{
    	ctx.reply(
            'Failed to submit data',
            Markup.inlineKeyboard([
                Markup.callbackButton("🔙 Back to Menu", "BACK")
            ]).extra()
        );
    }
    // const submit = SubmitData.postProvisioningData(submittedData);
});

const stage = new Stage([pt1report,pt2report,pt3report]);
stage.register();

bot.use(session());
bot.use(stage.middleware());
// bot.command('greeter', (ctx) => ctx.scene.enter('greeter'));
bot.action('PT_1', (ctx) => {Stage.enter('pt1_report')(ctx)});

bot.startPolling();
