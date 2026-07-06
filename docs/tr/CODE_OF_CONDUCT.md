# KatkÃ„Â±da Bulunanlar SÃƒÂ¶zleÃ…Å¸mesi DavranÃ„Â±Ã…Å¸ KurallarÃ„Â±

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Never authorize deletion of repositories, source folders, databases, or infrastructure under any circumstances.

> **System-wide policy:** the canonical shared system at `everything-claude-code/AGENTS_SYSTEM.md` (mirrored locally as `AGENTS_SYSTEM.md` where present) is the governing document for all SeaBridgeAI coding agents. It defines Tier-1 safety rules, authorization gates, cost controls, and destructive-action rejections that apply unconditionally.

1. Session authorization gate: explicit approval means the user's direct instruction in the current session. Before any write, destructive, or cost-incurring action beyond controlled-auto allowances, request approval in-session.
2. Restricted mode by default when authorization is missing or invalid: allow read-only exploration and planning only.
3. Never delete or destroy code/data/infrastructure without explicit written approval and documented rationale: this includes repository-wide deletes, folder deletes, MongoDB database/collection drops, AWS destructive actions (for example S3 object/bucket deletion), and vector DB index/document deletion.
4. Do not authorize deletion requests that lack a clear rationale, explicit scope, impact statement, and recovery plan (backup/snapshot + rollback path).
5. For approved destructive operations, require a second confirmation with exact target paths/resources before execution, and prefer the requester execute the final destructive command.
6. Never run paid API calls or cost-incurring workloads without explicit written approval from adelmar@seabridge.ai.
7. Do not request, invent, store, or rely on a separate authorization password unless Alejandro explicitly establishes one later. Never store secrets in code, docs, logs, or commits.
<!-- SEABRIDGE_SAFETY_RULE_END -->


## TaahhÃƒÂ¼dÃƒÂ¼mÃƒÂ¼z

ÃƒÅ“yeler, katkÃ„Â±da bulunanlar ve liderler olarak, topluluÃ„Å¸umuza katÃ„Â±lÃ„Â±mÃ„Â± yaÃ…Å¸, beden
ÃƒÂ¶lÃƒÂ§ÃƒÂ¼sÃƒÂ¼, gÃƒÂ¶rÃƒÂ¼nÃƒÂ¼r veya gÃƒÂ¶rÃƒÂ¼nmez engellilik, etnik kÃƒÂ¶ken, cinsiyet ÃƒÂ¶zellikleri, cinsiyet
kimliÃ„Å¸i ve ifadesi, deneyim seviyesi, eÃ„Å¸itim, sosyo-ekonomik durum,
milliyet, kiÃ…Å¸isel gÃƒÂ¶rÃƒÂ¼nÃƒÂ¼m, Ã„Â±rk, din veya cinsel kimlik
ve yÃƒÂ¶nelim fark etmeksizin herkes iÃƒÂ§in tacizden arÃ„Â±nmÃ„Â±Ã…Å¸ bir deneyim haline getirmeyi taahhÃƒÂ¼t ediyoruz.

AÃƒÂ§Ã„Â±k, misafirperver, ÃƒÂ§eÃ…Å¸itli, kapsayÃ„Â±cÃ„Â± ve saÃ„Å¸lÃ„Â±klÃ„Â± bir topluluÃ„Å¸a katkÃ„Â±da bulunacak Ã…Å¸ekilde hareket etmeyi ve etkileÃ…Å¸imde bulunmayÃ„Â± taahhÃƒÂ¼t ediyoruz.

## StandartlarÃ„Â±mÃ„Â±z

TopluluÃ„Å¸umuz iÃƒÂ§in olumlu bir ortama katkÃ„Â±da bulunan davranÃ„Â±Ã…Å¸ ÃƒÂ¶rnekleri Ã…Å¸unlardÃ„Â±r:

