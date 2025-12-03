const quizData = [
    {
        "question": "Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira:",
        "options": ["Umuyobozi", "Umuherekeza", "A na B ni ibisubizo by'ukuri", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "Umuyobozi"
    },
    {
        "question": "Ijambo 'akayira' bivuga inzira nyabagendwa ifunganye yagenewe gusa:",
        "options": ["Abanyamaguru", "Ibinyabiziga bigendera ku biziga bibiri", "A na B ni ibisubizo by'ukuri", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "A na B ni ibisubizo by'ukuri"
    },
    {
        "question": "Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n'uturanga gukata tw'ibara ryera utwo turanga cyerekezo tumenyesha:",
        "options": ["Igisate cy'umuhanda abayobozi bagomba gukurikira", "Ahegereye umurongo ukomeje", "Igabanurwa ry'umubare w'ibisate by'umuhanda mu cyerekezo bajyamo", "A na C nibyo"],
        "correctAnswer": "A na C nibyo"
    },
    {
        "question": "Ahantu ho kugendera mu muhanda herekanwa n'ibimenyetso bimurika ibinyabiziga ntibishobora kuhagenda:",
        "options": ["Biteganye", "Ku murongo umwe", "A na B nibyo", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Ibinyabiziga bikurikira bigomba gukorerwa isuzumwa buri mwaka:",
        "options": ["Ibinyabiziga bigenewe gutwara abagenzi muri rusange", "Ibinyabiziga bigenewe gutwara ibintu birengeje toni 3.5", "Ibinyabiziga bigenewe kwigisha gutwara", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Ubugari bwa romoruki ikuruwe n'ikinyamitende itatu ntibugomba kurenza ibipimo bikurikira:",
        "options": ["cm75", "cm125", "cm265", "Nta gisubizo cy'ukuri"],
        "correctAnswer": "Nta gisubizo cy'ukuri"
    },
    {
        "question": "Uburebure bw'ibinyabiziga bikurikira ntibugomba kurenga metero 11:",
        "options": ["Ibifite umutambiko umwe uhuza imipira", "Ibifite imitambiko ibiri ikurikiranye mu bugari bwayo", "Makuzungu", "Nta gisubizo cy'ukuri"],
        "correctAnswer": "Nta gisubizo cy'ukuri"
    },
    {
        "question": "Ikinyabiziga kibujjiwe guhagarara akanya kanini aha hakurikira:",
        "options": ["Ahatarengeje metero 1 imbere cyangwa inyuma y'ikinyabiziga gihagaze akanya gato cyangwa kanini", "Ahantu hatari ibimenyetso bibuza byabugenewe", "Aho abanyamaguru banyura mu muhanda ngo bakikire inkomyi", "Ibisubizo byose nibyo"],
        "correctAnswer": "Ibisubizo byose nibyo"
    },
    {
        "question": "Kunyuranaho bikorerwa:",
        "options": ["Mu ruhande rw'iburyo gusa", "Igihe cyose ni ibumoso", "Iburyo iyo unyura ku nyamaswa", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Icyapa cyerekana umuvuduko ntarengwa ikinyabiziga kitagomba kurenza gishyirwa gusa ku binyabiziga bifite uburemere ntarengwa bukurikira:",
        "options": ["Burenga toni 1", "Burenga toni 2", "Burenga toni 24", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Ahatari mu nsisiro umuvuduko ntarengwa mu isaha wa velomoteri ni:",
        "options": ["Km50", "Km40", "Km30", "Nta gisubizo cy'ukuri"],
        "correctAnswer": "Km50"
    },
    {
        "question": "Umuyobozi ugenda mu muhanda igihe ubugari bwawo budatuma anyuranaho nta nkomyi ashobora kunyura mu kayira k'abanyamaguru aruko amaze kureba ibi bikurikira:",
        "options": ["Umuvuduko w'abanyamaguru", "Ubugari bw'umuhanda", "Umubare w'abanyamaguru", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Ku byerekeye kwerekana ibinyabiziga n'ukumurika kwabyo ndetse no kwerekana ihindura ry'ibyerekezo byabyo. Birabujjiwe gukoresha andi matara cyangwa utugarurarumuri uretse ibitegetswe ariko ntibireba amatara akurikira:",
        "options": ["Amatara ndanga", "Amatara ari imbere mu modoka", "Amatara ndangaburambarare", "Ibisubizo byose nibyo"],
        "correctAnswer": "Amatara ari imbere mu modoka"
    },
    {
        "question": "Iyo nta mategeko awugabanya by'umwihariko umuvuduko ntarengwa w'amapikipiki mu isaha ni:",
        "options": ["Km25", "Km70", "Km40", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Uburyo bukoreshwa kugirango ikinyabiziga kigende gahoro igihe feri idakora neza babwita:",
        "options": ["Feri y'urugendo", "Feri yo guhagarara umwanya munini", "Feri yo gutabara", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "Feri yo gutabara"
    },
    {
        "question": "Nibura ikinyabiziga gitegetswe kugira uduhanagurakirahure tungahe:",
        "options": ["2", "3", "1", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "1"
    },
    {
        "question": "Amatara maremare y'ikinyabiziga agomba kuzimwa mu bihe bikurikira:",
        "options": ["Iyo unuhanda umurikiye umuyobozi abasha kureba muri metero 20", "Iyo ikinyabiziga kigiye kubisikana n'ibindi", "Iyo ari mu nsisiro", "Ibisubizo byose ni ukuri"],
        "correctAnswer": "Iyo ikinyabiziga kigiye kubisikana n'ibindi"
    },
    {
        "question": "Ikinyabiziga nigishobora kugira amatara arenga abiri y'ubwoko bunwe keretse kubyerekeye amatara akurikira:",
        "options": ["Itara ndangamubyimba", "Itara ryerekana icyerekezo", "Itara ndangaburumbarare", "Ibisubizo byose ni ukuri"],
        "correctAnswer": "Ibisubizo byose ni ukuri"
    },
    {
        "question": "Ubugari bwa romoruki ikuruwe n'igare cyangwa velomoteri ntiburenza ibipimo bikurikira:",
        "options": ["cm25", "cm125", "cm45", "Nta gisubizo cy'ukuri kirimo"],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Ibinyabiziga bikoreshwa nka tagisi, bitegerereza abantu mu nzira nyabagendwa, bishobora gushyirwaho itara ryerekana ko ikinyabiziga kitakodeshejwe. Iryo tara rishyirwaho ku buryo bukurikira:",
        "options": ["Ni itara ry'icyatsi rishyirwa imbere ku kinyabiziga", "Ni itara ry'icyatsi rishyirwa ibumoso", "Ni itara ry'umuhondo rishyirwa inyuma", "A na C ni ibisubizo by'ukuri"],
        "correctAnswer": "Ni itara ry'icyatsi rishyirwa imbere ku kinyabiziga"
    }
];
const quizData1 =[
    {
        "question": "Iyo umuvuduko w'ibinyabiziga bidapakiye ushobora kurenga km50 mu isaha ahategamye, bigomba kuba bifite ibikoresho by'ihoni byumvikanira mu ntera:",
        "options": ["Metero 100", "Metero 200", "Metero 50", "Metero 150"],
        "correctAnswer": "Metero 50"
    },
    {
        "question": "Birabujjiwe kugenza ibinyabiziga bigendeshwa na moteri naza romoruki zikururwa nabyo, iyo ibiziga byambaye inziga zidahagwa cyangwa inziga zikururuka zifite umubyimba uri hasi ya cm 4. Ariko ibyo ntibikurikizwa kubinyabiziga bikurikira:",
        "options": [
            "Ku binyabiziga by'ingabo bijya ahatarenga km25",
            "Ibinyabiziga bihinga",
            "Ibinyabiziga bya police",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Igice cy'inzira nyabagendwa kigarukira ku mirongo ibiri yera icagaguye ibangikanye kandi gifite ubugari budahagije kugira ngo imodoka zitambuke neza, kiba ari:",
        "options": [
            "Ahanyurwa n'amagare na velomoteri",
            "Ahanyurwa n'ingorofani",
            "Ahanyurwa n'ibinyamitende",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "Ahanyurwa n'ibinyamitende"
    },
    {
        "question": "Ubugari bwa romoruki ntiburenza ubugari bw'ikinyabiziga kiyikurura iyo ikuruwe n'ibinyabiziga bikurikira:",
        "options": [
            "Igare",
            "Velomoteri",
            "Ipikipiki ifite akanyabiziga kometse ku ruhande rwayo",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "Ipikipiki ifite akanyabiziga kometse ku ruhande rwayo"
    },
    {
        "question": "Iyo hatarimo indi myanya birabujjiwe gutwara ku niebe y'imbere y'imodoka abana badafite inyaka:",
        "options": [
            "Inyaka 10",
            "Inyaka 12",
            "Inyaka 7",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "Inyaka 12"
    },
    {
        "question": "Icyapa kivuga gutambuka mbere y'ibinyabiziga biturutse imbere gifite amabara akurikira:",
        "options": [
            "Ubuso ni umweru",
            "Ikirango ni umutuku n'umukara",
            "Ikirango ni umweru n'umukara",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Ni rvari itegeko rigenga gutambuka mbere kw'iburyo rikurikizwa mu masangano:",
        "options": [
            "Iyo nta cyapa cyo gutambuka mbere gihari",
            "Iyo ikimenyetso kimurika cyagenewe ibinyabiziga kidakora",
            "A na B ni ibisubizo by'ukuri",
            "Nta gisubizo cy'ukuri"
        ],
        "correctAnswer": "A na B ni ibisubizo by'ukuri"
    },
    {
        "question": "Ibimenyetso bimurika byerekana uburyo bwo kugendera mu munanda kw'ibinyabiziga bishyirwa iburyo bw'umuhanda. Ariko bishobora no gushyirwa ibumoso cyangwa hejuru y'umuhanda:",
        "options": [
            "Hakurikijwe icyerekezo abagenzi bireba baganamo",
            "Hakurikijwe icyo ibyo bimenyetso bigamije kwerekana",
            "Kugirango birusheho kugaragara neza",
            "Ibisubizo byose ni ukuri"
        ],
        "correctAnswer": "Kugirango birusheho kugaragara neza"
    },
    {
        "question": "Iyo tiara ry'umuhondo rimyatsa rikoreshejwe mu masangano y'amayira ahwanyije agaciro rishyirwa ahagana he:",
        "options": [
            "Kuri buri nzira",
            "Hagati y'amasangano",
            "Iburyo bw'amasangano",
            "A na B ni ibisubizo by'ukuri"
        ],
        "correctAnswer": "A na B ni ibisubizo by'ukuri"
    },
    {
        "question": "Inkombe z'inzira nyabagendwa cyangwa z'umuhanda zishobora kugaragazwa n'ibikoresho ngarurarumuri. Ibyo bikoresho bigomba gushyirwaho ku buryo abagenzi babibona:",
        "options": [
            "Babona gusa ibumoso bwabo iby'ibara ritukura",
            "Iburyo babona iby'ibara risa n'icunga rihishije gusa",
            "Babona iby'ibara ry'umuhondo ibumoso",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
    },
    {
        "question": "Ibinyabiziga bikurikira bigomba gukorerwa isuzumwa rimwe mu mezi 6:",
        "options": [
            "Ibinyabiziga bitwara abagenzi muri rusange",
            "Ibinyabiziga bigenewe gutwara ibintu birengeje toni 3.5",
            "Ibinyabiziga bigenewe kwigisha gutwara",
            "Ibisubizo byose ni ukuri"
        ],
        "correctAnswer": "Ibisubizo byose ni ukuri"
    },
    {
        "question": "Iyo kuyobya umuhanda ari ngombwa bigaragazwa kuva aho uhera no kuburebure bwawo n'icyapa gifite ubuso bw'amabara akurikira:",
        "options": [
            "Ubururu",
            "Umweru",
            "Umutuku",
            "Nta gisubizo cy'ukuri"
        ],
        "correctAnswer": "Ubururu"
    },
    {
        "question": "Ku mihanda ibyapa bikurikira bigomba kugaragazwa ku buryo bumwe:",
        "options": [
            "Ibyapa biyobora n'ibitegeka",
            "Ibyapa biburira n'ibitegeka",
            "Ibyapa bibuza n'ibitegeka",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "Ibyapa bibuza n'ibitegeka"
    },
    {
        "question": "Uretse mu mujyi, ku yindi mihanda yagenwe na ministeri ushinzwe gutwara abantu n'ibintu, uburemere ntarengwa ku binyabiziga bifite imitambiko itatu cyangwa irenga hatarimo makuzungu ni:",
        "options": [
            "Toni 10",
            "Toni 12",
            "Toni 16",
            "Toni 24"
        ],
        "correctAnswer": "Toni 16"
    },
    {
        "question": "Ni iyihe feri ituma imodoka igenda buhoro kandi igahagarara ku buryo bwizewe bubangutse kandi nyabwo, uko imodoka yaba yikoreye kose yaba igeze ahacurannye cyangwa ahaterera:",
        "options": [
            "Feri y'urugendo",
            "Feri yo gutabara",
            "Feri yo guhagarara umwanya munini",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "Feri y'urugendo"
    },
    {
        "question": "Ubugari bw'imizigo yikorewe n'ibinyamitende itatu n'ubwiyikorewe n'ibinyamitende 4 bifite cyangwa bidafite moteri kimwe n'ubw'iyikorewe na romuruki zikuruwe n'ibyo binyabiziga ntibushobora kurenga ibipimo bikurikira:",
        "options": [
            "cm 30 ku bugari bw'icyo kinyabiziga kidapakiye",
            "Ubugari ntarengwa budakuka ni metero 2 na sentimetero 50",
            "A na B ni ibisubizo by'ukuri",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "A na B ni ibisubizo by'ukuri"
    },
    {
        "question": "Kunyura ku binyabiziga bindi, uretse icy'ibiziga bibiri, bibujijwe aha hakurikira:",
        "options": [
            "Hafi y'iteme iyo hari umuhanda ufunganye",
            "Hafi y'aho abanyamaguru banyakra",
            "Hafi y'ibice by'umuhanda bimeze nabi",
            "Ibi bisubizo byose ni ukuri"
        ],
        "correctAnswer": "Ibi bisubizo byose ni ukuri"
    },
    {
        "question": "Iyo nta mategeko awugabanya by'umwihariko, umuvuduko ntarengwa ku modoka zitwara abagenzi mu buryo bwa rusange ni:",
        "options": [
            "Km 60 mu isaha",
            "Km 40 mu isaha",
            "Km 25 mu isaha",
            "Km20 mu isaha"
        ],
        "correctAnswer": "Km 60 mu isaha"
    },
    {
        "question": "Iyo nta mategeko awugabanya by'umwihariko, umuvuduko ntarengwa ku modoka zikoreshwa nk'amavatiri y'ifasi cyangwa amatagisi zifite uburemere bwemewe butarenga kilogramna 3500 ni:",
        "options": [
            "Km 60 mu isaha",
            "Km 40 mu isaha",
            "Km 75 mu isaha",
            "Km20 mu isaha"
        ],
        "correctAnswer": "Km 75 mu isaha"
    },
    {
        "question": "Ikinyabiziga kibujjiwe guhagarara akanya kanini aha hakurikira:",
        "options": [
            "Imbere y'ahantu hinjirwa hakasohokerwa n'ahantu benshi",
            "Mu muhanda aho ugabanyijemo ibisate bigaragazwa n'imirongo idacagaguye",
            "A na B ni ibisubizo by'ukuri",
            "Nta gisubizo cy'ukuri kirimo"
        ],
        "correctAnswer": "A na B ni ibisubizo by'ukuri"
    }
];
const quizData2 = [
  {
    "question": "Ikinyabiziga cyose cyangwa ibinyabiziga bigenda bigomba kugira:",
    "options": ["Umuyobozi", "Untuherekeza", "A na B ni ibisubizo by'ukuri", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Umuyobozi"
  },
  {
    "question": "Ijambo 'akayira' biyuga inzira nyabagendwa ifunganye yagenewe gusa:",
    "options": ["Abanyamaguru", "Ibinyabiziga bigendera ku biziga bibiri", "A na B ni ibisubizo by'ukuri", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Umurongo uciyemo uduce umenyesha ahegereye umurongo ushobora kuzuzwa n'uturanga gukata tw'ibara rycra utwo turanga eyerekezo tumenyesha:",
    "options": ["Igisate cy'umuhanda abayobozi bagomba gukurikira", "Ahegereye umurongo ukomeje", "Igabanurwa ry'umubare w'ibisate by'umuhanda mu eyerekezo bajyamo", "A na C nibyo"],
    "correctAnswer": "A na C nibyo"
  },
  {
    "question": "Ahantu ho kugendera mu munanda herekanwa n'ibimenyetso bimurika ibinyabiziga ntibishobora kuhagenda:",
    "options": ["Biteganye", "Ku murongo umwe", "A na B nibyo", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
  },
  {
    "question": "Uburemere ntarengwa bwemewe ntibushobora kurenga $\\frac{1}{2}$ cy'uburemere bw'ikinyabiziga gikurura nubw'umuyobozi kuri romoruki zikurikira:",
    "options": ["Romoruki ifite feri y'urugendo", "Romoruki idafite feri y'urugendo", "Romoruki itarenza kg 750", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Romoruki idafite feri y'urugendo"
  },
  {
    "question": "Ibinyabiziga bifite ubugari bufite ibipimo bikurikira bigomba kugira amatara ndangaburumbarare:",
    "options": ["Metero 2 na cm 10", "Metero 2 na cm 50", "Metero 3", "Metero 2"],
    "correctAnswer": "Metero 2 na cm 10"
  },
  {
    "question": "Nta tara na rimwe cyangwa akagarurarumuri bishobora kuba bifunze umwanya munini kandi ngo habeho kubangamira abandi bakoresha umuhanda keretse ibi bikurikira:",
    "options": ["Amatara ndanga", "Amatara y'inyuma", "Amatara ndangaburumbarare", "Amatara yo guhagarara"],
    "correctAnswer": "Amatara yo guhagarara"
  },
  {
    "question": "Iyo kuva bwije kugeza bukeye cyangwa bitewe nuko ibihe bimeze nk'igihe cy'igihu cyangwa cy'imvura bitagishoboka kubona neza muri m 200, imirongo y'ingabo z'igihugu zigendera kuri gahunda n'utundi dutsiko twose tw'abanyamaguru nk'imperekerane cyangwa udutsiko tw'abanyeshuri bari ku murongo bayobowe na mwarimu, iyo bagenda mu muhanda ku isonga hakaba hari abantu barenze umwe, bagaragzwa ku buryo bukurikira:",
    "options": ["Imbere ni itara ryera ritwariwe ku ruhande rw'ibumoso n'umuntu uri ku murongo w'imbere hafi y'umurongo ugabanya umuhanda mo kabiri", "Inyuma ni itara umuhondo ritwariwe ku ruhande rw'ibumoso n'umuntu uheruka umuntu uri ku murongo w'inyuma", "A na B nibyo", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "A na B nibyo"
  },
  {
    "question": "Iyo umuyobozi ahetse umuntu ku kinyabiziga atwaye, agomba kuba yujuje ibi bikurikira:",
    "options": ["Kuba afite nibura imyaka 18", "Kuba afite nibura imyaka 16", "Kuba afite nibura imyaka 20", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Nta gisubizo cy'ukuri kirimo"
  },
  {
    "question": "Iyo umuyobozi ageze mu ikorosi, agomba kugenda yitonze kandi:",
    "options": ["Akagendera mu muhanda hagati", "Akagendera mu ruhande rw'iburyo bw'umuhanda", "Akagendera mu ruhande rw'ibumoso bw'umuhanda", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Akagendera mu ruhande rw'iburyo bw'umuhanda"
  },
  {
    "question": "Iyo umuyobozi atekereza guhagarara ahantu hatemewe agomba kubanza gukora ibi bikurikira:",
    "options": ["Kureba ko nta kinyabiziga kimuturutse inyuma", "Kureba ko nta kinyabiziga kimuturutse imbere", "Kureba ko nta kinyabiziga kimuturutse imbere cyangwa inyuma", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Kureba ko nta kinyabiziga kimuturutse imbere cyangwa inyuma"
  },
  {
    "question": "Iyo umuyobozi atekereza guparika ikinyabiziga cye mu muhanda, agomba kugiparika ate?",
    "options": ["Amaze gusiga nibura umwanya wa metero 1 hagati y'ikinyabiziga cye n'ibindi binyabiziga", "Amaze gusiga nibura umwanya wa metero 0.5 hagati y'ikinyabiziga cye n'ibindi binyabiziga", "Amaze gusiga nibura umwanya wa metero 2 hagati y'ikinyabiziga cye n'ibindi binyabiziga", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Amaze gusiga nibura umwanya wa metero 0.5 hagati y'ikinyabiziga cye n'ibindi binyabiziga"
  },
  {
    "question": "Iyo umuyobozi atekereza guhindura inzira aganamo, agomba kubanza gukora ibi bikurikira:",
    "options": ["Kureba ko nta kinyabiziga kimuturutse inyuma", "Kureba ko nta kinyabiziga kimuturutse imbere", "Kureba ko nta kinyabiziga kimuturutse imbere cyangwa inyuma", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Kureba ko nta kinyabiziga kimuturutse inyuma"
  },
  {
    "question": "Iyo umuyobozi ageze mu ikorosi ry'umuhanda, agomba kugenda ku muvuduko mwinshi cyane:",
    "options": ["Nibyo", "Sibyo"],
    "correctAnswer": "Sibyo"
  },
  {
    "question": "Iyo umuntu ageze mu ikorosi ry'umuhanda, agomba kugenda yitonze cyane:",
    "options": ["Nibyo", "Sibyo"],
    "correctAnswer": "Nibyo"
  },
  {
    "question": "Iyo umuyobozi atekereza guhagarara mu muhanda, agomba kubanza gushyira amatara yo guhagarara:",
    "options": ["Nibyo", "Sibyo"],
    "correctAnswer": "Nibyo"
  },
  {
    "question": "Iyo umuyobozi atekereza guparika ikinyabiziga cye mu muhanda, agomba kubanza gushyira amatara yo guhagarara:",
    "options": ["Nibyo", "Sibyo"],
    "correctAnswer": "Nibyo"
  },
  {
    "question": "Iyo umuyobozi atekereza guhindura inzira aganamo, agomba kubanza gushyira amatara ndanga:",
    "options": ["Nibyo", "Sibyo"],
    "correctAnswer": "Nibyo"
  },
    {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mijyi ni:",
    "options": ["60 km/h", "40 km/h", "50 km/h", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "40 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu muhanda munini ni:",
    "options": ["80 km/h", "90 km/h", "100 km/h", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "80 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda yo mu cyaro ni:",
    "options": ["70 km/h", "80 km/h", "90 km/h", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "70 km/h"
  }
]
;

const quizData3 = [
  {
    "question": "Guhagarara akanya gato no guhagarara akanya kanini bibujijwe cyane cyane aha hakurikira:",
    "options": ["ku mihanda y'icyerekezo kimwe hose", "mu ruhande ruteganye n'urwo ikindi kinyabiziga gihagazemo akanya gato cyangwa kanini", "ku mihanda ibisikanirwamo, iyo ubugari bw'umwanya w'ibinyabiziga ugomba gutuma bibisikana butagifite m12", "ibisubizo byose nibyo"],
    "correctAnswer": "ibisubizo byose nibyo"
  },
  {
    "question": "Amatara ndangambere n'aya ndanganyuma y'imodoka zitarengeje m 6 z'uburebure na m 2 z'ubugari habariwemo imitwaro kdi nta kinyabiziga kindi kiziritseho ashobora gusimburwa n'amatara akurikira, iyo ibyo binyabiziga bihagaze umwanya muto cyangwa munini mu nsisiro bibangikanye ku ruhande rw'umuhanda:",
    "options": ["amatara magufi", "amatara ndangaburumbarare", "amatara yo guhagarara umwanya munini", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "amatara yo guhagarara umwanya munini"
  },
  {
    "question": "Iyo kuva bwije kugeza bukeye cyangwa bitewe nuko ibihe bimeze nk'igihe cy'igihu cyangwa cy'imvura bitagishoboka kubona neza muri m 200, imirongo y'ingabo z'igihugu zigendera kuri gahunda n'utundi dutsiko twose tw'abanyamaguru nk'imperekerane cyangwa udutsiko tw'abanyeshuri bari ku murongo bayobowe na mwarimu, iyo bagenda mu muhanda ku isonga hakaba hari abantu barenze umwe, bagaragzwa ku buryo bukurikira:",
    "options": ["imbere ni itara ryera ritwariwe ku ruhande rw'ibumoso n'umuntu uri ku murongo w'imbere hafi y'umurongo ugabanya umuhanda mo kabiri", "inyuma ni itara umuhondo ritwariwe ku ruhande rw'ibumoso n'umuntu uri ku murongo w'inyuma hafi y'umurongo ugabanya umuhanda mo kabiri", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Imizigo yikorewe n'amagare, velomoteri, amapikipiki, ibinyamitende by'ibiziga bitatu nibyo ibiziga bine bifite cyangwa bidafite moteri inyuma ntishobora kurenza ibipimo bikurikira:",
    "options": ["cm 20", "cm 30", "cm 50", "cm 60"],
    "correctAnswer": "cm 50"
  },
  {
    "question": "Itara ndanganyuma rigomba gushyirwa aha hakurikira:",
    "options": ["ahagereye inguni y'ibumoso y'ikinyabiziga", "ahagereye inguni y'iburyo bw'ikinyabiziga", "inyuma kandi y'impera y'ibumoso bw'ikinyabiziga", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "inyuma kandi y'impera y'ibumoso bw'ikinyabiziga"
  },
  {
    "question": "Nta tara na rimwe cyangwa utugarurarumuri bishobora kuba bifunze kuburyo igice cyabyo cyo hasi cyane kimurika kitaba kiri hasi ya cm 40 kuva ku butaka igihe ikinyabiziga kidapakiye ariko ibyo ntibikurikizwa ku matara akurikira:",
    "options": ["amatara kamenabihu", "amatara yo gusubira inyuma", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Iyo tumuritswe n'amatara y'urugendo $y^{\\prime}i$ kinyabiziga utugarurarumuri tugomba n'ijoro, igihe ijuru rikeye kubonwa n'umuyobozi w'ikinyabiziga kiri mu ntera ikurikira:",
    "options": ["metero 100", "metero 150", "metero 200", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "metero 150"
  },
  {
    "question": "Ibinyabiziga bigendeshwa na moteri, hatarimo velomoteri n'ibinyabiziga bidapakiye umuvuduko wabyo udashobora kurenga km 50 mu isaha ahateganye bigomba kuba bifite ibikoresho by'ihoni byumvikanira mu ntera ikurikira:",
    "options": ["metero 200", "metero 150", "metero 100", "metero 50"],
    "correctAnswer": "metero 100"
  },
  {
    "question": "Ahatari mu nsisiro ibyapa biburira n'ibyapa byo gutambuka mbere bigomba gushyirwa mu ntera ikurikira y'ahantu habyerekana:",
    "options": ["metero 150 kugeza kuri 200", "metero 100 kugeza kuri 150", "metero 50 kugeza kuri 100", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "metero 150 kugeza kuri 200"
  },
  {
    "question": "Inkombe z'inzira nyabagendwa cyangwa z'umuhanda zishobora kugaragazwa n'ibikoresho ngarurarumuri. Ibyo bikoresho bigomba gushyirwaho ku buryo abagenzi babibona ku buryo bukurikira:",
    "options": ["babona iburyo bwabo ibyibara ritukura cyangwa ibisa n'icunga rihishije", "ibumoso babona iby'ibara ryera", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Ahatari mu nsisiro, umuyobozi wese ugenza ikinyabiziga kimwe cyangwa ibinyabiziga bikomatanye bifite uburemere ntarengwa bwemewe burenga ibiro 3500 cyangwa bifite uburebure bwite burenga metero 10 agomba, keretse iyo anyuze cyangwa agiye kunyura ku bindi binyabiziga, gusiga hagati y'ikinyabiziga cye n'iki muri imbere umwanya uhagije kugirango ibinyabiziga bimuhiseho bishobore kuhigobeka bidateje impanuka igihe bibaye ngombwa ariko ibyo ntibikurikizwa mu bihe bikurikira:",
    "options": ["mu gihe ibigendera mu muhanda ari byinshi kimwe no mu duce tw'inzira nyabagendwa aho kunyuranaho bibujijwe", "igihe ibigendera mu muhanda ari byinshi", "mu duce tw'inzira nyabagendwa aho kunyuranaho bibujijwe", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "mu gihe ibigendera mu muhanda ari byinshi kimwe no mu duce tw'inzira nyabagendwa aho kunyuranaho bibujijwe"
  },
  {
    "question": "Amatara ndangacyerekezo agomba kuba agizwe n'ibintu bifashe ku rumuri rumyasa, biringaniye ku buryo bigira umubare utari igiharwe ku mpande z'imbere n'inyuma z'ikinyabiziga ayo matara aba afite amabara akurikira:",
    "options": ["amatara y'imbere aba yera cyangwa ari umuhondo", "ayinyuma aba atukura cyangwa asa n'icunga rihishije", "A na B ni ibisubizo by'ukuri", "ayinyuma aba asa n'icunga rihishije"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Amahoni y'ibinyabiziga bigendeshwa na moteri agomba kohereza ijwi ry'injyana imwe rikomeza kandi ridacengera amatwi ariko ibinyabiziga bikurikira bishobora kugira ihoni ridasanzwe ridahuye n'ibivuzwe haruguru:",
    "options": ["ibinyabiziga ndakumirwa", "ibinyabiziga bikora ku mihanda", "ibinyabiziga bifite ubugari burenze m 2.10", "A na B ni ibisubizo by'ukuri"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Icyapa kibuza kunyura kubindi binyabiziga byose uretse ibinyamitende ibiri n'amapikipiki adafite akanyabiziga ku ruhande gifite ibimenyetso by'amabara akurikira:",
    "options": ["umweru n'umukara", "umutuku n'umukara", "ubururu", "A na B ni ibisubizo by'ukuri"],
    "correctAnswer": "umutuku n'umukara"
  },
  {
    "question": "Icyapa kivuga ko hatanyurwa mu byerekezo byombi kirangwa n'ubuso bw'ibara rikurikira:",
    "options": ["umukara", "umweru", "ubururu", "umutuku"],
    "correctAnswer": "umweru"
  },
  {
    "question": "Ibinyabiziga bikurikira bigomba kugira ibikoresho by'ihoni byumvikanira mu ntera ya m 20:",
    "options": ["amapikipiki", "velomoteri", "ibinyabiziga bigendeshwa na moteri bidapakiye", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "velomoteri"
  },
  {
    "question": "Imirongo y'ingabo z'igihugu zigendera kuri gahunda n'utundi dutsiko twose tw'abanyamaguru nk'imperekerane cyangwa udutsiko tw'abanyeshuri iyo bitagishoboka kubona neza muri m200, bagaragazwa ni itara ryera imbere naho inyuma ni itara ry'umutuku ariko iyo uburebure bwiyo mirongo cyangwa bw'utwo dutsiko burenga m6 impande zatwo cyangwa zayo zigaragazwa ku buryo bukurikira:",
    "options": ["itara rimwe cyangwa menshi yera", "amatara menshi y'umuhondo", "amatara menshi asa n'icunga rihishije", "ibisubizo byose nibyo"],
    "correctAnswer": "ibisubizo byose nibyo"
  },
  {
    "question": "Amatara ndangambere na ndanganyuma y'imodoka zitarengeje m 6 z'uburebure na m 2 z'ubugari habariwemo imitwaro kandi nta kindi kinyabiziga kiziritseho ashobora gusimburwa n'amatara yo guhagarara umwanya munini iyo ibyo binyabiziga bihagaze umwanya muto cyangwa munini mu nsisiro bibangikanye ku ruhande rw'umuhanda. Ayo matara arangwa n'amabara akurikira:",
    "options": ["umweru cyangwa umuhondo imbere", "umutuku cyangwa umuhondo inyuma", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Amatara ndangaburumbarare agomba kubonwa nijoro igihe ijuru rikeye n'umuyobozi w'ikinyabiziga kiri mu ntera ya:",
    "options": ["m 50 nibura", "m 100", "m 150", "m 200 nibura"],
    "correctAnswer": "m 200 nibura"
  },
  {
    "question": "Uretse ku byerekeye imihanda iromboreje y'ibisate byinshi n'imihanda yimodoka igice $cy^{\\prime}$ kiri hakurya y'umurongo mugari wera ucibwa ku muhanda ngo ugaragaze inkombe mpimbano zawo kigenewe ibi bikurikira:",
    "options": ["guhagararwamo umwanya muto gusa", "guhagararwamo umwanya munini gusa", "guhagararwamo umwanya muto n'umunini", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "guhagararwamo umwanya muto n'umunini"
  },
  {
    "question": "Ibimenyetso by'agateganyo bigizwe n'imitemeri y'ibara risa n'icunga rihishije bishobora gusimbura ibi bikurikira:",
    "options": ["imirongo yera irombereje idacagaguye gusa", "imirongo yera irombereje idacagaguye n'icagaguye", "imirongo icagaguye n'idacagaguye ibangikanye", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "imirongo yera irombereje idacagaguye n'icagaguye"
  }
];

const quizData4 = [
  {
    "question": "Iyo bitagishoboka kubona muri m 200 imodoka zikuruwe n'inyamaswa, ingorofani, inyamaswa zitwaye imizigo cyangwa zigenderwamo kimwe n'amatungo bigomba kurangwa na:",
    "options": ["imbere ni itara ryera", "imbere ni itara ry'umuhondo cyangwa risa n'icunga rihishije", "inyuma ni itara rimwe ritukura", "ibisubizo byose ni ukuri"],
    "correctAnswer": "ibisubizo byose ni ukuri"
  },
  {
    "question": "Uretse igihe hari amategeko yihariye akurikizwa muri ako karere ikinyabiziga cyose gihagaze umwanya muto cyangwa munini, iyo gihagaze mu mwanya wo kuruhande wagenewe abanyamaguru, kugirango bashobore kugenda batagombye kunyura mu muhanda, umuyobozi agombye kubasigira akayira gafite byibura ibipimo bikurikira by'ubugari:",
    "options": ["m 1", "m 2", "m 0.5", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "m 1"
  },
  {
    "question": "Icyapa cyerekana ahantu hagenewe guhagararwamo n'imodoka nini zagenewe gutwara abantu cyirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari ahantu hagenewe guhagarara imodoka za taxi gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["umutuku n'umweru", "ubururu n'umweru", "umukara n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira y'amagare gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira y'abanyamaguru gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira y'amagare n'abanyamaguru gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira z'ibinyabiziga bitwara abantu rusange gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko inzira igenewe ibinyabiziga bimwe na bimwe gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko inzira igenewe amakamyo manini gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko inzira igenewe ibinyabiziga bitwara abantu bafite ubumuga gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari umwanya wagenewe ibinyabiziga bihagarara iminota mike cyane kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira yo kuruhande rw'umuhanda igenewe abanyamaguru gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira yo kuruhande rw'umuhanda igenewe abanyamaguru n'amagare gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira yo kuruhande rw'umuhanda igenewe abantu bafite ubumuga gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda yihariye ni:",
    "options": ["60 km/h", "80 km/h", "90 km/h", "100 km/h"],
    "correctAnswer": "80 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda ya gihugu ni:",
    "options": ["80 km/h", "90 km/h", "100 km/h", "120 km/h"],
    "correctAnswer": "100 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda ya kabiri ni:",
    "options": ["60 km/h", "80 km/h", "90 km/h", "100 km/h"],
    "correctAnswer": "80 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda mito ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "60 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'imigenderano ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "60 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'amakaro ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "60 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'ubutaka ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "40 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'amabuye ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "40 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'ibarizo ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "40 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'imihanda ngenderwamo n'abanyamaguru ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu masoko ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mahuriro y'imihanda ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu nzira z'ibinyabiziga bya rubanda ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu nzira z'abanyamaguru ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  }
]
;
const quizData5 = [
  {
    "question": "Iyo bitagishoboka kubona muri m 200 imodoka zikuruwe n'inyamaswa, ingorofani, inyamaswa zitwaye imizigo cyangwa zigenderwamo kimwe n'amatungo bigomba kurangwa na:",
    "options": ["imbere ni itara ryera", "imbere ni itara ry'umuhondo cyangwa risa n'icunga rihishije", "inyuma ni itara rimwe ritukura", "ibisubizo byose ni ukuri"],
    "correctAnswer": "ibisubizo byose ni ukuri"
  },
  {
    "question": "Uretse igihe hari amategeko yihariye akurikizwa muri ako karere ikinyabiziga cyose gihagaze umwanya muto cyangwa munini, iyo gihagaze mu mwanya wo kuruhande wagenewe abanyamaguru, kugirango bashobore kugenda batagombye kunyura mu muhanda, umuyobozi agombye kubasigira akayira gafite byibura ibipimo bikurikira by'ubugari:",
    "options": ["m 1", "m 2", "m 0.5", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "m 1"
  },
  {
    "question": "Icyapa cyerekana ahantu hagenewe guhagararwamo n'imodoka nini zagenewe gutwara abantu cyirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari ahantu hagenewe guhagarara imodoka za taxi gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["umutuku n'umweru", "ubururu n'umweru", "umukara n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira y'amagare gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira y'abanyamaguru gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira y'amagare n'abanyamaguru gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira z'ibinyabiziga bitwara abantu rusange gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko inzira igenewe ibinyabiziga bimwe na bimwe gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko inzira igenewe amakamyo manini gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko inzira igenewe ibinyabiziga bitwara abantu bafite ubumuga gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari umwanya wagenewe ibinyabiziga bihagarara iminota mike cyane kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira yo kuruhande rw'umuhanda igenewe abanyamaguru gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira yo kuruhande rw'umuhanda igenewe abanyamaguru n'amagare gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Icyapa cyerekana ko hari inzira yo kuruhande rw'umuhanda igenewe abantu bafite ubumuga gusa kirangwa n'ubuso bw'amabara akurikira:",
    "options": ["ubururu n'umweru", "umukara n'umweru", "umutuku n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubururu n'umweru"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda yihariye ni:",
    "options": ["60 km/h", "80 km/h", "90 km/h", "100 km/h"],
    "correctAnswer": "80 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda ya gihugu ni:",
    "options": ["80 km/h", "90 km/h", "100 km/h", "120 km/h"],
    "correctAnswer": "100 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda ya kabiri ni:",
    "options": ["60 km/h", "80 km/h", "90 km/h", "100 km/h"],
    "correctAnswer": "80 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda mito ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "60 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'imigenderano ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "60 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'amakaro ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "60 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'ubutaka ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "40 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'amabuye ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "40 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'ibarizo ni:",
    "options": ["40 km/h", "60 km/h", "80 km/h", "90 km/h"],
    "correctAnswer": "40 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mihanda y'imihanda ngenderwamo n'abanyamaguru ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu masoko ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu mahuriro y'imihanda ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu nzira z'ibinyabiziga bya rubanda ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  },
  {
    "question": "Umuvuduko ntarengwa w'ibinyabiziga bitwara abantu hamwe n'ibitwara ibintu mu nzira z'abanyamaguru ni:",
    "options": ["20 km/h", "40 km/h", "60 km/h", "80 km/h"],
    "correctAnswer": "20 km/h"
  }
]
;
const quizData6 = [
  {
    "question": "Itara ryo guhagarara ry'ibara ritukura rigomba kuba ridahumisha, kandi rigomba kugaragarira mu ntera ikurikira:",
    "options": ["nijoro igihe ijuru rikeye nibura muri m 200", "ku manywa igihe cy'umucyo nibura muri m50", "nijoro nibura muri m 100 igihe ijuru rikeye", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "nta gisubizo cy'ukuri kirimo"
  },
  {
    "question": "Birabujijwe kongera ku mpande z'ikinyabiziga kigendeshwa na moteri cyangwa velomoteri ibi bikurikira:",
    "options": ["imitako", "ibintu bifite imigongo cyangwa ibirenga ku mubyimba kandi bishobora gutera ibyago abandi bagenzi", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Ikintu cyose cyatuma hahindurwa ibyanditswe bireba nyirikarita cyangwa ibiranga ikinyabiziga kigomba kumenyeshwa ibiro by'imisoro haba mu magambo cyangwa mu ibaruwa ishinganye. Ibyo bikorwa mu gihe kingana gute:",
    "options": ["mu minsi 5", "mu minsi 8", "mu minsi 15", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "mu minsi 8"
  },
  {
    "question": "Kunyuranaho bikorerwa:",
    "options": ["mu ruhande rw'iburyo gusa", "igihe cyose ni ibumoso", "iburyo iyo unyura ku nyamaswa", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "igihe cyose ni ibumoso"
  },
  {
    "question": "Iyo ubugari bw'inzira nyabagendwa igenderwamo n'ibinyabiziga budahagije kugirango bibisikane nta nkomyi abagenzi bategetswe:",
    "options": ["kunyura mu nzira z'impande z'abanyamaguru", "guhagarara aho bageze", "koroherana", "gukuraho inkomyi"],
    "correctAnswer": "koroherana"
  },
  {
    "question": "Umuyobozi ugenda mu muhanda igihe ubugari bwawo budatuma anyuranaho nta nkomyi ashobora kunyura mu kayira k'abanyamaguru ariko amaze kureba ibi bikurikira:",
    "options": ["umuvuduko w'abanyamaguru", "ubugari bw'umuhanda", "umubare w'abanyamaguru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "nta gisubizo cy'ukuri kirimo"
  },
  {
    "question": "Icyapa cyerekana umuvuduko ntarengwa ikinyabiziga kitagomba kurenza gishyirwa ku binyabiziga bifite uburebure ntarengwa bukurikira:",
    "options": ["burenga toni 1", "burenga toni 2", "burenga toni 24", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "nta gisubizo cy'ukuri kirimo"
  },
  {
    "question": "Iyo nta mategeko awugabanya by'umwihariko, umuvuduko ntarengwa w'amapikipiki mu isaha ni:",
    "options": ["km 25", "km 70", "km 40", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "nta gisubizo cy'ukuri kirimo"
  },
  {
    "question": "Ahatari mu nsisiro umuvuduko ntarengwa wa velomoteri mu isaha ni:",
    "options": ["km 50", "km 40", "km 30", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "km 50"
  },
  {
    "question": "Birabujijwe guhagarara akanya kanini aha hakurikira:",
    "options": ["mu duhanda tw'abanyamagare", "mu duhanda twagenewe velomoteri", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Amatara maremare y'ikinyabiziga agomba kutamurika mu bihe bikurikira:",
    "options": ["iyo umuhanda umurikiwe umuyobozi abasha kureba muri m 200", "iyo ikinyabiziga kigiye kubisikana nikindi", "iyo ari mu nsisiro", "ibisubizo byose nibyo"],
    "correctAnswer": "ibisubizo byose nibyo"
  },
  {
    "question": "Ubugari bwa romoruki ikuruwe n'igare cyangwa velomoteri ntiburenza ibipimo bikurikira:",
    "options": ["cm 25", "cm 125", "cm 45", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "nta gisubizo cy'ukuri kirimo"
  },
  {
    "question": "Uburyo bukoreshwa kugirango ikinyabiziga kigende gahoro igihe feri idakora neza bwitwa:",
    "options": ["feri y'urugendo", "feri yo guhagarara", "feri yo gutabara", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "feri yo gutabara"
  },
  {
    "question": "Nta mwanya n'umwe feri ifungiraho ushobora kurekurana n'ibiziga keretse:",
    "options": ["iyo bireba feri y'urugendo", "iyo kurekurana ari ibyakanya gato", "iyo bireba feri yo guhagarara umwanya munini, ubwo kurekurana bikaba bidashoboka bidakozwe n'umuyobozi", "byose ni ibisubizo by'ukuri"],
    "correctAnswer": "byose ni ibisubizo by'ukuri"
  },
  {
    "question": "Ikinyabiziga ntigishobora kugira amatara arenze abiri y'ubwoko bumwe keretse kubyerekeye amatara akurikira:",
    "options": ["itara ndangamubyimba", "itara ryerekana icyerekezo", "itara ndangaburumbarare", "ibisubizo byose ni ukuri"],
    "correctAnswer": "ibisubizo byose ni ukuri"
  },
  {
    "question": "Itara ndanganyuma rigomba gushyirwa aha hakurikira:",
    "options": ["ku nguni y'iburyo y'ikinyabiziga", "ku gice cy'inyuma ku kinyabiziga", "ahegereye inguni y'ibumoso y'ikinyabiziga", "ibisubizo byose ni ukuri"],
    "correctAnswer": "ahegereye inguni y'ibumoso y'ikinyabiziga"
  },
  {
    "question": "Nibura ikinyabiziga gitegetswe kugira uduhanagurabirahuri dukurikira:",
    "options": ["2", "3", "1", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "1"
  },
  {
    "question": "Ibiziga by'ibinyabiziga bigendeshwa na moteri n'ibya velomoteri kimwe n'ibya romoruki zabyo bigomba kuba byambaye inziga zihagwa zifite amano n'ubujyakuzimu butari munsi ya milimetero imwe ku migongo yabyo yose, n'ubudodo bwabyo ntibugire ahantu na hamwe bugaragara kdi ntibigire aho byacitse bikomeye mu mpande zabyo. Ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:",
    "options": ["ibinyabiziga bidapakiye kdi bitajya birenza umuvuduko wa km 25 mu isaha ahateganye", "ibinyabiziga bya police bijya ahatarenga km 25 uvuye aho biba", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "Birabujijwe kugenza ibinyabiziga bigendeshwa na moteri na za romoruki zikururwa nabyo, iyo ibiziga byambaye inziga zidahagwa cyangwa inziga zikururuka zifite umubyimba uri hasi ya cm 4. Ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:",
    "options": ["ku binyabiziga by'ingabo", "ibinyabiziga bihinga iyo bigendeshwa mu karere katarenga km 25 uvuye aho ziba", "ibinyabiziga bya police", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ibinyabiziga bihinga iyo bigendeshwa mu karere katarenga km 25 uvuye aho ziba"
  },
  {
    "question": "Imirongo yera iteganye n'umurongo ugabanya umuhanda mo kabiri mu burebure bwawo ugaragaza:",
    "options": ["ahanyurwa n'amagare na velomoteri", "ahanyurwa n'ingorofani n'ibinyamitende", "ahanyurwa n'abanyamaguru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ahanyurwa n'abanyamaguru"
  },
  {
      "question": "Iyo harimo indi myanya birabujijwe gutwara ku ntebe y'imbere y'imodoka abana badafite imyaka ikurikira:",
      "options": ["imyaka 10", "imyaka 12", "imyaka 7", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "imyaka 12"
  }
]
;

export { quizData, quizData1, quizData2, quizData3, quizData4, quizData5, quizData6, quizData7, quizData8, quizData9, quizData10, quizData11, quizData12, quizData13, quizData14, quizData15, quizData16, quizData17, quizData18, quizData19 };
const quizData7 = [
  {
    "question": "Ubugari bw’imizigo yikorewe n’ipikipiki ifite akanyabiziga ko kuruhande kimwe n’ubwa romoruki ikuruwe na bene icyo kinyabiziga ntibushobora kurenza ibipimo bikurikira ku bugari bw’icyo kinyabiziga kidapakiye:",
    "options": ["m 1.25", "cm 30", "cm 75", "nta gisubizo cy’ukuri kirimo"],
    "correctAnswer": "cm 30"
  },
  {
    "question": "Mu gthe telefone yawe ihamagawe utwaye imodoka wakora iki?",
    "options": ["Kwitaba cyangwa guhagarara ako kanya", "kutayitaba", "Gushyira imodoka iruhande ukayitaba", "B na c ni ibisubizo byukuri"],
    "correctAnswer": "Gushyira imodoka iruhande ukayitaba"
  },
  {
    "question": "Mu gthe telefone yawe ihamagawe utwaye imodoka wakora iki?",
    "options": ["Kwitaba cyangwa guhagarara ako kanya", "kutayitaba", "Gushyira imodoka iruhande ukayitaba", "B na c ni ibisubizo byukuri"],
    "correctAnswer": "Gushyira imodoka iruhande ukayitaba"
  },
  {
    "question": "Niki wakora mbere y’uko uhindura icyerekezo?",
    "options": ["Gutanga ikimenyetso cy’ukuboko no gukoresha amatara ndangacyerekezo.", "Itegereze neza niba icyapa kikwemerera guhindura icyerekezo.", "A na B n’ibisubizo by’ukuri", "Nta gisubizo cy’ukuri kirimo"],
    "correctAnswer": "A na B n’ibisubizo by’ukuri"
  },
  {
    "question": "Niki muribi wakwirinda muglhe ushaka kunyuranaho?",
    "options": ["Nyuma y’ikona ugategereza kubona uburyo bwo kunyuranaho.", "Mumuhanda w’icyerekezo kimwe", "Aho utagomba kurenza ibirometero 30 mu isaha.", "Ugeze mumuhanda utaringaniye neza"],
    "correctAnswer": "Nyuma y’ikona ugategereza kubona uburyo bwo kunyuranaho."
  },
  {
    "question": "Niki wakora muglhe usanze mu bimenyetso binurika harimo ibara ry’unuhondo.",
    "options": ["Kongera umuvuduko", "Kugumana umuvuduko wari uriho.", "Kwitegura guhagarara.", "Gufata feri eyane."],
    "correctAnswer": "Kwitegura guhagarara."
  },
  {
    "question": "Muglhe ukurikiranye na romoruki,n’ukubera iki ugomba gusiga umwanya uhagije hagati yawe nayo?",
    "options": ["Bituma ubasha gukata ikorosi vuba.", "Bifasha umuyobozi wa ronoruki kukurebera mundorerwamo.", "Bifasha ronoruki guhagarara byoroshye.", "Bikurinda umuyaga."],
    "correctAnswer": "Bifasha umuyobozi wa ronoruki kukurebera mundorerwamo."
  },
  {
    "question": "Utegereje gukata iburyo kwiherezo ry’umuhanda.ukingirijwe nimodoka ihagaze.niki wakora?",
    "options": ["Guhagarara hanyuma ukagenda gake gake witonze kugezaho ureba neza.", "Kwihuta wegera imbere aho ushobora kureba ugaftnga ikindi cyerekezo.", "Gutegereza abanyamaguru bakakumenyesha ko ntakibazo wakata.", "Guhindukiza imodoka vuba kugirango ushake indi nzira wakoresha."],
    "correctAnswer": "Guhagarara hanyuma ukagenda gake gake witonze kugezaho ureba neza."
  },
  {
    "question": "Mugihe uri murugendo rurerure mumuhanda urombereje w’ibice byinshi.niki wakora mugihe wumva utangiye kugira ibitotsi?",
    "options": ["Gucuranga umuziki cyane.", "Kwihuta cyane kugirango usoze urugendo vuba.", "Kuva mumuhanda urombereje w’ibice byinshi, ugahagarara ahantu hatekanye.", "Niagisubizo cy’ukuri kirimo."],
    "correctAnswer": "Kuva mumuhanda urombereje w’ibice byinshi, ugahagarara ahantu hatekanye."
  },
  {
    "question": "Kuki ugomba gucana amatara mugihe hatangiye kwijima?",
    "options": ["Kugirango akerekanamuvuduko kagaragare neza.", "Kugirango abandi biborohere kukubona.", "Kugira ngo uiyane nabandi bayobozi bibinyabiziga.", "Kuko amatara yo ku muhanda ari kwaka"],
    "correctAnswer": "Kugirango abandi biborohere kukubona."
  },
  {
    "question": "Urimo kugenda munzira nyabagendwa ni gute wanyura k’umuyobozi w’igare?",
    "options": ["Kuvuza ihoni mugihe umumyuraho", "Kumunyuraho umwegereye", "Gusiga umwanya uhagije igihe umumyuraho", "Kugabanya umuvuduko mbere y’uko umumyuraho"],
    "correctAnswer": "Gusiga umwanya uhagije igihe umumyuraho"
  },
  {
    "question": "Niki wakora igihe utabona neza usubira inyuma?",
    "options": ["Kumanura ikirahure cy’imodoka urebe inyuma", "Gufungura umumyango w’imodoka ureba inyuma", "Gushaka umuntu uri hanze y’ikinyabiziga ukuyobora", "Gukoresha akarebanyuma kakwegereye"],
    "correctAnswer": "Gukoresha akarebanyuma kakwegereye"
  },
  {
    "question": "Igihe ukurikiwe n’ikinyabiziga gitwara abarwayi gicanye amatara y’intabaza arabagirana. Wakora iki?",
    "options": ["Kugihigamira ako kanya ndetse byaba ngombwa ugahagarara", "Kongera umuvuduko kugirango ugisige", "Kugumana umuvuduko wari ufite", "Guhagarara bitunguranye mu muhanda"],
    "correctAnswer": "Kugihigamira ako kanya ndetse byaba ngombwa ugahagarara"
  },
  {
    "question": "Wifuza kugana ibumoso imbere yawe. kubera iki ushaka umwanya mwiza kandi uhagije?",
    "options": ["Kwemerera abandi bayobozi b’ibinyabiziga kugutambukaho", "Kugirango ubone neza ikindi kerekezo ushaka gufata", "Kugirango ufashe abandi bose bakoresha umuhanda icyo ushaka gukora", "Kwemerera abandi bayobozi b’ibinyabiziga kukunyura munuhande rw’ibumoso"],
    "correctAnswer": "Kwemerera abandi bayobozi b’ibinyabiziga kugutambukaho"
  },
  {
    "question": "Utwaye ikinyabiziga inyuma ya romoruki.umuyobozi wayo akaguha ikimenyetso cyo kumutambukaho iburyo kandi ugana ibumoso, wakora iki?",
    "options": ["Kugabanya umuvuduko ukareka akagenda", "Gukomeza iburyo bwawe", "Kumunyuraho iburyo bwe", "Kugumana umuvuduko wari ufite ukamuvugiriza ihoni"],
    "correctAnswer": "Kugabanya umuvuduko ukareka akagenda"
  },
  {
    "question": "Wegereye inzira y’abanyamaguru ugasanga bategeregie kwambuka. Ugomba gukora iki?",
    "options": ["Kureka abakuze n’abaftie ubumuga bagatambuka mbere", "Kugabanya umuvuduko witegura guhagarara", "Gukoresha amatara abamenyesha kwambuka", "Gukoresha ibimenyetso byamaboko bihemerera kwambuka"],
    "correctAnswer": "Kugabanya umuvuduko witegura guhagarara"
  },
  {
    "question": "Uri hafi kunyura k’umuyobozi w’ikinyamitende. Muri ibi byapa bikurikira nikine wakwitondera?",
    "options": ["[Image placeholder]", "[Image placeholder]", "[Image placeholder]", "[Image placeholder]"],
    "correctAnswer": "[Image placeholder]",
    "image": true
  },
  {
    "question": "Kumanywa urumuri rudahagije hatabona neza .Ni ayahe matara y’urugendo ugomba gukoresha.",
    "options": ["Amatara yo kubisika na matara kamena-bihu.", "Amatara kamena-bihu y’imbere", "Amatara yo kubisikana", "Amatara kamena-bihu y’inyuma"],
    "correctAnswer": "Amatara kamena-bihu y’imbere"
  },
  {
    "question": "Niyihe mpamvu ituma tugomba kugabanya umuvuduko mugihe hari ibihu?",
    "options": ["Igihe feri idakora", "Igihe uhumishijwe n’amatara yo kubisikana", "Igihe moteri imara ngo izime", "Nuko biba bioroshiye kubona ikiri imbere"],
    "correctAnswer": "Nuko biba bioroshiye kubona ikiri imbere"
  },
  {
    "question": "Niki ugomba gukora igihe uhagaze ku muhanda igihe cy’ibihu?",
    "options": ["Kureka amatara ndanga akaguma yaka", "Kureka amatara yo kubisikana na kamena-bihu akaguma yaka", "Kureka amatara yo kubisikana akaguma yaka", "Kureka amatara y’urugendo akaguma yaka"],
    "correctAnswer": "Kureka amatara ndanga akaguma yaka"
  }
];
const quizData8 = [
  {
    "question": "Imbere yawe iki çyapa kikubwiye iki?",
    "options": ["Umuvuduko ntarengwa wemewe", "Iherezo ry’ibyo wabuzwaga", "Guhagarara umwanya munini n’umwanya moto ntibyemewe", "Birabujjiwe kuhinjira"],
    "correctAnswer": "Guhagarara umwanya munini n’umwanya moto ntibyemewe",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OsM.png"
  },
  {
    "question": "Iki çyapa gisobanura iki?",
    "options": ["Umunanda uzenguruka", "Igice cy’umuhanda uzenguruka", "Aho banyura bazengurutse", "Ibisubizo byose nibyo"],
    "correctAnswer": "Aho banyura bazengurutse",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Osk.png"
  },
  {
    "question": "Iki çyapa gisubanura iki?",
    "options": ["Iteme ridahoraho", "Umuhanda utaringaniye", "Umuhanda w’injira mu kuzimu", "Ubutaka bworoshiye"],
    "correctAnswer": "Umuhanda utaringaniye",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Osq.png"
  },
  {
    "question": "Iki çyapa gisobanura iki?",
    "options": ["Umuyaga w’intambike", "Urusaku rwo mu munanda", "Ikibuga cy’indege", "Ibisubizko byose nibyo"],
    "correctAnswer": "Umuyaga w’intambike",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Osn.png"
  },
  {
    "question": "Iki Çyapa Gisobanura iki?",
    "options": ["Uburenganzira bwo gutambuka mbere", "Nta kinyabiziqa kigendeshwa na moteri", "ibyerekezo bibiri by’umuhanda", "Birabujjiwe kunyuranaho"],
    "correctAnswer": "Birabujjiwe kunyuranaho",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Os6.png"
  },
  {
    "question": "Iherezo Ry’inzira Y’abanyamaguru",
    "options": ["Iherezo Ry’inzira Y’abanyamaguru", "Iherezo Ry’umuhanda Urombereje W’ibice Bylnshi", "A Na B Ni Ibisubizo By’ukuri", "Na nzira ihari"],
    "correctAnswer": "Iherezo Ry’umuhanda Urombereje W’ibice Bylnshi",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OLe.png"
  },
  {
    "question": "Iki cyapa gisobanura Iki?",
    "options": ["Iherezo Ry’umuhanda Wi Byerekezo Bibiri", "Ieme rmini Kandi rirerire", "Ifungana Ry’umuhanda", "Iherezo ry’iteme rifunganye"],
    "correctAnswer": "Ifungana Ry’umuhanda",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Os0.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Isangano rifite ishusho ya T", "Inzira idakomeza", "Aho batterfonera", "Na gisubizo cy’ukuri"],
    "correctAnswer": "Inzira idakomeza",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OsU.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Inzira y’abanyeshuri", "Abanyamaguru nübemerewe", "Agace k’abanyamaguru nta kinyabiiziga", "Hegereye aho abanyamaguru bambukira"],
    "correctAnswer": "Hegereye aho abanyamaguru bambukira",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OsH.png"
  },
  {
    "question": "wakora iki ubonye icyi cyapa?",
    "options": ["guhagarara gusa igilie ibinyabiiziga bikwegereye", "guhagarara niyo nta kinyabiiziga ubona", "Guhagarara gusa niba hari abana bategereje kwambuka", "Guhagarara gusa igilie ikimenyetso cyaka ari umutuku"],
    "correctAnswer": "guhagarara niyo nta kinyabiiziga ubona",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Os5.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Uguhinguka ku mwaro cyangwa ku nkombe cyangwa ahegereye icyome", "Inzira nyabagendwa iri kumusozi ucuramye", "Umuhanda utaringaniye", "Umuhanda wangjiwe n’isuri"],
    "correctAnswer": "Uguhinguka ku mwaro cyangwa ku nkombe cyangwa ahegereye icyome",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Oso.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Hanyurwa na velomoteri gusa", "Nta modoka", "Hanyurwa nimodoka gusa", "Nthanyurwa n’amapikipiki"],
    "correctAnswer": "Nthanyurwa n’amapikipiki",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Osy.png"
  },
  {
    "question": "Icyapa gitanga uburenganzira bwo gutambuka mbere kigira iyihe shusho?",
    "options": ["a", "b", "c", "d"],
    "correctAnswer": "d",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Ose.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Ahegereye amasangano y’inzira nyabagendwa n’inzira ya gari ya moshi ibambiye", "Inzira ibambiye imbere", "Inzira itabambiye itanafunze", "Imbere hari ikiraro cy’amatungo"],
    "correctAnswer": "Ahegereye amasangano y’inzira nyabagendwa n’inzira ya gari ya moshi ibambiye",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OxS.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Umuhanda wubatswe nabi", "Agacuri kateza ibyago", "Umuhanda utaringaniye", "Akazamuko gahanamye"],
    "correctAnswer": "Agacuri kateza ibyago",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Oxp.png"
  }
];
const quizData9 = 
  [
  {
    "question": "Nshobora kunyuraho umuyobozi w'ikinyabiziga wahagaze imbere y'inzira yabanyamaguru?",
    "options": [
      "yego",
      "yego nyuma yo kuvuza ihoni",
      "yego mu gihe nkurikiwe n'ibindi binyabiziga",
      "Oya"
    ],
    "correctAnswer": "Oya"
  },
  {
    "question": "Hejuru y'aka kanunga:",
    "options": [
      "Nshobora kunyura ku kinyabiziga icyo aricyose mu gihe nagabanyije umuvuduko",
      "nshobora kunyura gusa kubinyabiziga by'imitende ibiri",
      "kunyuranaho ibumoso birabujijwe",
      "a na b ni ibisubizo by'ukuri"
    ],
    "correctAnswer": "kunyuranaho ibumoso birabujijwe",
    "hasImage": "true",
    "imagePlaceholder": "https://s12.gifyu.com/images/b9O2I.png"
  },
  {
    "question": "Mu gihe cy'impanuka mu muhanda n'ubundi bushotoranyi ni yihe nimero ya telefone y'ubutabazi wahamagara:",
    "options": [
      "911",
      "100",
      "112",
      "131"
    ],
    "correctAnswer": "112"
  },
  {
    "question": "Ugeze bwa mbere ahabereye impanuka yo mu muhanda harimo inkomere wakora iki?",
    "options": [
      "gusohora inkomere mu kinyabiziga",
      "kubaha icyo kunywa",
      "ku menyesha impanuka no guhamagara ubutabazi",
      "nta gisubizo cy'ukuri kirimo"
    ],
    "correctAnswer": "ku menyesha impanuka no guhamagara ubutabazi"
  },
  {
    "question": "Mugihe ikinyabiziga cyacu bakinyuzeho",
    "options": [
      "Tugomba kugabanya umuvuduko",
      "Tugomba kongera umuvuduko",
      "Tugomba kongera umuvuduko n'ubwitonzi",
      "Nta gisubizo cy' ukuri kirimo"
    ],
    "correctAnswer": "Tugomba kugabanya umuvuduko"
  },
  {
    "question": "Ntibyemewe gukoresha telephone",
    "options": [
      "Mu biro bya leta",
      "Mu biro bya Polisi",
      "Igihe utwaye ikinyabiziga",
      "Ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "Igihe utwaye ikinyabiziga"
  },
  {
    "question": "Mbere yo kunyura ku kindi kinyabiziga, ni ngombwa kumenya ko:",
    "options": [
      "Nta kindi kinyabiziga kinturutse inyuma",
      "Umuhanda ubona neza, no kwitondera kunyuranaho",
      "Ikinyabiziga kinturutse imbere gishaka gukatira I buumoso",
      "Nta gisubizo cy'ukuri"
    ],
    "correctAnswer": "Umuhanda ubona neza, no kwitondera kunyuranaho"
  },
  {
    "question": "Ikindi kinyabiziga kiguturutse inyuma kiguterera amatara y'urumuri rumyasa, wakora iki?",
    "options": [
      "Kongera umuvuduko kugira ngo intera iri hagati yawe n'ukuri inyuma igumeho",
      "Fata feri y'urugendo kugira ngo umwereke ko ugiye guhagarara",
      "Emerera icyo kinyabiziga kugutambukaho niba imbere ntacyago gihari",
      "Nta gisubizo cy'ukuri kirimo"
    ],
    "correctAnswer": "Emerera icyo kinyabiziga kugutambukaho niba imbere ntacyago gihari"
  },
  {
    "question": "Mu gihe Umuntu ufite ubumuga bwo kutabona yambuka umuhanda yitwaje inkoni yera y'abatabona:",
    "options": [
      "Umuyobozi w'ikinyabiziga agomba gufata iyo nkoni nk'icyapa kimumenyesha ko agomba guhagarara",
      "Vuza ihoni ukomeze",
      "Gabanya nurangiza ukomeze witonze",
      "Ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "Umuyobozi w'ikinyabiziga agomba gufata iyo nkoni nk'icyapa kimumenyesha ko agomba guhagarara"
  },
  {
    "question": "Amatara y'urugendo, mu gihe cy'ibihu:",
    "options": [
      "Ni meza kuko atuma ureba kure",
      "Ni mabi kuko arakugarukira akaguhuma amaso",
      "Akwizeza ko abandi bakubona",
      "Nta gisubizo cy'ukuri"
    ],
    "correctAnswer": "Ni mabi kuko arakugarukira akaguhuma amaso"
  },
  {
    "question": "Gutwara uzungazunga mu muhanda:",
    "options": [
      "Ni bibi ku kinyabiziga cy'imitende ibiri",
      "Ni bibi igihe cyose",
      "Ni bibi ku kinyabiziga cy'imitende ine",
      "Nta gisubizo cy'ukuri"
    ],
    "correctAnswer": "Ni bibi igihe cyose"
  },
  {
    "question": "Telephone ngendanwa ntigomba gukoreshwa:",
    "options": [
      "Ahari ibimenyetso bimurika",
      "Igihe utwaye ikinyabiziga Ku muvuduko wa 20km/h",
      "A na B ni ibisubizo by'ukuri",
      "Nta gisubizo cy'ukuri"
    ],
    "correctAnswer": "Nta gisubizo cy'ukuri"
  },
  {
    "question": "Kunyuranaho bibujijwe gusa igihe:",
    "options": [
      "Igihe mu muhanda hagati hashushanyijemo umurongo w'umweru ucagaguye.",
      "Umuhanda ushushanyijwemo umurongo wera udacagaguye",
      "Ikinyabiziga gitwawe ku musozi unyerera",
      "Nta gisubizo cy'ukuri"
    ],
    "correctAnswer": "Umuhanda ushushanyijwemo umurongo wera udacagaguye"
  },
  {
    "question": "Mu gihe utwaye ikinyabiziga ni joro ucanye amatara maremare ugahura n'ikindi kinyabiziga giturutse mu kindi cyerecyezo:",
    "options": [
      "Gukomeza ibumoso",
      "Kuzimya ucana amatara maremare n'amagufi",
      "Kuzimya amatara maremare kugeza ikindi kinyabiziga gitambutse",
      "Nta gisubizo cy'ukuri kirimo"
    ],
    "correctAnswer": "Kuzimya amatara maremare kugeza ikindi kinyabiziga gitambutse"
  },
  {
    "question": "Igihe umuyobozi w'inyamaswa, afite inyamaswa idatuje, asaba ko ibinyabiziga bihagarara:",
    "options": [
      "Umuyobozi w'ikinyabiziga agomba guhagarara",
      "Umuyobozi w'ikinyabizigaagomba kuvuza ihoni agukomeza",
      "Umuyobozi w'ikinyabiziga agomba kugabanya umuvuduko",
      "Ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "Umuyobozi w'ikinyabiziga agomba guhagarara"
  },
  {
    "question": "Iyo mu muhanda hashushanyijemo umurongo wera ucagaguye, ntugomba",
    "options": [
      "Ntugomba kujya mu kindi gice cy'umuhanda",
      "Ushobora kujya mu kindi gice cy'umuhanda bibaye ngombwa",
      "Agomba guhagarika ikinyabiziga",
      "Nta gisubizo cy'ukuri"
    ],
    "correctAnswer": "Ushobora kujya mu kindi gice cy'umuhanda bibaye ngombwa"
  },
  {
    "question": "Kuvuza ihoni bibujijwe:",
    "options": [
      "Ku musigiti, ku rusengero, ku rutambiro",
      "Hafi y'ibitaro",
      "Hafi y'ubuyobozi bwa polisi",
      "Nta gisubizo cy'ukuri"
    ],
    "correctAnswer": "Hafi y'ibitaro"
  },
  {
    "question": "Icyemezo cy'Isuzuma ry'ikinyabiziga kimara igihe kingana iki?",
    "options": [
      "Amezi 6 kubinyabiziga bikora ubucuruzi",
      "Amezi 12 ku binyabiziga bidakora ubucuruzi",
      "Imyaka 2",
      "A na B ni ibisubizo by'ukuri"
    ],
    "correctAnswer": "A na B ni ibisubizo by'ukuri"
  },
  {
    "question": "N'iyihe myifatire myiza wagira ugeze aho abana bari hafi y'inzira nyabagendwa?",
    "options": [
      "Itonde, witegereze ni biba ngongwa ubaburire unitegura kuba wahagarara.",
      "Ihute urenge aho abo bana bari",
      "Komeza ugume ku muvuduko munini",
      "Komeza ugendere kuruhande rw'iburyo"
    ],
    "correctAnswer": "Itonde, witegereze ni biba ngongwa ubaburire unitegura kuba wahagarara."
  },
  {
    "question": "Umuyobozi w'ikinyabiziga yegereye aho umwana w'umuhungu utwaye akagare k'abana asezera ku nshuti ye. N'iyihe myifatire myiza wagira imbere yabo?",
    "options": [
      "Ikomereze nkaho ataragera munzira nyabagendwa",
      "Itegure kureka uwo mwana w'umuhungu atambuke, kuko yajya mu muhanda atitaye ku kinyabiziga cyawe",
      "Gabanya umuvuduko ubwire uwo mwana yambuke ukoresheje ibimenyetso",
      "Komeza nkaho uwo mwana akiri munzira y'abanyamaguru"
    ],
    "correctAnswer": "Itegure kureka uwo mwana w'umuhungu atambuke, kuko yajya mu muhanda atitaye ku kinyabiziga cyawe",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9O2A.png"
  },
  {
    "question": "Nk'umuyobozi w'ikinyabiziga, n'iyihe myitwarire wagira?",
    "options": [
      "Umuyobozi w'ikinyabiziga agomba gukomeza",
      "Umuyobozi w'ikinyabiziga agomba kuguma mu ruhande rw'iburyo kugira ngo ahe inzira umumotari",
      "Umuyobozi w'ikinyabiziga agomba gutegereza",
      "Umuyobozi w'ikinyabiziga agomba gutanga inzira ayiha umu motari"
    ],
    "correctAnswer": "Umuyobozi w'ikinyabiziga agomba gukomeza",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9O2J.png"
  }
];
const quizData10 = [
  {
    "question": "Umuyobozi w'ikinyabiziga ageze hafi y'inzira y'abanyamaguru yakwitwara ate?",
    "options": [
      "Kugabanya umuvuduko mu gihe cyiza, ukitegura guhagarara",
      "Gukomeza agendera ku muvuduko uri hejuru, mu gihe umunyamaguru ategereje",
      "Kuguma ku muvuduko yari afite mu gihe umunyamaguru atarambuka",
      "Kuvuza ihoni akaguma ku muvuduko yahozeho"
    ],
    "correctAnswer": "Kugabanya umuvuduko mu gihe cyiza, ukitegura guhagarara"
  },
  {
    "question": "Umuyobozi w'ikinyabiziga akurikiye ibinyabiziga bibiri, yifuza kubinyuraho. N'iki yashingiraho mbere yo kubanyuraho?",
    "options": [
      "Ugomba kuzinyuraho zombi",
      "Sibyiza ko zazinyuraho atabasha kureba neza imbere ye",
      "Ibyapa by'aho ageze ntibimwemerera kunyuranaho",
      "Imbere har'inzira y'abanyamaguru"
    ],
    "correctAnswer": "Sibyiza ko zazinyuraho atabasha kureba neza imbere ye",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OSq.png"
  },
  {
    "question": "N'iki umuyobozi w'ikinyabiziga yakora ashaka gukatira iburyo?",
    "options": [
      "Vuza ihoni umenyesha umunyegare ko ushaka gukatira iburyo",
      "Kata ikoni mbere y'umunyegare",
      "Emerera umunyegare akomeze inzira ye",
      "Ongera umuvuuko kugira ngo umutange gukata mbere ye"
    ],
    "correctAnswer": "Emerera umunyegare akomeze inzira ye",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OSc.png"
  },
  {
    "question": "N'ayahe matara umuyobozi w'ikinyabiziga agomba gukoresha mugihe cy'ibihu?",
    "options": [
      "Amatara kamena bihu y'imbere n'ay'inyuma hamwe n'amatara magufi",
      "Amatara kamenabihu y'imbere n'ay'inyuma",
      "Amatara magufi",
      "Urumuri rusanzwe"
    ],
    "correctAnswer": "Amatara kamena bihu y'imbere n'ay'inyuma hamwe n'amatara magufi"
  },
  {
    "question": "Muri ibi binyabiziga n'ikihe gihagaze nabi?",
    "options": [
      "Ibinyabiziga byombi",
      "Ikinyabiziga cy'icyatsi",
      "Ikinyabiziga cy'umutuku",
      "Nta n'imwe"
    ],
    "correctAnswer": "Ibinyabiziga byombi",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OSC.png"
  },
  {
    "question": "Ni gute umuyobozi w'ikinyabiziga yanyura kumunyegare hano?",
    "options": [
      "Aha umuyobozi w'ikinyabiziga ntashobora kumunyuraho",
      "Atarenze umurongo wera ucagaguye",
      "Arenze umurongo wera ucagaguye",
      "Nta kurenga iyi mirongo yombi"
    ],
    "correctAnswer": "Arenze umurongo wera ucagaguye",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OSa.png"
  },
  {
    "question": "N'iki umuyobozi w'ikinyabiziga yakora aramutse ahumishijwe n'urumuri rw'amatara yikinyabiziga giturutse mu kindi cyerekezo?",
    "options": [
      "humisha ikinyabiziga giturutse mu kindi cyerekezo ucana amatara maremare",
      "Egera kunkombe y'iburyo bw'umuhanda nibinashobioka ugabanye umuvuduko",
      "Canira amatara ikinyabiziga kiva mukindi cyerekezo",
      "Ongera umuvuduko kugira ngo usohoke mururwo rumuri vuba bishoboka"
    ],
    "correctAnswer": "Egera kunkombe y'iburyo bw'umuhanda nibinashobioka ugabanye umuvuduko"
  },
  {
    "question": "Niki ugomba gukora igihe wegereye ikimenyetso kimurika kiva mucyatsi kijya mumuhondo?",
    "options": [
      "Ongera umuvuduko kugirango usoze ikoni",
      "Komeza kuko itara ry'icyatsi rigiye kwaka",
      "Hagarara niba utateza ibyago",
      "Komeza ubwitonzi witegura guhagarara mugihe itara rihindutse umutuku"
    ],
    "correctAnswer": "Komeza ubwitonzi witegura guhagarara mugihe itara rihindutse umutuku"
  },
  {
    "question": "Niki umuyobozi w' ikinyabiziga akwiriye kumenya mugihe akurikiye umuyobozi wikinyamitende ibiri kandi imodoka y' umweru iri gusubira inyuma ijya mumuhanda?",
    "options": [
      "Umuyobozi wikinyabiziga gisubira inyuma azahagarara nabona umuyobozi w' ikinyabimitende ibiri",
      "Umuyobozi w' ikinyamitende ibiri ashobora gusaba umuyobozi w' ikinyabiziga gisubira inyuma guhagarara",
      "Amatara yoguhagarara ashobora kuzima ikinyabiziga gikomeza gusubira inyuma",
      "Umuyobozi w' ikinyamitende ashobora guhagarara bitunguranye"
    ],
    "correctAnswer": "Umuyobozi w' ikinyamitende ashobora guhagarara bitunguranye",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OSr.png"
  },
  {
    "question": "Aha niki umuyobozi w' ikinyabiziga yakora mugihe ashaka kujya iburyo?",
    "options": [
      "Gukomeza hagati y' abanyamaguru babiri",
      "kuvuza ihoni akongera umuvuduko",
      "Guhagarara akareka abanyamaguru bakambuka",
      "Reka umunyamaguru umwe atambuke ubone umwanya wogutambuka"
    ],
    "correctAnswer": "Guhagarara akareka abanyamaguru bakambuka",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Oxw.png"
  },
  {
    "question": "Aha umuyobozi w' ikinyabiziga ashobora kunyura kuri aba abanyamagare?",
    "options": [
      "Oya, umuyobozi ntashobora kureba imbere neza",
      "Yego, kuko umurongo wera ucagaguye udashobora kuba udacagaguye",
      "Yego, abanyamagare bazumva imodoka bave munzira",
      "Yego, kuko buri kinyabiziga kiva mukindi cyerekezo gishobora kuguha inzira"
    ],
    "correctAnswer": "Oya, umuyobozi ntashobora kureba imbere neza",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OS1.png"
  },
  {
    "question": "Aha niki umuyobozi w' ikinyabiziga yakora?",
    "options": [
      "Kwemerera abanyamaguru kwambuka umuhanda",
      "Kuvuza ihoni agakomeza",
      "Tengereza munzira y' abanyamaguru kugeza imidoka izimye",
      "Kongera umuvuduko mbere yuko abanyamaguru bambuka"
    ],
    "correctAnswer": "Kwemerera abanyamaguru kwambuka umuhanda",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OSG.png"
  },
  {
    "question": "Muri ibi binyabiziga bine ni ikihe kiri mu buryo bwiza bwo gukata ikoni ry'iburyo kiva mu muhanda munini kijya mu muto?",
    "options": [
      "Ikinyabiziga cya mbere kiri mu buryo bwiza bwo gukata ikoni ry'iburyo",
      "Ikinyabiziga cya kabiri kiri mu buryo bwiza bwo gukata ikoni ry'iburyo",
      "Ikinyabiziga cya gatatu kiri mu buryo bwiza bwo gukata ikoni ry'iburyo",
      "Ikinyabiziga cya kane kiri mu buryo bwiza bwo gukata ikoni ry'iburyo"
    ],
    "correctAnswer": "Ikinyabiziga cya mbere kiri mu buryo bwiza bwo gukata ikoni ry'iburyo",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OSe.png"
  },
  {
    "question": "Niki umuyobozi w'ikinyabiziga yakora mu gihe abonye icyapa kiburira cya mpande eshatu gitukura mu muhanda?",
    "options": [
      "Hagarara utegereze amabwiriza",
      "Umuyobozi w'ikinyabiziga agomba kugabanya umuvuduko ateganya icyago imbere ye",
      "Kukireka, ukagumana umuvuduko ufite ugakomeza",
      "Hagarara kuri icyo cyapa cya mpande eshatu mbere yo gukomeza"
    ],
    "correctAnswer": "Umuyobozi w'ikinyabiziga agomba kugabanya umuvuduko ateganya icyago imbere ye"
  },
  {
    "question": "Niki umuyobozi w'ikinyabiziga agomba gukora ahuye n'amatungo mu muhanda?",
    "options": [
      "Kuvuza ihoni kugirango zihunge",
      "Umuyobozi w'ikinyabiziga agomba kugabanya umuvuduko zigatambuka",
      "Kwatsa amatara maremare kugirango utambuke wihuta mu buryo bushoboka bwose",
      "Kuvuza ihoni ukanyuraho witonze"
    ],
    "correctAnswer": "Umuyobozi w'ikinyabiziga agomba kugabanya umuvuduko zigatambuka"
  },
  {
    "question": "Niki umuyobozi w'ikinyabiziga yakora abonye otobisi iri kuva aho zagenewe guhagararwamo?",
    "options": [
      "Gukomeza iruhande kuko ufite uburenganzira bwo gukomeza",
      "Gabanya umuvuduko maze ureke ikomeze",
      "Gerageza unyureho kugirango atagutinza",
      "Menyesha umuyobozi wa otobisi aguhe inzira"
    ],
    "correctAnswer": "Gabanya umuvuduko maze ureke ikomeze"
  },
  {
    "question": "Niki umuyobozi w'ikinyabiziga yakora mugihe ahuye n'ikinyabiziga cyakije itara ry'umuhondo rimyatsa?",
    "options": [
      "Mu gihe ikinyabiziga giturutse mu kindi cyerekezo kitagishoboye kugenda",
      "Mu gihe ikinyabiziga ndakumirwa giturutse mu kindi cyerekezo",
      "Mu gihe ikinyabiziga giturutse mu cyindi cyerekezo cy'ihuta",
      "Kugabanya umuvuduko witegura guhagarara"
    ],
    "correctAnswer": "Kugabanya umuvuduko witegura guhagarara"
  },
  {
    "question": "Umuyobozi w'ikinyabiziga yakara iki mu gihe anyuzweho nikindi kinyabiziga?",
    "options": [
      "Gukomezanya umuvuduko warufite",
      "Kujya i buryo",
      "Kujya I bumoso",
      "Kwongera umuvuduko"
    ],
    "correctAnswer": "Gukomezanya umuvuduko warufite"
  },
  {
    "question": "Umurongo w'umweru urombereje uciye hagati mu muhanda uvuze iki?",
    "options": [
      "Umuyobozi wese abujijwe kuwurenga",
      "Abanyamitende wemerewe kunyuranaho",
      "Kuhahagara biremewe",
      "Guhindukira ku manywa"
    ],
    "correctAnswer": "Umuyobozi wese abujijwe kuwurenga",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Obb.png"
  },
  {
    "question": "Umuyobozi w'ikinyabiziga ugeze mu isangano ry'umuhanda ugenzurwa ni ibimenyetso by'amatara yaka agasanga ataka (adakora), yakora iki?",
    "options": [
      "Guca mu isangano n'ubwitonzi nkaho ntakimenyetso kikuyobora kirimo, witondera abandi bayobozi b'ibinyabiziga",
      "Gutwara neza ntagutinda mw'isangano",
      "Guhagarara mw'isangano no guha inzira abayobozi b'ibinyabiziga baturuka iburyo bwawe",
      "Gucana amatara yose ndanga cyerekezo ugakomeza"
    ],
    "correctAnswer": "Guca mu isangano n'ubwitonzi nkaho ntakimenyetso kikuyobora kirimo, witondera abandi bayobozi b'ibinyabiziga",
    "hasImage": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9ObM.png"
  }
];
const quizData11 = [
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Guhindura icyerekezo ibumoso ugana aho bahagarara", "Umuhanda udakomeza", "Nit byemewe guhindura icyerekezo ibumoso", "Guhindura ikirekezo ibumoso ugana ku cyome"],
    "correctAnswer": "Umuhanda udakomeza",
    "image": true,
    "imagePlaceholder": ""
  },
  {
    "question": "Mu bimenyetso bimurika itara ritukura rivuga iki?",
    "options": ["Hagarara kereste niba ushaka gukata ibumoso", "Hagarara niba ubona ntabyago byaguteza", "Birabujjiwe kurenga icyo kimenyetso", "Wemerewe kugenda niba aho asohokera mu masangano y'umuhanda hafunze"],
    "correctAnswer": "Birabujjiwe kurenga icyo kimenyetso"
  },
  {
    "question": "Mubimenyetso binurika itara ry'umuhondo risobanura iki?",
    "options": ["Ilegure kugenda", "Birabujjiwe gutambuka umurongo wo gulagarara umwanya muto eg igihe uwo murongo udahari icyo kimenyetso ubwacyo", "A na b ni ibisubizo by'ukuri", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Birabujjiwe gutambuka umurongo wo gulagarara umwanya muto eg igihe uwo murongo udahari icyo kimenyetso ubwacyo"
  },
  {
    "question": "Mubimenyetso binurika itara ry'icyatsi risobanura iki?",
    "options": ["Kwiegura kugenda", "Uburenganzira bwo kurenga icyo kimenyetso", "Hagarara niba inzira isohoka mu isangano ry'imihanda ifunze", "Nagisubizo cyukuri kirimo"],
    "correctAnswer": "Uburenganzira bwo kurenga icyo kimenyetso"
  },
  {
    "question": "Umurongo ucagaguye wera mu muhanda usobanura iki?",
    "options": ["Birabujjiwe kuwurenga", "Birabujjiwe kuhahagarara", "Wegereye ahaguteza ibyago", "Kunyuranaho ntibyemewe"],
    "correctAnswer": "Birabujjiwe kuwurenga"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Ukugendera mu muhanda ubisikanirwamo", "Ukugendera mu muhanda ubisikanirwamo ntibyemewe", "Cyerekana aho umumyegare agomba kunyura", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Ukugendera mu muhanda ubisikanirwamo",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Oxm.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Ahatangirwa serivisi ni muri metero 30.", "Umuvuduko munini ntarengwa utegetswe ni 30 km/h.", "Umuvuduko muto ntarengwa utegetswe ni 30 km/h.", "Aho ibinyabiziga bihagarara ni imbere mu birometero 30."],
    "correctAnswer": "Umuvuduko muto ntarengwa utegetswe ni 30 km/h.",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OxI.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Ahegereye umuhanda unyerera.", "Imbere ipine ryapfumutse.", "Ahegereye icyago kidasobanuye ukundi.", "Imbere hari hatangirwa serivisi."],
    "correctAnswer": "Ahegereye icyago kidasobanuye ukundi",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OxW.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Imbere hari umuyobozi w'amatungo.", "Imbere hari inzira ya gari ya moshi.", "Ahegereye amasangano y'inzira nyabagendwa n'inzira ya gari ya moshi hatabambiye", "Inkomane ibambiye."],
    "correctAnswer": "Ahegereye amasangano y'inzira nyabagendwa n'inzira ya gari ya moshi hatabambiye",
    "image": true,
     "imagePlaceholder": "https://s12.gifyu.com/images/b9Oxj.png"
  },
  {
    "question": "Muri iri sangano ry'umuhanda hari icyapa gisobanura 'guhagarara' n'umurongo wera urombereje munzira. Niyihe npamvu hari iki cyapa cyo 'guhagarara' hano?",
    "options": ["Biragoye kubona neza mu muhanda munini", "Umuvuduko mu muhanda munini wavanyweho", "Ni mwisangano ry'umuhanda rikoreshwa cyane", "Hari imirongo iburira ibyago bitunguranye"],
    "correctAnswer": "Biragoye kubona neza mu muhanda munini"
  },
  {
    "question": "Ni iki gikenewe muri ibi bikurikira kugirango ubashe gutwara imodoka mu muhanda biteganywa nitegeko",
    "options": ["Uruhushya rwa burundu rwo gutwara ibinyabiziga rugifite agaciro", "Ubwishingizi bw'ikinyabizaga bugifite agaciro", "Icyemezo cy'iyandikwa ry'ikinyabiziga", "Ibisubizo byose nibyo"],
    "correctAnswer": "Ibisubizo byose nibyo"
  },
  {
    "question": "Ikinyabiziga gishya gikenerwa gusuzumwa bwambere nyuma y'igihe kingana iki?",
    "options": ["Nyuma y'umwaka umwe", "Nyuma y'imyaka ibiri", "A na b ni ibisubizo by'ukuri", "Nta gisubizo cy'ukuri"],
    "correctAnswer": "Nyuma y'imyaka ibiri"
  },
  {
    "question": "Ni ryari ushobora kwakiriza icyarimwe amatara yose ndangacyerekezo y'ikinyabiziga?",
    "options": ["Mu gibe ushaka kuburira abandi bakoresha umuhanda", "Mu gibe ikinyabiziga eyawe gishobora gutera ibyago", "A na b ni ibisubizo by'ukuri", "Ntagisubizo cy'ukuri"],
    "correctAnswer": "A na b ni ibisubizo by'ukuri"
  },
  {
    "question": "Ugeze ahabereye impanuka yo mumuhanda bwambere ugasanga abakomeretse bikomeye. wakiriza icyarimwe amatara y'ibyerekezo byombi, niki kindi ushobora gukora?",
    "options": ["Kumenya neza niba imbangukiragutabara yahamagawe", "Guhagarika ibinyabiziga bindi no kubasaba ubufasha", "A na b ni ibisubizo by'ukuri", "Nta gisubizo cy'ukuri"],
    "correctAnswer": "A na b ni ibisubizo by'ukuri"
  },
  {
    "question": "Umuyobozi w'ikinyabizaga cy'ikoreye ibintu bishobora gufata inkongi, n'ikihe cyapa cyerekana ko ibyo atwaye biturika by'afata inkongi?",
    "options": ["a", "b", "c", "d"],
    "correctAnswer": "b",
    "image": true,
     "imagePlaceholder": "https://s12.gifyu.com/images/b9OxV.png"
  },
  {
    "question": "Wakoze impanuka yo mu muhanda, ni ikihe cyangombwa polisi ishobora kugusaba kucyerekana?",
    "options": ["Icyemezo cy'iyandikwa ryi ikinyabiziga", "Uruhusa rwa burundu rwo gutwara ikinyabiziga", "Uruhushya rwagateganyo", "Imikorere y'ikinyabiziga"],
    "correctAnswer": "Uruhusa rwa burundu rwo gutwara ikinyabiziga"
  },
  {
    "question": "Uhuye n'ingorane utwaye ikinyabiziga, mu muhanda ufite ibyerekezo bibiri, ufite ikimenyetso kiburira cya mpandeshatu. wagishyira mu ntera ingana iki uvuye aho ikinyabiziga cyahagaze",
    "options": ["Metero 5", "Metero 25", "Metero 45", "Metero 100"],
    "correctAnswer": "Metero 25"
  },
  {
    "question": "Umuyobozi usunika ipikipiki agomba gufatwa nka:",
    "options": ["Umunyamaguru", "Umuyobozi w'ikinyabiziga", "Umugenzi", "A na b ni ibisubizo by'ukuri"],
    "correctAnswer": "Umuyobozi w'ikinyabiziga"
  },
  {
    "question": "Icyapa gikoze mw'ishusho ya mpandeshatu kimenyesha:",
    "options": ["ibyago", "ibbutjiwe", "ibitegetswe", "magisubizo cy'ukuri kirimo"],
    "correctAnswer": "ibyago",
    "image": true,
     "imagePlaceholder": "https://s12.gifyu.com/images/b9OxD.png"
  },
  {
    "question": "Iki cyapa gisobanura:",
    "options": ["uburenganzira bwo gutambuka mbere", "uburenganzira bwo gutambuka mbere mu yandi masangano y'umuhanda akwegereye", "ibyago imbere mu masangano y'umuhanda ukwegereye", "a na b ni ibisubizo by'ukuri"],
    "correctAnswer": "uburenganzira bwo gutambuka mbere",
    "image": true,
     "imagePlaceholder": "https://s12.gifyu.com/images/b9Ox1.png"
  },
  {
    "question": "Iki cyapa gisobanura:",
    "options": ["Nitharyurwa n'abanyamaguru", "Akayira kabanyamaguru", "Aho abanayamaguru bambukira", "B na c ni ibisubizo by'ukuri"],
    "correctAnswer": "Aho abanayamaguru bambukira",
    "image": true,
     "imagePlaceholder": "https://s12.gifyu.com/images/b9OxO.png"
  },
  {
    "question": "Urenze mumsisiro,ukahasanga ibyapa bibiri iburyo bwawebimenyesha ko irangira ry'imirimo bitewe nieyo ibyo byapa bemenyesha wagendera kuwuhe muvuduko?",
    "options": ["70 km/h", "50 km/h", "40 km/h", "80 km/h"],
    "correctAnswer": "80 km/h",
    "image": true,
     "imagePlaceholder": "https://s12.gifyu.com/images/b9OxP.png"
  }
];
const quizData12 = [
  {
    "question": "Ibyapa bibuza n'ibitegeka bikurikizwa gusa:",
    "options": ["Mumasangano", "mu bimenyetso bimurika", "a na b ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "nta gisubizo cy'ukuri kirimo",
    "image": false
  },
  {
    "question": "Ibyapa biburira bibereyeho kumenyesha umugenzi:",
    "options": ["ko hari icyago", "icyago kidasobanuye ukundi", "imiterere y'icyago gitunguranye", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ko hari icyago",
    "image": false
  },
  {
    "question": "Ibyapa by'inyongera bishobora kumenyesha:",
    "options": ["ibitegetswe byihariye gusa", "ubugerure cyangwa amarengamategeko rusange cyangwa ibibujijwe ndetse n'ibitegetswe byihariye", "a na b ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ubugerure cyangwa amarengamategeko rusange cyangwa ibibujijwe ndetse n'ibitegetswe byihariye",
    "image": false
  },
  {
    "question": "Ishusho y'icyapa kivuga 'ugukikira' bitegetswe ni:",
    "options": ["mpandeshatu", "uruziga", "urukiramende", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "uruziga",
    "image": false
  },
  {
    "question": "Icyapa kivuga 'icyerekezo gitegetswe' kigizwe n'ikirango cy'ibara:",
    "options": ["umweru", "umutuku", "ubururu n'ikirango cy'umweru", "umukara"],
    "correctAnswer": "ubururu n'ikirango cy'umweru",
    "image": false
  },
  {
    "question": "Iki kimenyetso gitanzwe n'umukozi ubifitiye ububasha cyo guhagarara:",
    "options": ["ku bakoresha umuhanda ba muturutse imbere", "ku bakoresha umuhanda bose bamuturutse imbere n'inyuma", "kubakoresha umuhanda bose bamuturutse inyuma", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "ku bakoresha umuhanda bose bamuturutse imbere n'inyuma",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHb.png"
  },
  {
    "question": "Ibi byapa byo mu muhanda birambuza kunyuranaho ibumoso?",
    "options": ["yego", "yego, iyo ufite umuvuduo wa 90km/h", "oya", "ntagisubizo cy'ukuri"],
    "correctAnswer": "yego",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHM.png"
  },
  {
    "question": "Umuhanda urombereje w'ibice byinshi. Ndashaka kunyura kuri izi kamyo ebyiri mugihe gito ibumoso icyarimwe, biremewe?",
    "options": ["yego", "oya", "yego bikorewe ibumoso", "ntagisubizo cy'ukuri"],
    "correctAnswer": "oya",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHL.png"
  },
  {
    "question": "K'umuyobozi w'ivatiri, iki cyapa kivuze iki?",
    "options": ["kirambuza gutwara ku muvuduko utarengeje 5km/h", "ntaburenganzira kimpa, mugihe gikurikizwa ku binyabiziga bifite hejuru y atoni 5", "ntacyo bindebaho mugihe bireba gusa zipima tone 5 no kurengaho", "Ntagisubizo cy'ukuri kirimo"],
    "correctAnswer": "ntacyo bindebaho mugihe bireba gusa zipima tone 5 no kurengaho",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHN.png"
  },
  {
    "question": "Ndashaka gukata iburyo. Biremewe?",
    "options": ["yego", "yego, ariko nyuma yo guhagarara", "ntabwo byemewe", "ntagisubizo cyukuri kirimo"],
    "correctAnswer": "ntabwo byemewe",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OH3.png"
  },
  {
    "question": "Umuhanda wambukiranya inzira ya gariyamoshi",
    "options": ["nshobora gukomeza nkambuka umuhanda kubera ko uruzitiro rufunguye", "ngomba guhagarara munsi yitara ry'umutuku rimyatsa", "ntabwo nakomeza urugendo rwanjye. Ngomba gihita mpagarara", "ntagisubizo cy'ukuri"],
    "correctAnswer": "ngomba guhagarara munsi yitara ry'umutuku rimyatsa",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHh.png"
  },
  {
    "question": "Kuri iki cyapa cyo mu muhanda cyambere kintegeka?",
    "options": ["Kugendera k'umuvuduko uri hejuru ya 30km/h", "kutarenza umuvuduko wa 30km/h", "birabujijwe kugendera kumuvuduko uri hejuru ya 30km/h", "nta gisubizo cyukuri"],
    "correctAnswer": "birabujijwe kugendera kumuvuduko uri hejuru ya 30km/h",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHm.png"
  },
  {
    "question": "Mpagaze mu murongo wo guhagarara umwanya muto",
    "options": ["Nshobora gukata iburyo", "Nshobora gukata ibumoso", "Nshobora gukata ibumoso cyangwa iburyo", "Ntagisubizo cy'ukuri kirimo"],
    "correctAnswer": "Nshobora gukata ibumoso",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OH7.png"
  },
  {
    "question": "Ngomba:",
    "options": ["guhagarara igihe gito kuri icyi cyapa cy'umuhanda", "guhagarara ngatanga inzira kuri metero 100 ntaragera kuri icyi cyapa", "gutanga inzira nkanahagarara iyo ari ngombwa muri m100 ntaragera kuri icyi cyapa", "ntagisubizo cy'ukuri"],
    "correctAnswer": "guhagarara ngatanga inzira kuri metero 100 ntaragera kuri icyi cyapa",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHd.png"
  },
  {
    "question": "Ndashaka kugata ibumoso. Imodoka y'icyatsi yaje irahagarara. Ninde ufite uburenganzira bwo gutambuka mbere?",
    "options": ["mfite uburenganzira bwo gutambuka mbere", "imodoka y'icyatsi ifite uburenganzira bwo gutambuka mbere", "twembi ntaburenganzira bwo gutambuka mbere gusa tugomba gutambukana ubwitonzi", "ntagisubizo nakimwe kirimo"],
    "correctAnswer": "imodoka y'icyatsi ifite uburenganzira bwo gutambuka mbere",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHn.png"
  },
  {
    "question": "Mfite uburenganzira bwo gutambuka muri iri sangano?",
    "options": ["yego, niba ukata ibumoso", "Oya niba ukata iburyo", "yego, bitewe noho ngana", "ntagisubizo cy'ukuri kirimo"],
    "correctAnswer": "yego, bitewe noho ngana",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHu.png"
  },
  {
    "question": "Ndi kumuvuduko wa 20km/h. nshobora gukomeza muri iri sangano ry'umuhanda?",
    "options": ["oya", "yego, nshobora gukata iburyo", "yego, nshobora guta ibumoso cyangwa iburyo", "yego, nshobora gukata ibumoso gusa"],
    "correctAnswer": "oya",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHc.png"
  },
  {
    "question": "Umuyobozi wikinyabiziga aritegura kunyuraho ibumoso:",
    "options": ["nshobora kumunyuraho nyuze iburyo", "sinshobora kumunyura", "nshobora kumunyura nciye ibumoso ariko mbonye ko mfite umwanya uhagije", "Ntagisubizo cy'ukuri kirimo"],
    "correctAnswer": "nshobora kumunyura nciye ibumoso ariko mbonye ko mfite umwanya uhagije",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHg.png"
  },
  {
    "question": "Uhereye kuri ibi byapa habujijwe:",
    "options": ["Kunyuranaho kubinyabiziga bikururwa nibinyabiziga birengeje imitende ibiri ibumoso no kugendera kumuvuduko urengeje 70 km/h", "Kunyuranaho kubinyabiziga bikururwa cyangwa ibinyabiziga birengeje imitende ibiri ibumoso", "kugendera hejuru ya 70 km/h", "ntagisubizo cy'ukuri"],
    "correctAnswer": "Kunyuranaho kubinyabiziga bikururwa nibinyabiziga birengeje imitende ibiri ibumoso no kugendera kumuvuduko urengeje 70 km/h",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OH4.png"
  },
  {
    "question": "Ndashaka gupariki ikinyabiga iburyo kunzira y'abanyamaguru",
    "options": ["biremewe munsi yicyi cyapa", "biremewe imbere y'icyi cyapa", "birabujijwe imbere n'inyuma yicyi cyapa", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "biremewe munsi yicyi cyapa",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OH0.png"
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Guhagarara, aho abanyeshuri bambukira", "Hagarara akanya gato", "Ibindi binyabiziga bigomba kuguha inzira", "Gutanga umwanya ku bindi binyabiziga i buryo bwawe"],
    "correctAnswer": "Hagarara akanya gato",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OHF.png"
  }
];
const quizData13 = [
  {
    "question": "Niki umuyobozi w'ikinyabiziga yakora igihe agize uruhare mu mpanuka yo mu muhanda, aho ntawakometese ariko ibinyabiziga bikaba byateza icyago cyangwa byafunze umuhanda?",
    "options": ["Gushushanya aho zagonganiye no kuzishyira kuruhande", "Gukuramo abagenze ugashyiraho icyapa cya mpandeshatu girukura kumodoka", "Gutegereza ko abapolisi bahagera mbere yo gukura ibinyabiziga mu muhanda", "Guhagarika ibindi binyabiziga kugeza ikibazo gikemutse mukabona kubikura mu muhanda"],
    "correctAnswer": "Gushushanya aho zagonganiye no kuzishyira kuruhande",
    "image": false
  },
  {
    "question": "Igihe umuyobozi w'ikinyabiziga agendera munzira y'icyerekezo kimwe akifuza gukata ibumoso yakora iki?",
    "options": ["gutwara yegera umurongo wo hagati mu muhanda yerekeza ibumoso", "gutwara yegera uruhande rw'iburyo bw'umuhanda", "gutwara yegera ku uruhande rw'ibumoso bw'umuhanda", "Gutwarira hafi y'umurongo ugabanya umuhanda mo kabili"],
    "correctAnswer": "gutwara yegera umurongo wo hagati mu muhanda yerekeza ibumoso",
    "image": false
  },
  {
    "question": "Umuyobozi w'ikinyabizaga uri kugendera mu muhanda w'ibyerekezo bibiri nuruhe ruhande rw'umuhanda agomba gukoresha?",
    "options": ["uruhande rw'ibumoso bw'umuhanda uretse igihe atawaye imashini zihinga cyangwa zikoreshwa indi mirimo", "Mu gice cy;umuhanda yumva ashaka", "Mu gice cy'iburyo bw'umuhanda uretse igihe ashaka kunyuranaho cyangwa gukata ibumoso", "Ku ruhande rw'ibumoso bw'umuhanda"],
    "correctAnswer": "Mu gice cy'iburyo bw'umuhanda uretse igihe ashaka kunyuranaho cyangwa gukata ibumoso",
    "image": false
  },
  {
    "question": "Igihe umuyobozi w'ikinyabiziga atwaye mu muhanda urombereje w'ibice byinshi agomba kugendera mu kihe gice cy'umuhanda?",
    "options": ["Kugendera mugice icyo aricyo cyose kirimo ibinyabiziga bike", "Kugendera kugice cy'ibumoso keretse ushaka gusohokera iburyo", "Kugendera mu gice cy'iburyo bw'umuhanda keretse ushaka kunyuranaho", "Ntagutwarira mu ruhande rw'iburyo bw'umuhanda kuko hagenewe imodoka ziremereye n'imodoka nini zitwara abantu"],
    "correctAnswer": "Kugendera mu gice cy'iburyo bw'umuhanda keretse ushaka kunyuranaho",
    "image": false
  },
  {
    "question": "Umuyobozi w'ikinyabiziga yakora iki igihe ageze aho banyura bazenguruka?",
    "options": ["Tanga inzira ku binyabiziga byamaze kwinjira aho banyura bazunguruka", "Tanga inzira kubinyabiziga biremereye gusa", "Tanga inzira gusa niba uri munzira ya kabiri niya gatatu isohoka", "Komeza kuko abandi bayobozi b'ibinyabiziga bagomba kuguha inzira yo gukomeza"],
    "correctAnswer": "Tanga inzira ku binyabiziga byamaze kwinjira aho banyura bazunguruka",
    "image": false
  },
  {
    "question": "Ni kihe cyerekezo umuyobozi w'ikinyabiziga yinjiriramo iyo ageze aho banyura bazenguruka?",
    "options": ["ibumoso", "ibumoso gusa igihe ayobowe ni kimenyetso kimurika", "iburyo cyangwa ibumoso", "iburyo"],
    "correctAnswer": "iburyo",
    "image": false
  },
  {
    "question": "Mbere yuko umuyobozi w'ikinyabiziga akata ibumoso mu nzira nyabagendwa, nihe ikinyabiziga kigomba kuba kiri?",
    "options": ["Mu ruhande rw'iburyo bw'inzira nyabagendwa", "Gusa iburyo bwo hagati y'inzira nyabagendwa", "Muruhande urwarirwo rwo hagati mu nzira nyabagendwa", "Mu ruhande rw'ibumoso bw'inzira nyabagendwa"],
    "correctAnswer": "Muruhande urwarirwo rwo hagati mu nzira nyabagendwa",
    "image": false
  },
  {
    "question": "Umuyobozi w'ikinyabiziga yakwitondera iki mbere yuko y'injira munzira banyuramo bazengurutse?",
    "options": ["ibinyabiziga bimuturuka inyuma umuvuduko bifite n'uburyo bimwegereye", "ibinyabiziga biturutse ibumoso bwe n'umuvuduko bifite n'intera iri hagati ye nabyo", "ibinyabiziga biturutse iburyo n'umuvuduko bifite ni intera iri hagati ye nabyo", "ibinyabiziga bimututse imbere, umuvuduko bifite n'intera iri hagati ye nabyo"],
    "correctAnswer": "ibinyabiziga biturutse iburyo n'umuvuduko bifite ni intera iri hagati ye nabyo",
    "image": false
  },
  {
    "question": "Umuyobozi w'ikinyabiziga ugendera inyuma y'ikinyabaziga gitwara abagenzi gihagaze gikuramo cyangwa gishyiramo abagenzi agomba:",
    "options": ["kunyuranaho ibumoso", "gutegereza yihanganye", "a na b ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "a na b ni ibisubizo by'ukuri",
    "image": false
  },
  {
    "question": "Igihe ubonye icyapa kigaragaza ishuli wakora iki?",
    "options": ["kugabanya umuvuduko no gukomeza witonze", "gukomeza n'umuvuduko uri hejuru kuko umunyeshuli agomba gutegereza", "kuvuza ihoni", "ibisubizo byose ni ukuri"],
    "correctAnswer": "kugabanya umuvuduko no gukomeza witonze",
    "image": false
  },
  {
    "question": "Umubare w'abagenzi bemewe gutwarwa mukinyabiziga wanditswe mu:",
    "options": ["icyemezo cy'iyandikwa ry'ikinyabiziga", "inyemezabwishyu y'umusoro", "ubwishingizi", "ibisubizo byose ni ukuri"],
    "correctAnswer": "icyemezo cy'iyandikwa ry'ikinyabiziga",
    "image": false
  },
  {
    "question": "Gutwara ikinyabiziga wasinze:",
    "options": ["biremewe kubinyabiziga byabikorera kugiti cyabo", "biremewe nijoro", "birabujijwe ku binyabiziga byose bifite moteri", "ibisubizo byose nibyo"],
    "correctAnswer": "birabujijwe ku binyabiziga byose bifite moteri",
    "image": false
  },
  {
    "question": "Umuyobozi w'ikinyabizaga ashobora kunyuranaho:",
    "options": ["ahamanuka", "igihe umuhanda ari mugari", "igihe umuyobozi w'ikinyabiziga kiri imbere ye amweretse ikimenyetso kimwemerera kunyuranaho", "nta gisubizo cy'ukuri"],
    "correctAnswer": "igihe umuyobozi w'ikinyabiziga kiri imbere ye amweretse ikimenyetso kimwemerera kunyuranaho",
    "image": false
  },
  {
    "question": "Ugeze ahari inzira yabanyamaguru barindiriye kwambuka. Ntibatangiye kwambuka, wakora iki?",
    "options": ["kuvuza ihoni", "kwihangana ugatagereza", "gukomeza", "nta gisubizo cy'ukuri"],
    "correctAnswer": "gukomeza",
    "image": false
  },
  {
    "question": "Igihe utwaye umuntu mu kinyabiziga cyawe, akibagirwa kwambara umukandara wo kwirinda ibyago ugomba:",
    "options": ["gukuramo umukandara wo kwirinda ibyago wambaye mukawambara mwembi", "kubyerengagiza wizeyeko nta mpanuka muri bukore", "funga cyane umukandara wo kwirinda ibyago wawe", "Kubibutsa kwambara umukandara wo kwirinda ibyago"],
    "correctAnswer": "Kubibutsa kwambara umukandara wo kwirinda ibyago",
    "image": false
  },
  {
    "question": "Igihe za otobisi zigenewe gutwara banyeshuli zihagaze kugirango zibafate cyangwa bavemo ugomba:",
    "options": ["kuvuza ihoni ugakomeza", "gukomeza ugabanyije umuvuduko n'ubwitonzi kuko bishoboka ko abanyeshuli bakwambuka bitunguranye", "nta bwitonzi budasnzwe bukenewe", "ibisubizo byose ni ukuri"],
    "correctAnswer": "gukomeza ugabanyije umuvuduko n'ubwitonzi kuko bishoboka ko abanyeshuli bakwambuka bitunguranye",
    "image": false
  },
  {
    "question": "Igihe imodoka iparitse ku nkengero z'umuhanda mugihe cy' ijoro:",
    "options": ["Imodoka igomba kuba ifunze", "Umuntu ufite uruhushya rwo gutwara ikinyabiziga agomba kuba yicaye mu mwanya w'umuyobozi", "Amatara yo guhagarara umwanya munini aguma yaka", "Ibisubizo byose ni ukuri"],
    "correctAnswer": "Amatara yo guhagarara umwanya munini aguma yaka",
    "image": false
  },
  {
    "question": "Mu gihe hari undi muyobozi w'ikinyabiziga ugukurikiye watangiye kukunyuraho:",
    "options": ["Ntugomba kugira undi muyobozi w'ikinyabiziga unyuraho", "Ugomba kunyura ku kindi kinyabiziga", "Ugomba kunyura kukindi kinyabiziga uvugije ihoni", "Nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "Nta gisubizo cy'ukuri kirimo",
    "image": false
  },
  {
    "question": "Utwaye ikinyabiziga mu muhanda ufite ibyerekezo bibiri. Ikinyabiziga imbere yawe cyiragenda buhoro, imbere yawe umuhanda nta kibazo kunyuranaho, ugomba:",
    "options": ["kucyinyuraho bikorewe ibumoso", "kucyinyuraho bikorewe iburyo", "kucyinyuraho ukoresheje uruhande urwo arirwo rwose", "ibisubizo byose ni ukuri"],
    "correctAnswer": "kucyinyuraho bikorewe ibumoso",
    "image": false
  },
  {
    "question": "Ibice by'umuhanda byera bigari biteganye n'umurongo ugabanya umuhanda mo, kabiri bisobanura:",
    "options": ["guhagara kw'ikinyabiziga", "aho abanyamaguru bambukira", "guha ubushobozi binyabiziga", "ibisubizo byose ni ukuri"],
    "correctAnswer": "aho abanyamaguru bambukira",
    "image": false
  },
  {
    "question": "Uturebanyuma dukoreshwa:",
    "options": ["kwireba", "kugenzura ibigendera mu muhanda inyuma", "kureba abicaye inyuma", "ntagisubizo cy'ukuri"],
    "correctAnswer": "kugenzura ibigendera mu muhanda inyuma",
    "image": false
  }
];
const quizData14 = {
  "questions": [
    {
      "question": "Niki muribi wakwirinda mugihe ushaka kunyuranaho?",
      "options": ["Nyuma y'ikona ugategereza kubona uburyo bwo kunyuranaho.", "Mumuhanda w'icyerekezo kimwe", "Aho utagomba kurenza ibirometero 30 mu isaha.", "Ugeze mumuhanda utaringaniye neza"],
      "correctAnswer": "Nyuma y'ikona ugategereza kubona uburyo bwo kunyuranaho.",
      "image": false
    },
    {
      "question": "Niki wakora igihe usanze mu bimenyetso bimurika harimo ibara ry'umuhondo.",
      "options": ["Kongera umuvuduko", "Kugumana umuvuduko wari uriho.", "Kwitegura guhagarara.", "Gufata feri cyane."],
      "correctAnswer": "Kwitegura guhagarara.",
      "image": false
    },
    {
      "question": "Mugihe ukurikiranye na romoruki, n'ukubera iki ugomba gusiga umwanya uhagije hagati yawe nayo?",
      "options": ["Bituma ubasha gukata ikorosi vuba.", "Bifasha umuyobozi wa romoruki kukurebera mundorerwamo.", "Bifasha romoruki guhagarara byoroshye.", "Bikurinda umuyaga."],
      "correctAnswer": "Bifasha umuyobozi wa romoruki kukurebera mundorerwamo.",
      "image": false
    },
    {
      "question": "Utegereje gukata iburyo kwiherezo ry'umuhanda, ukingirijwe nimodoka ihagaze. Niki wakora?",
      "options": ["Guhagarara hanyuma ukagenda gake gake witonze kugezaho ureba neza.", "Kwihuta wegera imbere aho ushobora kureba ugafunga ikindi cyerekezo.", "Gutegereza abanyamaguru bakakumenyesha ko ntakibazo wakata.", "Guhindukiza imodoka vuba kugirango ushake indi nzira wakoresha."],
      "correctAnswer": "Guhagarara hanyuma ukagenda gake gake witonze kugezaho ureba neza.",
      "image": false
    },
    {
      "question": "Mugihe uri murugendo rurerure mumuhanda urombereje w'ibice byinshi. Niki wakora mugihe wumva utangiye kugira ibitotsi?",
      "options": ["Gucuranga umuziki cyane.", "Kwihuta cyane kugirango usoze urugendo vuba.", "Kuva mumuhanda urombereje w'ibice byinshi, ugahagarara ahantu hatekanye.", "Ntagisubizo cy'ukuri kirimo."],
      "correctAnswer": "Kuva mumuhanda urombereje w'ibice byinshi, ugahagarara ahantu hatekanye.",
      "image": false
    },
    {
      "question": "Kuki ugomba gucana amatara mugihe hatangiye kwijima?",
      "options": ["Kugirango akerekanamuvuduko kagaragare neza.", "Kugirango abandi biborohere kukubona.", "Kugira ngo ujyane nabandi bayobozi bibinyabiziga.", "Kuko amatara yo ku muhanda ari kwaka"],
      "correctAnswer": "Kugirango abandi biborohere kukubona.",
      "image": false
    },
    {
      "question": "Urimo kugenda munzira nyabagendwa ni gute wanyura k'umuyobozi w'igare?",
      "options": ["Kuvuza ihoni mugihe umunyuraho", "Kumunyuraho umwegereye", "Gusiga umwanya uhagije igihe umunyuraho", "Kugabanya umuvuduko mbere y'uko umunyuraho"],
      "correctAnswer": "Gusiga umwanya uhagije igihe umunyuraho",
      "image": false
    },
    {
      "question": "Niki wakora igihe utabona neza usubira inyuma?",
      "options": ["Kumanura ikirahure cy'imodoka urebe inyuma", "Gufungura umuryango w'imodoka ureba inyuma", "Gushaka umuntu uri hanze y'ikinyabiziga ukuyobora", "Gukoresha akarebanyuma kakwegereye"],
      "correctAnswer": "Gushaka umuntu uri hanze y'ikinyabiziga ukuyobora",
      "image": false
    },
    {
      "question": "Igihe ukurikiwe n'ikinyabiziga gitwara abarwayi gicanye amatara y'intabaza arabagirana. Wakora iki?",
      "options": ["Kugihigamira ako kanya ndetse byaba ngombwa ugahagarara", "Kongera umuvuduko kugirango ugisige", "Kugumana umuvuduko wari ufite", "Guhagarara bitunguranye mu muhanda"],
      "correctAnswer": "Kugihigamira ako kanya ndetse byaba ngombwa ugahagarara",
      "image": false
    },
    {
      "question": "Utwaye ikinyabiziga inyuma ya romoruki, umuyobozi wayo akaguha ikimenyetso cyo kumutambukaho iburyo kandi ugana ibumoso, wakora iki?",
      "options": ["Kugabanya umuvuduko ukareka akagenda", "Gukomeza iburyo bwawe", "Kumunyuraho iburyo bwe", "Kugumana umuvuduko wari ufite ukamuvugiriza ihoni"],
      "correctAnswer": "Kugabanya umuvuduko ukareka akagenda",
      "image": false
    },
    {
      "question": "Wegereye inzira y'abanyamaguru ugasanga bategereje kwambuka. Ugomba gukora iki?",
      "options": ["Kureka abakuze n'abafite ubumuga bagatambuka mbere", "Kugabanya umuvuduko witegura guhagarara", "Gukoresha amatara abamenyesha kwambuka", "Gukoresha ibimenyetso byamaboko bibemerera kwambuka"],
      "correctAnswer": "Kugabanya umuvuduko witegura guhagarara",
      "image": false
    },
    {
      "question": "Uri hafi kunyura k'umuyobozi w'ikinyamitende. Muri ibi byapa bikurikira nikihe wakwitondera?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "C",
      "image": true,
      "imagePlaceholder": "https://s12.gifyu.com/images/b9OHZ.png"
    },
    {
      "question": "Niyihe mpamvu ituma tugomba kugabanya umuvuduko mugihe hari ibihu?",
      "options": ["Igihe feri idakora", "Igihe uhumishijwe n'amatara yo kubisikana", "Igihe moteri imara ngo izime", "Nuko biba bitoroshye kubona ikiri imbere"],
      "correctAnswer": "Nuko biba bitoroshye kubona ikiri imbere",
      "image": false
    },
    {
      "question": "Inzira nyabagendwa ifite ibyerekezo bibiri, uruhande rw'ibumoso rudufasha iki?",
      "options": ["Kunyuranaho gusa, ntugaruke iburyo bwawe", "Kunyuranaho cyangwa ugakatira ibumoso", "Hemerewe kugenda imodoka zihuta gusa", "Gukatira iburyo gusa utanyuranyeho"],
      "correctAnswer": "Kunyuranaho cyangwa ugakatira ibumoso",
      "image": false
    },
    {
      "question": "Ni hehe byemewe kunyuranaho munzira y'icyerekezo kimwe?",
      "options": ["ku gisate kiri Ibumoso bw'umuhanda", "Kunyuranaho ntibyemewe", "Ku gisate kiri iburyo bw'umuhanda gusa", "Ku gisate cy'ibumoso cyangwa iburyo"],
      "correctAnswer": "ku gisate kiri Ibumoso bw'umuhanda",
      "image": false
    },
    {
      "question": "Iki cyapa gisobanura iki?",
      "options": ["Iherezo ry'ibibuzwa byose mu karere ku binyabiziga bigenda", "Ntihemerewe kuhahagarara", "Umuvuduko ntarengwa wemewe", "Nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "Iherezo ry'ibibuzwa byose mu karere ku binyabiziga bigenda",
      "image": true,
      "imagePlaceholder": "https://s12.gifyu.com/images/b9O5d.png"
    },
    {
      "question": "Ibyapa bitegeka bikozwe muyihe ishusho?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "C",
      "image": true,
      "imagePlaceholder": "https://s12.gifyu.com/images/b9O5u.png"
    },
    {
      "question": "Iki cyapa gisobanura iki?",
      "options": ["Umuyaga w'intambike", "Urusaku rwo mu muhanda", "Ikibuga cy'indege", "Ibisubizko byose nibyo"],
      "correctAnswer": "Umuyaga w'intambike",
      "image": true,
      "imagePlaceholder": "https://s12.gifyu.com/images/b9O54.png"
    },
    {
      "question": "Iki cyapa gisobanura iki?",
      "options": ["Iherezo Ry'inzira Y'abanyamaguru", "Iherezo Ry'umuhanda Urombereje W'ibice Byinshi", "A Na B Ni Ibisubizo By'ukuri", "Nta nzira ihari"],
      "correctAnswer": "Iherezo Ry'umuhanda Urombereje W'ibice Byinshi",
      "image": true,
      "imagePlaceholder": "https://s12.gifyu.com/images/b9O50.png"
    },
    {
      "question": "Ibiziga by'ibinyabiziga bigendeshwa na moteri n'ibya velomoteri kimwe n'ibya romoruki zabyo bigomba kuba byambaye inziga zihagwa zifite amano n'ubujyakuzimu butari munsi ya milimetero imwe ku migongo yabyo yose. Ariko ibyo ntibikurikizwa ku binyabiziga bikurikira:",
      "options": ["ibinyabiziga bidapakiye kdi bitajya birenza umuvuduko wa km 25 mu isaha ahateganye", "ibinyabiziga bya police bijya ahatarenga km 25 uvuye aho biba", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "A na B ni ibisubizo by'ukuri",
      "image": false
    }
  ]
};
const quizData15 = [{
  "questions": [
    {
      "question": "Umurongo w'umuhondo ucagaguye uciye ku nkombe nyayo y'umuhanda, umusezero w'inzira y'abanyamaguru cyangwa w'inkengero y'umuhanda yegutse uvuga ibi bikurikira:",
      "options": ["guhagarara umwanya muto birabujijwe ku burebure bw'uwo murongo", "guhagarara umwanya muto n'umunini birabujijwe ku burebure bw'uwo murongo", "aho bahagarara umwanya munini cyangwa muto", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "guhagarara umwanya muto n'umunini birabujijwe ku burebure bw'uwo murongo",
      "image": false
    },
    {
      "question": "Ku binyabiziga cyangwa ibinyabiziga bikururana igice kirenga ku biziga ntigishobora kurenga ibipimo bikurikira:",
      "options": ["iby'inyuma m 3.40", "iby'imbere m 2.50", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "A na B ni ibisubizo by'ukuri",
      "image": false
    },
    {
      "question": "Mu migi no ku yindi mihanda y'igihugu igenwa na minisitiri ushinzwe gutwara abantu n'ibintu uburebure ntarengwa kuri buri mitambiko 3 ifungwaho ibiziga bine ni:",
      "options": ["toni 24", "toni 10", "toni 16", "toni 53"],
      "correctAnswer": "toni 24",
      "image": false
    },
    {
      "question": "Iyo hagati y'uruhande rw'imbere rwa romoruki n'uruhande rw'inyuma rw'ikinyabiziga kiyikurura hari umwanya urenze m 3 ikibizirikanyije kigomba kugaragazwa ku buryo bukurikira iyo amatara y'ikinyabiziga agomba gucanwa:",
      "options": ["agatambaro gatukura gafite nibura cm 50 z'uruhande", "itara risa n'icunga rihishije rigaragara mu mbavu igihe ikibizirikanyije kimuritswe", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "A na B ni ibisubizo by'ukuri",
      "image": false
    },
    {
      "question": "Itara ryo guhagarara ry'ibara ritukura rigomba kuba ridahumisha, kandi rigomba kugaragarira mu ntera ikurikira:",
      "options": ["nijoro igihe ijuru rikeye nibura muri m 200", "ku manywa igihe cy'umucyo nibura muri m50", "nijoro nibura muri m 100 igihe ijuru rikeye", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "nijoro nibura muri m 100 igihe ijuru rikeye",
      "image": false
    },
    {
      "question": "Birabujijwe kongera ku mpande z'ikinyabiziga kigendeshwa na moteri cyangwa velomoteri ibi bikurikira:",
      "options": ["imitako", "ibintu bifite imigongo cyangwa ibirenga ku mubyimba kandi bishobora gutera ibyago abandi bagenzi", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "A na B ni ibisubizo by'ukuri",
      "image": false
    },
    {
      "question": "Ikintu cyose cyatuma hahindurwa ibyanditswe bireba nyirikarita cyangwa ibiranga ikinyabiziga kigomba kumenyeshwa ibiro by'imisoro haba mu magambo cyangwa mu ibaruwa ishinganye. Ibyo bikorwa mu gihe kingana gute:",
      "options": ["mu minsi 5", "mu minsi 8", "mu minsi 15", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "mu minsi 8",
      "image": false
    },
    {
      "question": "Kunyuranaho bikorerwa:",
      "options": ["mu ruhande rw'iburyo gusa", "igihe cyose ni ibumoso", "iburyo iyo unyura ku nyamaswa", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "nta gisubizo cy'ukuri kirimo",
      "image": false
    },
    {
      "question": "Iyo ubugari bw'inzira nyabagendwa igenderwamo n'ibinyabiziga budahagije kugirango bibisikane nta nkomyi abagenzi bategetswe:",
      "options": ["kunyura mu nzira z'impande z'abanyamaguru", "guhagarara aho bageze", "koroherana", "gukuraho inkomyi"],
      "correctAnswer": "koroherana",
      "image": false
    },
    {
      "question": "Umuyobozi ugenda mu muhanda igihe ubugari bwawo budatuma anyuranaho nta nkomyi ashobora kunyura mu kayira k'abanyamaguru ariko amaze kureba ibi bikurikira:",
      "options": ["umuvuduko w'abanyamaguru", "ubugari bw'umuhanda", "umubare w'abanyamaguru", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "nta gisubizo cy'ukuri kirimo",
      "image": false
    },
    {
      "question": "Icyapa cyerekana umuvuduko ntarengwa ikinyabiziga kitagomba kurenza gishyirwa ku binyabiziga bifite uburebure ntarengwa bukurikira:",
      "options": ["burenga toni 1", "burenga toni 2", "burenga toni 24", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "nta gisubizo cy'ukuri kirimo",
      "image": false
    },
    {
      "question": "Iyo nta mategeko awugabanya by'umwihariko, umuvuduko ntarengwa w'amapikipiki mu isaha ni:",
      "options": ["km 25", "km 70", "km 40", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "km 70",
      "image": false
    },
    {
      "question": "Ahatari mu nsisiro umuvuduko ntarengwa wa velomoteri mu isaha ni:",
      "options": ["km 50", "km 40", "km 30", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "km 50",
      "image": false
    },
    {
      "question": "Birabujijwe guhagarara akanya kanini aha hakurikira:",
      "options": ["mu duhanda tw'abanyamagare", "mu duhanda twagenewe velomoteri", "A na B ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "A na B ni ibisubizo by'ukuri",
      "image": false
    },
    {
      "question": "Amatara maremare y'ikinyabiziga agomba kutamurika mu bihe bikurikira:",
      "options": ["iyo umuhanda umurikiwe umuyobozi abasha kureba muri m 200", "iyo ikinyabiziga kigiye kubisikana nikindi", "iyo ari mu nsisiro", "ibisubizo byose nibyo"],
      "correctAnswer": "ibisubizo byose nibyo",
      "image": false
    },
    {
      "question": "Ubugari bwa romoruki ikuruwe n'igare cyangwa velomoteri ntiburenza ibipimo bikurikira:",
      "options": ["cm 25", "cm 125", "cm 45", "nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "cm 125",
      "image": false
    },
    {
      "question": "Uburyo bukoreshwa kugirango ikinyabiziga kigende gahoro igihe feri idakora neza bwitwa:",
      "options": ["feri y'urugendo", "feri yo guhagarara", "feri yo gutabara", "Nta gisubizo cy'ukuri kirimo"],
      "correctAnswer": "feri yo gutabara",
      "image": false
    },
    {
      "question": "Nta mwanya n'umwe feri ifungiraho ushobora kurekurana n'ibiziga keretse:",
      "options": ["iyo bireba feri y'urugendo", "iyo kurekurana ari ibyakanya gato", "iyo bireba feri yo guhagarara umwanya munini, ubwo kurekurana bikaba bidashoboka bidakozwe n'umuyobozi", "byose ni ibisubizo by'ukuri"],
      "correctAnswer": "byose ni ibisubizo by'ukuri",
      "image": false
    },
    {
      "question": "Ikinyabiziga ntigishobora kugira amatara arenze abiri y'ubwoko bumwe keretse kubyerekeye amatara akurikira:",
      "options": ["itara ndangamubyimba", "itara ryerekana icyerekezo", "itara ndangaburumbarare", "ibisubizo byose ni ukuri"],
      "correctAnswer": "ibisubizo byose ni ukuri",
      "image": false
    },
    {
      "question": "Itara ndanganyuma rigomba gushyirwa aha hakurikira:",
      "options": ["ku nguni y'iburyo y'ikinyabiziga", "ku gice cy'inyuma ku kinyabiziga", "ahegereye inguni y'ibumoso y'ikinyabiziga", "ibisubizo byose ni ukuri"],
      "correctAnswer": "ahegereye inguni y'ibumoso y'ikinyabiziga",
      "image": false
    }
  ]
}]
const quizData16 = [
  {
    "question": "Umubare w'abagenzi bemewe gutwarwa mukinyabiziga wanditswe mu :",
    "options": ["icyemezo cy'iyandikwa ry'ikinyabiziga", "inyemezabwishyu y'umusoro", "ubwishingizi", "ibisubizo byose ni ukuri"],
    "correctAnswer": "ibisubizo byose ni ukuri",
    "image": false
  },
  {
    "question": "K'umuyobozi w'ivatiri, iki cyapa kivuze iki ?",
    "options": ["kirambuza gutwara ku muvuduko utarengeje 5km/h", "ntaburenganzira kimpa, mugihe gikurikizwa ku binyabiziga bifite hejuru y atoni 5", "ntacyo bindebaho mugihe bireba gusa zipima tone 5 no kurengaho", "Ntagisubizo cy'ukuri kirimo"],
    "correctAnswer": "ntacyo bindebaho mugihe bireba gusa zipima tone 5 no kurengaho",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9O50.png"
  },
  {
    "question": "Gutwara ikinyabiziga wasinze:",
    "options": ["biremewe kubinyabiziga byabikorera kugiti cyabo", "biremewe nijoro", "birabujijwe ku binyabiziga byose bifite moteri", "ibisubizo byose nibyo"],
    "correctAnswer": "birabujijwe ku binyabiziga byose bifite moteri",
    "image": false
  },
  {
    "question": "Igihe utwaye umuntu mu kinyabiziga cyawe, akibagirwa kwambara umukandara wo kwirinda ibyago ugomba:",
    "options": ["gukuramo umukandara wo kwirinda ibyago wambaye mukawambara mwembi", "kubyerengagiza wizeyeko nta mpanuka muri bukore", "funga cyane umukandara wo kwirinda ibyago wawe", "Kubibutsa kwambara umukandara wo kwirinda ibyago"],
    "correctAnswer": "Kubibutsa kwambara umukandara wo kwirinda ibyago",
    "image": false
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Umuhanda urombereje w'ibice byinshi ku birometero 50", "Intera nto ntarengwa ya metero 50 hagati y'ibinyabiziga", "Umuvuduko urenga ibirometero 50 mu isaha", "Umuvuduko ntarengwa ugarukira ku birometero 50 mu isaha"],
    "correctAnswer": "Umuvuduko ntarengwa ugarukira ku birometero 50 mu isaha",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OD7.png"
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Aho guhagararwamo n'abanyamagare imbere", "Aho abana bagenewe kwiga gutwara amagare", "Inzira y'iminyamitende n'abanyamaguru itegetswe", "Abanyamagare bagomba kuva ku igare bakagendesha amaguru"],
    "correctAnswer": "Inzira y'iminyamitende n'abanyamaguru itegetswe",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9ODl.png"
  },
  {
    "question": "Umuyobozi ubonye ko hari undi umukurikiye ashaka kumunyuraho agomba kubahiriza ibi bikurikira :",
    "options": ["kwegera i ruhande rw'iburyo bw'umuhanda", "kongera umuvuduko", "guhagarara", "a na c ni byo bisubizo by'ukuri"],
    "correctAnswer": "kwegera i ruhande rw'iburyo bw'umuhanda",
    "image": false
  },
  {
    "question": "Igihe umuyobozi w'ikinyabiziga atwaye ikinyabiziga akagira umunaniro utuma yasinzira yakora iki ?",
    "options": ["Gufungura ikirahure cy'ikinyabiziga cyangwa gushyira ubukonje mu modoka kugirango umwuka mwiza winjire mu kinyabiziga", "Guhagarara akaruhuka harimo no kugendagenda niba bishoboka", "Kunanura amaboko no gufunga amaso mugihe gito", "Kongera ubushyuhe mu kinyabiziga"],
    "correctAnswer": "Guhagarara akaruhuka harimo no kugendagenda niba bishoboka",
    "image": false
  },
  {
    "question": "Muri ibi byapa bikurikira ni ikihe cyerekana ko umuyobozi ukibonye yemerewe gutambuka mbere y'abaturutse aho agana mu nzira ifunganye:",
    "options": ["Icyapa B6", "Icyapa A19", "Icyapa B3", "Icyapa A22a"],
    "correctAnswer": "Icyapa B6",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9ODg.png"
  },
  {
    "question": "Ibyapa bibuza n'ibitegeka bikurikizwa gusa :",
    "options": ["Mumasangano", "mu bimenyetso bimurika", "a na b ni ibisubizo by'ukuri", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "nta gisubizo cy'ukuri kirimo",
    "image": false
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Inkomane banyuramo bazengurutse", "Biremewe guhindukira", "Inzira y'icyerekezo kimwe imbere", "Birabujijwe guhindukira"],
    "correctAnswer": "Inkomane banyuramo bazengurutse",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OD0.png"
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Abana", "Inzira y'abanyamaguru – Itegure guhagarara", "Ikibuga cy'imikino cy'abana", "Ikibuga cy' imyidagaduro"],
    "correctAnswer": "Abana",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9ODU.png"
  },
  {
    "question": "Ugeze mu masangano y'umuhanda aho usanga ibimenyetso bimurika bidakora, wakora iki igihe umukozi ubifiye ububasha aguhaye iki kimenyesto ?",
    "options": ["gukata ibumoso gusa", "gukata iburyo gusa ugakomeza imbere", "Guhagarara kumurongo wo guhagarara umwanya moto", "komeza imbere gusa"],
    "correctAnswer": "Guhagarara kumurongo wo guhagarara umwanya moto",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9ODA.png"
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Birabujijwe ku binyabiziga bitwara abakozi ba leta", "Birabujijwe guhagara umwanya munini", "Birabujijwe ku binyabiziga by'abikorera ki giti cyabo", "Parikingi"],
    "correctAnswer": "Birabujijwe guhagara umwanya munini",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OoS.png"
  },
  {
    "question": "Umuhanda ugabanijemo ibisate bibiri kandi ugendwamo mu byerekezo byombi umuyobozi abujijwe :",
    "options": ["kugendera mu gisate cy'iburyo", "kunyuranaho", "kugendera mu gisate cy'ibumoso", "ibisubizo byose ni byo"],
    "correctAnswer": "kugendera mu gisate cy'ibumoso",
    "image": false
  },
  {
    "question": "Mbere yuko umuyobozi w'ikinyabiziga akata ibumoso mu nzira nyabagendwa, nihe ikinyabiziga kigomba kuba kiri ?",
    "options": ["Mu ruhande rw'iburyo bw'inzira nyabagendwa", "Gusa iburyo bwo hagati y'inzira nyabagendwa", "Muruhande urwarirwo rwo hagati mu nzira nyabagendwa", "Mu ruhande rw'ibumoso bw'inzira nyabagendwa"],
    "correctAnswer": "Muruhande urwarirwo rwo hagati mu nzira nyabagendwa",
    "image": false
  },
  {
    "question": "Igihe imodoka iparitse ku nkengero z'umuhanda mugihe cy' ijoro :",
    "options": ["Imodoka igomba kuba ifunze", "Umuntu ufite uruhushya rwo gutwara ikinyabiziga agomba kuba yicaye mu mwanya w'umuyobozi", "Amatara yo guhagarara umwanya munini aguma yaka", "Ibisubizo byose ni ukuri"],
    "correctAnswer": "Ibisubizo byose ni ukuri",
    "image": false
  },
  {
    "question": "Niki umuyobozi w'ikinyabiziga yakora igihe atwaye ikinyabiziga mugihe cy'ibihu,imvura nyinshi, umwuzure cyangwa umukungugu mwinshi ?",
    "options": ["Kugendera mu tuyira turi kumpande zu muhanda, ucunga ibimenyetso bigarura urumuri", "Kugabanya umuvuduko hanyuma ugakoresha amatara magufi", "Gucana amatara maremare hanyuma ukagenda gahoro", "Kugendera mu murongo ugabanya umuhanda mo kabiri unareba ibimenyestso by'umuhanda bigarura urumuri"],
    "correctAnswer": "Kugabanya umuvuduko hanyuma ugakoresha amatara magufi",
    "image": false
  },
  {
    "question": "Iki cyapa gisobanura iki?",
    "options": ["Ikoni iburyo", "akazamuko gashinze cyane", "akamanuko gashobora gutera ibyago", "b na c byose ni ukuri"],
    "correctAnswer": "Ikoni iburyo",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OoK.png"
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Iherezo ry' umuhanda urombeje w'ibice byinshi", "Birabujijwe kunyura mu mu muhanda w' ikindi cyerekezo", "Birabujijwe kunyuranaho", "Birabujijwe guhagara ku iteme"],
    "correctAnswer": "Iherezo ry' umuhanda urombeje w'ibice byinshi",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Oon.png"
  }
]
;
const quizData17 = [
  {
    "question": "Kunyuranaho mw'ikoni :",
    "options": ["biremewe", "ntibyemewe", "biremewe ukoranye ubwitonzi", "ibisubizo byose ni ukuri"],
    "correctAnswer": "ntibyemewe",
    "image": false
  },
  {
    "question": "Igihe umuyobozi w'ikinyabiziga agendera munzira y'icyerekezo kimwe akifuza gukata ibumoso yakora iki?",
    "options": ["gutwara yegera umurongo wo hagati mu muhanda yerekeza ibumoso", "gutwara yegera uruhande rw'iburyo bw'umuhanda", "gutwara yegera ku uruhande rw'ibumoso bw'umuhanda", "Gutwarira hafi y'umurongo ugabanya umuhanda mo kabili"],
    "correctAnswer": "gutwara yegera umurongo wo hagati mu muhanda yerekeza ibumoso",
    "image": false
  },
  {
    "question": "Icyapa cyerekana inzira y'amatungo itegetswe giteye:",
    "options": ["Uruziga mubuso bw'ubururu, ishusho y'inka mu ibara ry'umukara", "Uruziga mu ibara ryera, ishusho y'inka mwibara ry'ubururu", "Uruziga mu buso bw'ibara ry'ubururu, ishusho y'inka mu ibara ryera n'ikirango cy'umukara", "mpande eshatu mu buso bw'ibara ry'umweru n'ishusho y'inka mu ibara ry'umukara"],
    "correctAnswer": "mpande eshatu mu buso bw'ibara ry'umweru n'ishusho y'inka mu ibara ry'umukara",
    "image": false
  },
  {
    "question": "Umurongo ucagaguye uvuga ko buri muyobozi abujijwe kuwurenga uretse mu gihe:",
    "options": ["Agomba kunyura ku kindi kinyabiziga", "Gukatira ibumoso", "Guhindukira cyangwa kujya mukindi gice cy'umuhanda", "Ibi bisubizo byose nibyo"],
    "correctAnswer": "Ibi bisubizo byose nibyo",
    "image": false
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Umuhanda ugabanijwemo ibisate bibiri", "Umuhanda ugabanijwemo ibisate bine", "Inzira y'icyerekezo kimwe", "Ukugendera mu muhanda ubisikanirwamo"],
    "correctAnswer": "Ukugendera mu muhanda ubisikanirwamo",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9Ooj.png"
  },
  {
    "question": "Umuyobozi w'ikinyabiziga igihe atwaye ikinyabiziga , agagira uruhare mu mpanuka yo mu muhanda aho ntawe ukomeretse nta n'ibindi binyabiziga bifite ibyangiritse agomba iki?",
    "options": ["Ku mushyira kunkengero y'umuhanda", "Kutamukuramo keretse mugihe hari ibyago byaterwa n'inkogi y'umuriro cyangwa akaba ashobora kugongwa n'ikindi kinyabiziga no guhamagara ababishinzwe", "Gusaba uwakomeretse kunyeganyeza ibice by'umubiri kugirano umenye aho ibikomere bye bigarukira", "Guhumuriza uwakometse ukamuha ikinyobwo gikonje"],
    "correctAnswer": "Ku mushyira kunkengero y'umuhanda",
    "image": false
  },
  {
    "question": "Ibice by'umuhanda byera bigari biteganye n'umurongo ugabanya umuhanda mo ,kabiri bisobanura:",
    "options": ["guhagara kw'ikinyabiziga", "aho abanyamaguru bambukira", "guha ubushobozi binyabiziga", "ibisubizo byose ni ukuri"],
    "correctAnswer": "aho abanyamaguru bambukira",
    "image": false
  },
  {
    "question": "Niki umuyobozi w'ikinyabiziga yakora igihe agize uruhare mu mpanuka yo mu muhanda , aho ntawakometese ariko ibinyabiziga bikaba byateza icyago cyangwa byafunze umuhanda ?",
    "options": ["Gushushanya aho zagonganiye no kuzishyira kuruhande", "Gukuramo abagenze ugashyiraho icyapa cya mpandeshatu girukura kumodoka", "Gutegereza ko abapolisi bahagera mbere yo gukura ibinyabiziga mu muhanda", "Guhagarika ibindi binyabiziga kugeza ikibazo gikemutse mukabona kubikura mu muhanda"],
    "correctAnswer": "Gushushanya aho zagonganiye no kuzishyira kuruhande",
    "image": false
  },
  {
    "question": "Umuyobozi w'ikinyabiziga yakora iki igihe ageze aho banyura bazenguruka?",
    "options": ["Tanga inzira ku binyabiziga byamaze kwinjira aho banyura bazunguruka", "Tanga inzira kubinyabiziga biremereye gusa", "Tanga inzira gusa niba uri munzira ya kabiri niya gatatu isohoka", "Komeza kuko abandi bayobozi b'ibinyabiziga bagomba kuguha inzira yo gukomeza"],
    "correctAnswer": "Tanga inzira ku binyabiziga byamaze kwinjira aho banyura bazunguruka",
    "image": false
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Kunyuranaho bikorerwa i buryo gusa", "Umuhanda uyoborejwe i buryo", "Kata i buryo gusa", "Umuhanda munini urasukira i bumoso"],
    "correctAnswer": "Kata i buryo gusa",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9O1X.png"
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Akazamuko gashinze cyane", "Umuhanda utaringaniye i bumoso", "Ahantu umuhanda umeze nabi", "Ahegereye utununga"],
    "correctAnswer": "Akazamuko gashinze cyane",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OGB.png"
  },
  {
    "question": "Ugeze ahari inzira yabanyamaguru barindiriye kwambuka. Ntibatangiye kwambuka, wakora iki?",
    "options": ["kuvuza ihoni", "kwihangana ugatagereza", "gukomeza", "nta gisubizo cy'ukuri"],
    "correctAnswer": "gukomeza",
    "image": false
  },
  {
    "question": "Utugarurarumuri turi ku ruhande rw'imbere rw'ikinyabiziga tugomba gusa:",
    "options": ["n'umuhondo", "n'umutuku", "n'umweru", "nta gisubizo cy'ukuri kirimo"],
    "correctAnswer": "n'umweru",
    "image": false
  },
  {
    "question": "Igihe umuyobozi w'ikinyabizaga uri kugendera mu muhanda w'ibyerekezo bibiri nuruhe ruhande rw'umuhanda agomba gukoresha ?",
    "options": ["uruhande rw'ibumoso bw'umuhanda uretse igihe atawaye imashini zihinga cyangwa zikoreshwa indi mirimo", "Mu gice cy;umuhanda yumva ashaka", "Mu gice cy'iburyo bw'umuhanda uretse igihe ashaka kunyuranaho cyangwa gukata ibumoso", "Ku ruhande rw'ibumoso bw'umuhanda"],
    "correctAnswer": "Mu gice cy'iburyo bw'umuhanda uretse igihe ashaka kunyuranaho cyangwa gukata ibumoso",
    "image": false
  },
  {
    "question": "Ni kihe cyerekezo umuyobozi w'ikinyabiziga yinjiriramo iyo ageze aho banyura bazenguruka ?",
    "options": ["ibumoso", "ibumoso gusa igihe ayobowe ni kimenyetso kimurika", "iburyo cyangwa ibumoso", "iburyo"],
    "correctAnswer": "iburyo",
    "image": false
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Umuhanda utaringaniye i buryo", "Akamanuko gashobora gutera ibyago", "Ahantu umuhanda umeze nabi", "Uguhinguka ku mwaro cyangwa ku nkombe"],
    "correctAnswer": "Akamanuko gashobora gutera ibyago",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OJ9.png"
  },
  {
    "question": "Igihe za otobisi zigenewe gutwara banyeshuli zihagaze kugirango zibafate cyangwa bavemo ugomba :",
    "options": ["kuvuza ihoni ugakomeza", "gukomeza ugabanyije umuvuduko n'ubwitonzi kuko bishoboka ko abanyeshuli bakwambuka bitunguranye", "nta bwitonzi budasnzwe bukenewe", "ibisubizo byose ni ukuri"],
    "correctAnswer": "gukomeza ugabanyije umuvuduko n'ubwitonzi kuko bishoboka ko abanyeshuli bakwambuka bitunguranye",
    "image": false
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Isoko ry'amatungo", "Ivuriro ry'amatungo", "Uruzitiro rw'amatungo", "Akayira k'amatungo"],
    "correctAnswer": "Akayira k'amatungo",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9OeB.png"
  },
  {
    "question": "Iki cyapa gisobanura iki ?",
    "options": ["Birabujijwe guhindukira", "Birabijijwe gusubira inyuma", "Umuhanda unyerera imbere", "Ntibyemewe kugendera mu byerekezo byombi"],
    "correctAnswer": "Birabujijwe guhindukira",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9ySn.png"
  },
  {
    "question": "Iki kimenyetso kiri mu muhanda kivuze iki ?",
    "options": ["Umuyobozi abujijwe kurenga umurongo wera ucagaguye cyeretse mugihe bitateza icyago", "Birabujijwe kunyuranaho", "Biremewe kunyuranaho ariko nturenge umurongo wera ucagaguye", "Birabujijwe gusubira inyuma"],
    "correctAnswer": "Umuyobozi abujijwe kurenga umurongo wera ucagaguye cyeretse mugihe bitateza icyago",
    "image": true,
    "imagePlaceholder": "https://s12.gifyu.com/images/b9ySO.png"
  }
];
const quizData18 = [
  {
    "question": "Umuyobazi w’ikinyabiziga yakora iki igihe ageze aho banyura bazenguruka?",
    "options": [
      "Tanga inzira ku binyabiziga byamaze kwinjira aho banyura bazunguruka",
      "Tanga inzira kubinyabiziga biremereye gusa",
      "Tanga inzira gusa niba uri munzira ya kabiri niya gatatu isohoka",
      "Komeza kuko abandi bayobozi b’ibinyabiziga bagomba kuguha inzira yo gukomeza"
    ],
    "correctAnswer": "Tanga inzira ku binyabiziga byamaze kwinjira aho banyura bazunguruka",
    "image": false
  },
  {
    "question": "Ni kihe cyerekezo umuyobozi w’ikinyabiziga yinjiriramo iyo ageze aho banyura bazenguruka?",
    "options": [
      "ibumoso",
      "ibumoso gusa igihe ayobowe ni kimenyetso kimurika",
      "iburyo cyangwa ibumoso",
      "iburyo"
    ],
    "correctAnswer": "iburyo",
    "image": false
  },
  {
    "question": "Mbere yuko umuyobozi w’ikinyabiziga akata ibumoso mu nzira nyabagendwa, nihe ikinyabiziga kigomba kuba kiri?",
    "options": [
      "Mu ruhande rw’iburyo bw’inzira nyabagendwa",
      "Gusa iburyo bwo hagati y’inzira nyabagendwa",
      "Muruhande urwarirwo rwo hagati mu nzira nyabagendwa",
      "Mu ruhande rw’ibumoso bw’inzira nyabagendwa"
    ],
    "correctAnswer": "Mu ruhande rw’iburyo bw’inzira nyabagendwa",
    "image": false
  },
  {
    "question": "Umuyobozi w’ikinyabiziga yakwitondera iki mbere yuko y’injira munzira banyuramo bazengurutse?",
    "options": [
      "ibinyabiziga bimuturuka inyuma umuvuduko bifite n’uburyo bimwegereye",
      "ibinyabiziga biturutse ibumoso bwe n’umuvuduko bifite n’intera iri hagati ye nabyo",
      "ibinyabiziga biturutse iburyo n’umuvuduko bifite ni intera iri hagati ye nabyo",
      "ibinyabiziga biturutse imbere, umuvuduko bifite n’intera iri hagati ye nabyo"
    ],
    "correctAnswer": "ibinyabiziga biturutse imbere, umuvuduko bifite n’intera iri hagati ye nabyo",
    "image": false
  },
  {
    "question": "Umuyobozi w’ikinyabiziga ugendera inyuma y’ikinyabaziga gitwara abagenzi gihagaze gikuramo cyangwa gishyiramo abagenzi agomba:",
    "options": [
      "kunyuranaho ibumoso",
      "gutegereza yihanganye",
      "a na b ni ibisubizo by’ukuri",
      "nta gisubizo ey’ukuri kirimo"
    ],
    "correctAnswer": "gutegereza yihanganye",
    "image": false
  },
  {
    "question": "Igihe ubonye icyapa kigaragaza ishuli wakora iki?",
    "options": [
      "kugabanya umuvuduko no gukomeza witonze",
      "gukomeza n’umuvuduko uri hejuru kuko umunyeshuli agomba gutegereza",
      "kuvuza ihoni",
      "ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "kugabanya umuvuduko no gukomeza witonze",
    "image": false
  },
  {
    "question": "Umubare w’abagenzi bemewe gutwarwa mukinyabiziga wanditswe mu:",
    "options": [
      "icyemezo cy’iyandikwa ry’ikinyabiziga",
      "inyemezabwishyu y’umusoro",
      "ubwishingizi",
      "ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "icyemezo cy’iyandikwa ry’ikinyabiziga",
    "image": false
  },
  {
    "question": "Gutwara ikinyabiziga wasinze:",
    "options": [
      "biremewe kubinyabiziga byabikorera kugiti cyabo",
      "biremewe nijoro",
      "birabujjiwe ku binyabiziga byose bifite moteri",
      "ibisubizo byose nibyo"
    ],
    "correctAnswer": "birabujjiwe ku binyabiziga byose bifite moteri",
    "image": false
  },
  {
    "question": "Umuyobazi w’ikinyabizaga ashobora kunyuranaho:",
    "options": [
      "ahamamuka",
      "igihe umuhanda ari mugari",
      "igihe umuyobazi w’ikinyabiziga kiri imbere ye amweretse ikimenyetso kimwemerera kunyuranaho",
      "nta gisubizo cy’ukuri"
    ],
    "correctAnswer": "igihe umuyobazi w’ikinyabiziga kiri imbere ye amweretse ikimenyetso kimwemerera kunyuranaho",
    "image": false
  },
  {
    "question": "Ugeze ahari inzira yabanyamaguru barindiriye kwambuka. Nithatangiye kwambuka, wakora iki?",
    "options": [
      "kuvuza ihoni",
      "kwihangana ugatagereza",
      "gukomeza",
      "nta gisubizo cy’ukuri"
    ],
    "correctAnswer": "kwihangana ugatagereza",
    "image": false
  },
  {
    "question": "Igihe utwaye umuntu mu kinyabiziga cyawe, akibagiwa kwambara umukandara wo kwirinda ibyago ugomba:",
    "options": [
      "gukuramo umukandara wo kwirinda ibyago wambaye mukawambara mwenibi",
      "kubyerengagiza wizeyeko nta mpamuka muri bukore",
      "funga cyane umukandara wo kwirinda ibyago wawe",
      "Kubibutsa kwambara umukandara wo kwirinda ibyago"
    ],
    "correctAnswer": "Kubibutsa kwambara umukandara wo kwirinda ibyago",
    "image": false
  },
  {
    "question": "Igihe za otobisi zigenewe gutwara banyeshuli zihagaze kugirango zibafate cyangwa bavemo ugomba:",
    "options": [
      "kuvuza ihoni ugakomeza",
      "gukomeza ugabanyije umuvuduko n’ubwitonzi kuko bishoboka ko abanyeshuli bakwambuka bitunguranye",
      "nta bwitonzi budasanzwe bukenewe",
      "ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "gukomeza ugabanyije umuvuduko n’ubwitonzi kuko bishoboka ko abanyeshuli bakwambuka bitunguranye",
    "image": false
  },
  {
    "question": "Igihe imodoka iparitse ku nkengero z’umuhanda mugihe cy’ijoro:",
    "options": [
      "Imodoka igomba kuba ifunze",
      "Umuntu ufite uruhushya rwo gutwara ikinyabiziga agomba kuba yicaye mu mwanya w’umuyobazi",
      "Amatera yo guhagarara umwanya munini aguma yaka",
      "Ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "Amatera yo guhagarara umwanya munini aguma yaka",
    "image": false
  },
  {
    "question": "Mu gihe hari undi muyobozi w’ikinyabiziga ugukurikiye watangiye kukunyuraho:",
    "options": [
      "Ntugomba kugira undi muyobozi w’ikinyabiziga unyuraho",
      "Ugomba kunyura ku kindi kinyabiziga",
      "Ugomba kunyura kukindi kinyabiziga uvugije ihoni",
      "Nta gisubizo cy’ukuri kirimo"
    ],
    "correctAnswer": "Ntugomba kugira undi muyobozi w’ikinyabiziga unyuraho",
    "image": false
  },
  {
    "question": "Utwaye ikinyabiziga mu muhanda uffte ibyerekezo bibiri .ikinyabiziga imbere yawe cyiragenda buhoro, imbere yawe umuhanda nta kibazo kunyuranaho, ugomba:",
    "options": [
      "kucyinyuraho bikorewe ibumoso",
      "kucyinyuraho bikorewe iburyo",
      "kucyinyuraho ukoresheje uruhande urwo arirwo rwose",
      "ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "kucyinyuraho bikorewe iburyo",
    "image": false
  },
  {
    "question": "Ibice by’umuhanda hyera bigari biteganye n’umurongo ugabanya umuhanda mo ,kabiri bisobanurra:",
    "options": [
      "guhagara kw’ikinyabiziga",
      "aho abanyamaguru bambukira",
      "guha ubushobozi binyabiziga",
      "ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "guha ubushobozi binyabiziga",
    "image": false
  },
  {
    "question": "Uturebanyuma dukoreshwa:",
    "options": [
      "kwireba",
      "kugenzura ibigendera mu muhanda inyuma",
      "kureba abicaye inyuma",
      "ntagisubizo cy’ukuri"
    ],
    "correctAnswer": "kugenzura ibigendera mu muhanda inyuma",
    "image": false
  },
  {
    "question": "Kuki abanyamaguru batemerewe kwambuka umuhanda mw’ikoni cyangwa hafi y’imodoka ihagaze?",
    "options": [
      "ingaruka kubindi binyabiziga",
      "ingaruka kubandi bakoresha umuhanda",
      "Abandi bayobozi bi binyabiziga baza bashobora kutabona abambuka umuhanda",
      "Ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "Abandi bayobozi bi binyabiziga baza bashobora kutabona abambuka umuhanda",
    "image": false
  },
  {
    "question": "Kunyuranaho mw’ikoni:",
    "options": [
      "biremewe",
      "ntibyemewe",
      "biremewe ukoranye ubwitonzi",
      "ibisubizo byose ni ukuri"
    ],
    "correctAnswer": "ntibyemewe",
    "image": false
  },
  {
    "question": "Umuyobozi w’ikinyabiziga igihe atwaye ikinyabiziga akagira umunaniro utuma yasinzira yakora iki?",
    "options": [
      "Gufungura ikirahure cy’ikinyabiziga cyangwa gushyira ubukonje mu modoka kugirango umwuka mwiza winjire mu kinyabiziga",
      "Guhagarara akaruhuka harimo no kugendagenda niba bishoboka",
      "Kunanura amaboko no gufunga amaso mugihe gito",
      "Kongera ubushyuhe mu kinyabiziga"
    ],
    "correctAnswer": "Guhagarara akaruhuka harimo no kugendagenda niba bishoboka",
    "image": false
  }
];
const quizData19 = [
  {
    "question": "Niki umuyobazi w’ikinyabiziga yakora igihe agize uruhare mu mpanuka yo mu muhanda, aho atawakometese ariko ibinyabiziga bikaba byateza icyago cyangwa byafunze umuhanda?",
    "options": [
      "Gushushanya aho zagonganiye no kuzishyira kuruhande",
      "Gukuramo ahagenze ugashyiraho icyapa cya mpandeshatu girukura kumodoka",
      "Gutegereza ko abapolisi bahagera mbere yo gukura ibinyabiziga mu muhanda",
      "Guhagarika ibindi binyabiziga kugeza ikibazo gikenwe mukabona kubikura mu muhanda"
    ],
    "correctAnswer": "Gushushanya aho zagonganiye no kuzishyira kuruhande",
    "image": false
  },
  {
    "question": "Umuyobazi w’ikinyabizaga uri kugendera mu muhanda w’ibyerekezo bibiri nuruhe ruhande rw’umuhanda agomba gukoresha?",
    "options": [
      "uruhande rw’ibumoso bw’umuhanda uretse igihe atawaye imashini zihinga cyangwa zikoreshwa indi mirimo",
      "Mu gice cy’umuhanda yumva ashaka",
      "Mu gice cy’iburyo bw’umuhanda uretse igihe ashaka kunyuranaho cyangwa gukata ibumoso",
      "Ku ruhande rw’ibumoso bw’umuhanda"
    ],
    "correctAnswer": "Mu gice cy’iburyo bw’umuhanda uretse igihe ashaka kunyuranaho cyangwa gukata ibumoso",
    "image": false
  },
  {
    "question": "Igihe umuyobazi w’ikinyabiziga atwaye mu muhanda urombereje w’ibice byinshi agomba kugendera mu kihe gice cy’umuhanda?",
    "options": [
      "Kugendera mugice icyo ari cyo cyose kirimo ibinyabiziga bike",
      "Kugendera ku gice cy’ibumoso keretse ushaka gusohokera iburyo",
      "Kugendera mu gice cy’iburyo bw’umuhanda keretse ushaka kunyuranaho",
      "Niagutwarira mu ruhande rw’iburyo bw’umuhanda kuko hagenewe imodoka ziremereye n’imodoka nini zituara abantu"
    ],
    "correctAnswer": "Kugendera mu gice cy’iburyo bw’umuhanda keretse ushaka kunyuranaho",
    "image": false
  },
  {
    "question": "Igihe umuyobazi w’ikinyabiziga atwaye ikinyabiziga mugihe cy’ibihu, imvura nyinshi, umwuzure cyangwa umukungugu mwinshi?",
    "options": [
      "Kugendera mu tuyira turi kumpande z’umuhanda, ucunga ibimenyetso bigarura urumuri",
      "Kugabanya umuvuduko hanyuma ugakoresha amatara magufi",
      "Gucana amatara maremare hanyuma ukagenda gahoro",
      "Kugendera mu murongo ugabanya umuhanda mo kabiri unareba ibimenyetso by’umuhanda bigarura urumuri"
    ],
    "correctAnswer": "Kugabanya umuvuduko hanyuma ugakoresha amatara magufi",
    "image": false
  },
  {
    "question": "Muri ibi byapa ni ubuhe bwoko bw’ibyapa bitegeka byo mu muhanda?",
    "options": [
      "Ibiri mw’ishusho y’urukiramende n’umuzenguruko w’umuhondo",
      "Ibiri mw’ishusho ya mpande eshatu mu n’uzenguruko mw’ibara ry’ubururu",
      "Ibiri mw’ishusho y’uruziga n’umuzenguruko mw’ibara ry’umutuku",
      "Ibiri mw’ishusho ya mpande enye zingana mubuso bw’umukara"
    ],
    "correctAnswer": "Ibiri mw’ishusho y’urukiramende n’umuzenguruko w’umuhondo",
    "image": false
  },
  {
    "question": "Ugeze mu masangano y’umuhanda aho usanga ibimenyekeko bimurika bidakora, wakora iki igihe umukozi ubifite ububasha aguhaye iki kimenyekeso?",
    "options": [
      "gukata ibumoso gusa",
      "gukata iburyo gusa ugakomeza imbere",
      "Guhagarara kumurongo wo guhagarara umwanya muto",
      "komeza imbere gusa"
    ],
    "correctAnswer": "Guhagarara kumurongo wo guhagarara umwanya muto",
    "image": false
  },
  {
    "question": "Amatara ndangacyerekezo agomba kugaragara nijoro igihe ijuru rikeye mu ntera nibura ya:",
    "options": [
      "m 100",
      "m 200",
      "m 150",
      "m 250"
    ],
    "correctAnswer": "m 150",
    "image": false
  },
  {
    "question": "Umurongo ucagaguye uvuga ko buri muyobazi abujijwe kuwurenga uretse mu gihe:",
    "options": [
      "Agomba kunyura ku kindi kinyabiziga",
      "Gukatira ibumoso",
      "Guhindukira cyangwa kujya mukindi gice cy’umuhanda",
      "Ibi bisubizo byose nibyo"
    ],
    "correctAnswer": "Guhindukira cyangwa kujya mukindi gice cy’umuhanda",
    "image": false
  },
  {
    "question": "Igice cy’inzira nyabagendwa kigarukira kumurongo ubiri yera ucagaguye ibangikanye kandi gifite ubugari budahagije kugirango imodoka zitambuke neza kibaari:",
    "options": [
      "Inzira y’abanyamaguru",
      "Agahanda k’amagare",
      "a na b byose ni ukuri",
      "Nta gisubizo cy’ukuri kirimo"
    ],
    "correctAnswer": "Agahanda k’amagare",
    "image": false
  },
  {
    "question": "Icyapa kimenyesha kugendera mu muhanda ubisikanirwamo gifite:",
    "options": [
      "Ishusho y’uruziga mw’ibara ritukura, ubuso bwera n’ikirango cy’umukara",
      "Ishusho ya mpandeshatu mw’ibara ritukura, ubuso bwera n’ikirango cy’umukara",
      "Ishusho ya mpandeshatu mw’ibara ritukura, ubuso bw’ubururu n’ikirango cy’umukara",
      "Ishusho y’uruziga mw’ibara ritukura, ubuso bw’ubururu n’ikirango cy’umukara"
    ],
    "correctAnswer": "Ishusho ya mpandeshatu mw’ibara ritukura, ubuso bwera n’ikirango cy’umukara",
    "image": false
  },
  {
    "question": "Ikinyabiziga kigendeshwa na moteri n’ikinyabiziga gikururwa n’inyamaswa ntibishobora gukurura:",
    "options": [
      "Ibinyabiziga birenze kimwe",
      "Ibinyabiziga bipakiye birenze bibiri",
      "Ibinyabiziga birenze bibiri",
      "b na c ni byo"
    ],
    "correctAnswer": "Ibinyabiziga birenze bibiri",
    "image": false
  },
  {
    "question": "Iki cyapa kivuga:",
    "options": [
      "Aho imihanda ihurira",
      "inkomane y’aho umuhanda umwe urasukira iburyo",
      "a na b ni ibisubizo by’ukuri",
      "nta gisubizo cy’ukuri kirimo"
    ],
    "correctAnswer": "nta gisubizo cy’ukuri kirimo",
    "image": false
  },
  {
    "question": "Iki cyapa gisobanura ibi bikurikira:",
    "options": [
      "birabujijwe kunyura ku kindi kinyabiziga",
      "gutambuka mbere kw’ibinyabiziga bituruka aho ujya",
      "a na b ni ibisubizo by’ukuri",
      "nta gisubizo cyukuri kirimo"
    ],
    "correctAnswer": "gutambuka mbere kw’ibinyabiziga bituruka aho ujya",
    "image": false
  },
  {
    "question": "Utugarurarumuri turi ku ruhande rw’imbere rw’ikinyabiziga tugomba gusa:",
    "options": [
      "ishusho mpandeshatu, ubuso ubururu",
      "ishusho mpandeshatu, ubuso umukara",
      "ishusho mpandeshatu, ubuso umweru",
      "nta gisubizo cy’ukuri"
    ],
    "correctAnswer": "ishusho mpandeshatu, ubuso umweru",
    "image": false
  },
  {
    "question": "Iki cyapa kivuga:",
    "options": [
      "iherezo ryo gutambuka mbere",
      "gutambuka mbere kw’ibinyabiziga biturutse imbere aho ujya",
      "gutambuka mbere y’ibinyabiziga biturutse imbere",
      "nta gisubizo cy’ukuri kirimo"
    ],
    "correctAnswer": "gutambuka mbere y’ibinyabiziga biturutse imbere",
    "image": false
  },
  {
    "question": "Iki cyapa kigi zwe:",
    "options": [
      "ifungana ry’umuhanda iburyo",
      "ifungana ry’umuhanda w’akayira gasatira umuhanda bumoso",
      "akayira gato",
      "nta gisubizo cy’ukuri"
    ],
    "correctAnswer": "ifungana ry’umuhanda w’akayira gasatira umuhanda bumoso",
    "image": false
  },
  {
    "question": "Umuyobazi ubonye ko hari undi umukurikiye ashaka kumunyuraho agomba kubahiriza ibi bikurikira:",
    "options": [
      "kwegera i ruhande rw’iburyo bw’umuhanda",
      "kongera umuvuduko",
      "guhagarara",
      "a na c ni byo bisubizo by’ukuri"
    ],
    "correctAnswer": "kwegera i ruhande rw’iburyo bw’umuhanda",
    "image": false
  },
  {
    "question": "Iki cyapa cyerekana:",
    "options": [
      "ifungana ry’umuhanda",
      "ifungana ry’umuhanda n’akayira gasatira umuhanda i bumoso",
      "umuhanda utaringaniye",
      "nta gisubizo cy’ukuri kirimo"
    ],
    "correctAnswer": "nta gisubizo cy’ukuri kirimo",
    "image": false
  },
  {
    "question": "Icyi cyapa gisobanura:",
    "options": [
      "nithanyurwa mu byerekezo byombi",
      "nithanyurwa n’abandi uretse abahatuye",
      "hanyurwa mu cyerekezo kimwe gusa",
      "nta gisubizo cy’ukuri kirimo"
    ],
    "correctAnswer": "nithanyurwa mu byerekezo byombi",
    "image": false
  },
  {
    "question": "Iki cyapa kivuga:",
    "options": [
      "ikoni iburyo",
      "akazamuko gashinze cyane",
      "akamamuko gashobora gutera ibyago",
      "b na c byose ni ukuri"
    ],
    "correctAnswer": "ikoni iburyo",
    "image": false
  }
];