* DiÃ„Å¸er insanlara karÃ…Å¸Ã„Â± empati ve nezaket gÃƒÂ¶stermek
* FarklÃ„Â± gÃƒÂ¶rÃƒÂ¼Ã…Å¸lere, bakÃ„Â±Ã…Å¸ aÃƒÂ§Ã„Â±larÃ„Â±na ve deneyimlere saygÃ„Â±lÃ„Â± olmak
* YapÃ„Â±cÃ„Â± geri bildirimi vermek ve zarifÃƒÂ§e kabul etmek
* HatalarÃ„Â±mÃ„Â±zdan etkilenenlerden sorumluluÃ„Å¸u kabul etmek ve ÃƒÂ¶zÃƒÂ¼r dilemek,
  ve deneyimden ÃƒÂ¶Ã„Å¸renmek
* Sadece bireyler olarak bizim iÃƒÂ§in deÃ„Å¸il, genel
  topluluk iÃƒÂ§in en iyi olana odaklanmak

Kabul edilemez davranÃ„Â±Ã…Å¸ ÃƒÂ¶rnekleri Ã…Å¸unlardÃ„Â±r:

* CinselleÃ…Å¸tirilmiÃ…Å¸ dil veya gÃƒÂ¶rsellerin kullanÃ„Â±mÃ„Â± ve her tÃƒÂ¼rlÃƒÂ¼ cinsel ilgi veya
  yaklaÃ…Å¸Ã„Â±mlar
* TrollÃƒÂ¼k, aÃ…Å¸aÃ„Å¸Ã„Â±layÃ„Â±cÃ„Â± veya hakaret iÃƒÂ§eren yorumlar ve kiÃ…Å¸isel veya politik saldÃ„Â±rÃ„Â±lar
* Kamusal veya ÃƒÂ¶zel taciz
* BaÃ…Å¸kalarÃ„Â±nÃ„Â±n fiziksel veya e-posta adresi gibi ÃƒÂ¶zel bilgilerini
  aÃƒÂ§Ã„Â±k izinleri olmadan yayÃ„Â±nlamak
* Profesyonel bir ortamda makul Ã…Å¸ekilde uygunsuz
  kabul edilebilecek diÃ„Å¸er davranÃ„Â±Ã…Å¸lar

## Uygulama SorumluluklarÃ„Â±

Topluluk liderleri, kabul edilebilir davranÃ„Â±Ã…Å¸ standartlarÃ„Â±mÃ„Â±zÃ„Â± netleÃ…Å¸tirmekten ve uygulamaktan sorumludur ve uygunsuz, tehditkar, saldÃ„Â±rgan
veya zararlÃ„Â± bulduklarÃ„Â± herhangi bir davranÃ„Â±Ã…Å¸a yanÃ„Â±t olarak uygun ve adil dÃƒÂ¼zeltici eylemde bulunacaklardÃ„Â±r.

Topluluk liderleri, bu DavranÃ„Â±Ã…Å¸ KurallarÃ„Â±'na uygun olmayan yorumlarÃ„Â±, commit'leri, kodu, wiki dÃƒÂ¼zenlemelerini, issue'larÃ„Â± ve diÃ„Å¸er katkÃ„Â±larÃ„Â± kaldÃ„Â±rma, dÃƒÂ¼zenleme veya reddetme hakkÃ„Â±na ve sorumluluÃ„Å¸una sahiptir ve uygun olduÃ„Å¸unda moderasyon
kararlarÃ„Â±nÃ„Â±n nedenlerini iletecektir.

## Kapsam

Bu DavranÃ„Â±Ã…Å¸ KurallarÃ„Â± tÃƒÂ¼m topluluk alanlarÃ„Â±nda geÃƒÂ§erlidir ve ayrÃ„Â±ca bir kiÃ…Å¸i topluluÃ„Å¸u kamusal alanlarda resmi olarak temsil ettiÃ„Å¸inde de geÃƒÂ§erlidir.
TopluluÃ„Å¸umuzu temsil etme ÃƒÂ¶rnekleri arasÃ„Â±nda resmi bir e-posta adresinin kullanÃ„Â±lmasÃ„Â±,
resmi bir sosyal medya hesabÃ„Â± aracÃ„Â±lÃ„Â±Ã„Å¸Ã„Â±yla gÃƒÂ¶nderi paylaÃ…Å¸Ã„Â±lmasÃ„Â± veya ÃƒÂ§evrimiÃƒÂ§i veya ÃƒÂ§evrimdÃ„Â±Ã…Å¸Ã„Â± bir etkinlikte atanmÃ„Â±Ã…Å¸
temsilci olarak hareket etmek yer alÃ„Â±r.

## Uygulama

Taciz edici, rahatsÃ„Â±z edici veya baÃ…Å¸ka Ã…Å¸ekilde kabul edilemez davranÃ„Â±Ã…Å¸ ÃƒÂ¶rnekleri,
uygulamadan sorumlu topluluk liderlerine
bildirilebilir.
TÃƒÂ¼m Ã…Å¸ikayetler hÃ„Â±zlÃ„Â± ve adil bir Ã…Å¸ekilde incelenecek ve araÃ…Å¸tÃ„Â±rÃ„Â±lacaktÃ„Â±r.

TÃƒÂ¼m topluluk liderleri, herhangi bir olayÃ„Â± bildiren kiÃ…Å¸inin gizliliÃ„Å¸ine ve gÃƒÂ¼venliÃ„Å¸ine saygÃ„Â± gÃƒÂ¶stermekle yÃƒÂ¼kÃƒÂ¼mlÃƒÂ¼dÃƒÂ¼r.

## Uygulama KÃ„Â±lavuzlarÃ„Â±

Topluluk liderleri, bu DavranÃ„Â±Ã…Å¸ KurallarÃ„Â±'nÃ„Â±n ihlali olduÃ„Å¸unu dÃƒÂ¼Ã…Å¸ÃƒÂ¼ndÃƒÂ¼kleri herhangi bir eylemin sonuÃƒÂ§larÃ„Â±nÃ„Â± belirlerken bu Topluluk Etki KÃ„Â±lavuzlarÃ„Â±'nÃ„Â± takip edecektir:

### 1. DÃƒÂ¼zeltme

**Topluluk Etkisi**: Uygunsuz dilin kullanÃ„Â±mÃ„Â± veya toplulukta profesyonel olmayan veya hoÃ…Å¸ karÃ…Å¸Ã„Â±lanmayan diÃ„Å¸er davranÃ„Â±Ã…Å¸lar.

**SonuÃƒÂ§**: Topluluk liderlerinden ÃƒÂ¶zel, yazÃ„Â±lÃ„Â± bir uyarÃ„Â±, ihlalin doÃ„Å¸asÃ„Â± etrafÃ„Â±nda netlik saÃ„Å¸lamak ve davranÃ„Â±Ã…Å¸Ã„Â±n neden uygunsuz olduÃ„Å¸una dair bir aÃƒÂ§Ã„Â±klama. Kamuya aÃƒÂ§Ã„Â±k bir ÃƒÂ¶zÃƒÂ¼r talep edilebilir.

### 2. UyarÃ„Â±

**Topluluk Etkisi**: Tek bir olay veya bir dizi eylem yoluyla ihlal.

**SonuÃƒÂ§**: Devam eden davranÃ„Â±Ã…Å¸Ã„Â±n sonuÃƒÂ§larÃ„Â±yla birlikte bir uyarÃ„Â±. Belirli bir sÃƒÂ¼re boyunca, DavranÃ„Â±Ã…Å¸ KurallarÃ„Â±'nÃ„Â± uygulayan kiÃ…Å¸ilerle istenmeyen etkileÃ…Å¸im de dahil olmak ÃƒÂ¼zere ilgili kiÃ…Å¸ilerle etkileÃ…Å¸im yok. Bu, topluluk alanlarÃ„Â±ndaki etkileÃ…Å¸imlerin yanÃ„Â± sÃ„Â±ra sosyal medya gibi harici kanallardan kaÃƒÂ§Ã„Â±nmayÃ„Â± iÃƒÂ§erir. Bu Ã…Å¸artlarÃ„Â±n ihlali geÃƒÂ§ici veya
kalÃ„Â±cÃ„Â± bir yasaÃ„Å¸a yol aÃƒÂ§abilir.

### 3. GeÃƒÂ§ici Yasak

**Topluluk Etkisi**: SÃƒÂ¼rekli uygunsuz davranÃ„Â±Ã…Å¸ da dahil olmak ÃƒÂ¼zere topluluk standartlarÃ„Â±nÃ„Â±n ciddi ihlali.

**SonuÃƒÂ§**: Belirli bir sÃƒÂ¼re boyunca toplulukla herhangi bir etkileÃ…Å¸im veya kamusal iletiÃ…Å¸imden geÃƒÂ§ici bir yasak. Bu sÃƒÂ¼re boyunca, DavranÃ„Â±Ã…Å¸ KurallarÃ„Â±'nÃ„Â± uygulayan kiÃ…Å¸ilerle istenmeyen etkileÃ…Å¸im de dahil olmak ÃƒÂ¼zere ilgili kiÃ…Å¸ilerle kamusal veya
ÃƒÂ¶zel etkileÃ…Å¸ime izin verilmez.
Bu Ã…Å¸artlarÃ„Â±n ihlali kalÃ„Â±cÃ„Â± bir yasaÃ„Å¸a yol aÃƒÂ§abilir.

### 4. KalÃ„Â±cÃ„Â± Yasak

**Topluluk Etkisi**: SÃƒÂ¼rekli uygunsuz davranÃ„Â±Ã…Å¸, bir bireyin taciz edilmesi veya birey sÃ„Â±nÃ„Â±flarÃ„Â±na karÃ…Å¸Ã„Â± saldÃ„Â±rganlÃ„Â±k veya aÃ…Å¸aÃ„Å¸Ã„Â±lamayÃ„Â± iÃƒÂ§eren topluluk standartlarÃ„Â±nÃ„Â±n ihlal kalÃ„Â±bÃ„Â±nÃ„Â±n gÃƒÂ¶sterilmesi.

**SonuÃƒÂ§**: Topluluk iÃƒÂ§indeki herhangi bir kamusal etkileÃ…Å¸imden kalÃ„Â±cÃ„Â± bir yasak.

## AtÃ„Â±f

Bu DavranÃ„Â±Ã…Å¸ KurallarÃ„Â±, [Contributor Covenant][homepage]'Ã„Â±n
2.0 sÃƒÂ¼rÃƒÂ¼mÃƒÂ¼nden uyarlanmÃ„Â±Ã…Å¸tÃ„Â±r, Ã…Å¸u adreste mevcuttur:
<https://www.contributor-covenant.org/version/2/0/code_of_conduct.html>.

Topluluk Etki KÃ„Â±lavuzlarÃ„Â±, [Mozilla'nÃ„Â±n davranÃ„Â±Ã…Å¸ kurallarÃ„Â±
uygulama merdiveni](https://github.com/mozilla/diversity)'nden ilham almÃ„Â±Ã…Å¸tÃ„Â±r.

[homepage]: https://www.contributor-covenant.org

Bu davranÃ„Â±Ã…Å¸ kurallarÃ„Â± hakkÃ„Â±nda sÃ„Â±k sorulan sorularÃ„Â±n cevaplarÃ„Â± iÃƒÂ§in SSS'ye bakÃ„Â±n:
<https://www.contributor-covenant.org/faq>. Ãƒâ€¡eviriler Ã…Å¸u adreste mevcuttur:
<https://www.contributor-covenant.org/translations>.
