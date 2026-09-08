# 第二篇博文：中英对照与改写说明

日期：2026-09-08  
英文页：[`blog/dont-work-where-the-model-will-catch-up.html`](../blog/dont-work-where-the-model-will-catch-up.html)  
Slug：`dont-work-where-the-model-will-catch-up`

本文只说明「中文原稿 → 英文站博文」做了什么、为什么。英文正文以 HTML 为准。

---

## 1. 发布信息

| 项 | 中文原稿 | 英文站 |
|---|---|---|
| 标题 | 别在模型会补的地方用力 | Don't work where the model will catch up |
| Title（带品牌） | — | Don't work where the model will catch up — CPH4.AI（52 字符） |
| Description | 无独立 SEO 摘要 | Each layer we built around the model — prompts, RAG, harnesses — became default. Here is what still compounds: judgment, narrative, and how you learn.（约 150 字符） |
| 日期 | 未标 | 2026-09-08 |
| 作者 | Jimmy Xu | Jimmy Xu（页内 byline + Article JSON-LD） |
| 语气 | 公众号口语、（笑）、脏话点缀 | 第一人称判断文，清楚英文；与第一篇 Cursor 博文同一档，不是母站电报短句 |

---

## 2. 整节删除（按你的要求）

| 删除 | 原因 |
|---|---|
| 「继上次的第一篇教程后，我要带来我的第一篇判断与认知方向的文章。」 | 系列钩子。英文站要单篇成立，不依赖「上一篇教程 / 本系列第一篇」。 |
| 三张 TLDR 图、CS329Z 图、文末二维码 | 明确要求去图。TLDR 改写成段首 In short + 表格，避免信息丢失。 |
| 「致谢」整节（Altman、吾辈如神、Marcus、废话多多大师、ToB 老人家、ToBeSaaS） | 明确要求去掉致谢。正文里《吾辈如神》仍留一句，因为那是论证，不是名单。 |
| 「交流 / 联系」+ 二维码 | 明确要求去掉联系。站点已有页脚邮箱，不在文末再放私域入口。 |

---

## 3. 全局改写原则

1. **单篇成立**：去掉公众号连载口吻（大家好、系列预告、看完收获、笑、轻喷）。
2. **国内 = 中国**：口语里用 `in China` / `China`，不用 `mainland China`（生硬），也不用 `domestic`（对海外读者等于「本国」）。和北美对比时用 `North America`。
3. **SEO**：一页一 H1、Title 50–60、Description ~150、canonical、OG/Twitter、Article JSON-LD、进 sitemap；不加 keywords。
4. **结构可扫**：原稿 TLDR 是图，英文改成表格（层级 / 赌注 → 结果），符合金字塔：先结论后展开。
5. **脏话与（笑）**：判断保留，脏口收掉（狗屎 / 卵用 / 一坨 → unusable / does nothing / a mess）。母站观众是合作方、资方、候选人。
6. **错字按义修**：`目标课群` → 目标客群；`很块` → 很快。不在英文里复现错字。
7. **黑话对读者负责**：「龙虾那波」译成 the OpenClaw wave。中文圈用龙虾指 OpenClaw，英文站直接写产品名，不写 lobster。

---

## 4. 「国内」译法清单

这是本篇最容易译错的词。原稿里的「国内」是中国市场（数字化基建、B 端压价、FDE 外包化）。英文用自然说法 `in China`，不用公文腔 `mainland China`，也不用 `domestic`（海外读者会读成「本国」）。

| 原稿 | 英文 | 为什么不那么译 |
|---|---|---|
| 无论是硅谷还是国内 | Silicon Valley and China | domestic 对海外读者等于「本国」，指代崩溃；mainland China 太生硬 |
| 在国内，做 FDE 培训比做 FDE 赚钱 | in China it pays better to train people to become FDEs than to do FDE | 一般就说 in China |
| 国内目前的 FDE | What gets sold as FDE there | there 回指 China，避免同段反复 in China |
| 国内头部 FDE 厂商 | so-called leading FDE vendors in China | 「所谓」保留；头部 ≠ 已验证的 top |
| 国内大多数企业 | Most companies in China | 数字化/智能化基建这段是中国企业现状 |
| 比北美困难很多 | much harder than in North America | 北美保留，不改成 US，原稿是北美 |
| 国内 B 端老问题 | an old problem in China's B2B market | B 端 = B2B |
| 国内环境太卷了 | The market is brutally competitive | 上一句已点 China's B2B，不必再叠 mainland；involution 对不了解内卷的读者是空词 |
| 现在国内没有 FDE 生态 | there is no FDE ecosystem in China yet | 生态未建成，不是「中国没有 FDE 这个职业」 |
| 我们的 FDE 还在碎石路 | FDE there is still on a gravel road | 「我们的」= 中国这边的 FDE，不是 CPH4 的 FDE |

五百强 → `Fortune 500`（大家都盯着的大客户池）。金额保留 RMB，避免美元换算造成假精确。

---

## 5. 分节对照

### 5.1 开篇

| 中文 | 英文 | 调整 |
|---|---|---|
| 大家好，我是 Jimmy Xu。 | I'm Jimmy Xu. This is a piece on judgment: … | 去招呼；补一句题旨，让 H1 立刻落地 |
| 继上次的第一篇教程后… | （删） | 去系列 |
| 古法写作，非 AI 生成；语料来自交流；判断来自实践 | The prose was written by hand, not generated. … | 保留主张，去掉「古法」这个对海外不可读的梗 |
| 希望能够引发你的思考 + 四个问题 | After this, you should have a clearer view of: + 四条 | 去鸡汤收束，问题列表保留 |

四个问题的英译：

| 中文 | 英文 |
|---|---|
| 什么是大模型时代的护城河？ | What a moat looks like in the large-model era |
| 为什么没必要 AI 焦虑？ | Why AI anxiety is a waste |
| AI 老炮有什么局限性？ | Where veterans get stuck |
| 是不是只要学的足够慢，我们就不用学习了？ | Whether learning slowly enough means you never have to learn |

「老炮」不译 old cannon / veteran influencer。这里指先入行的人，用 veterans。

---

### 5.2 半年以后，我们也许不需要 Harness 了

**标题：** In six months we may not need a harness

Harness 不译成 shell / wrapper。行业词，和第一篇 Cursor 文一致。

图片 TLDR → 段首 In short + 七行表（Layer / What happened to the scarcity）。

| 小节 | 中文要点 | 英文要点 | 调整 |
|---|---|---|---|
| Prompt Engineering | AI 不听话 → 以为问法不对 → GPT Wrapper | would not follow → we assumed the ask was wrong → GPT wrappers | Wrapper 保留；「正确地提问」加引号译成 “correctly” |
| RAG | 私有知识；后来不太需要自己实现；仍是最成功落地 | private knowledge; less need to build it yourself; still the most successful way AI has shipped | 「落地」不译 landing，用 shipped |
| Workflow | n8n / Dify / Coze / FastGPT；23–25 上半年；Manus 后变冷；企业仍用；Agentic Workflow；只做搭建平台不 work | 产品名保留；cooled after Manus；default feature；Building only that no longer works | 「厂家」→ products；不 work 写成 no longer works |
| CoT 编排 | 手动编 CoT、Markdown 打印；GPT-4o / Deepseek-R1 后不再自己实现 | Orchestrating chain-of-thought；DeepSeek-R1 | 节名补 Orchestrating，避免和模型原生 CoT 混；拼写 DeepSeek |
| Context 与 Memory | 没看到 Memory Infra 跑出来；声称做记忆还不如不做 | no memory-infrastructure company break out；would be better off not shipping it | 「并无什么卵用」→ The product does nothing |
| Skills 与 MCPs | 泛滥、垃圾、Slop；很快被模型内化 | flooded；garbage；Slop；internalized by the next native model | 保留 Slop；「很块」按「很快」译 |
| Harness | OpenCode 开源、Claude Code 泄露、DeepSeek / Codex harness 开源；半年后没人买单 | 事实链保留；will be treated as default | 「壳有壳的价值」→ the shell has value，下一句再落到 harness，避免 shell/harness 混成一个词 |
| 小结 | 没消失；不稀缺；活过 3 个月活不过 6 个月，活过 6 个月活不到一年 | did not vanish；stopped being a reason to pay；three / six / a year | 节奏保留，去掉「妄图」的道德口吻，改成 tried to outrun |

---

### 5.3 AI 创业公司的现在与未来

**标题：** AI startups now, and next

图片 TLDR → In short + 六行表（Bet / How long it holds）。

| 小节 | 中文 | 英文 | 调整 |
|---|---|---|---|
| 私有化数据、后训练与 FDE | 垂类 Agent；不愿上云；专项成本优势 | vertical agents；will not put data on a public cloud；cheaper on a narrow task | 「私有化数据」→ private data，不是 privatization |
| FDE 机会 | 能做不大；五百强都盯着；易沦大外包 | real opening；does not get large；Fortune 500；staffing shop with better slides | 「大外包」不译 outsourcing company 太素，用 staffing shop 更准 |
| FDE 现状 | 培训比做事赚钱；本质大号外包 / 项目制；国内头部也是 | train FDEs vs do FDE；large-scale outsourcing / bespoke project work；so-called leading vendors | （笑）去掉，判断留下 |
| 原因一 | 数字化都没有；知识库是聊天记录、狗屎；客户当金子 | digital infrastructure missing；chat logs, unusable；customer treats it as gold | 去脏口 |
| 原因二 | 决策靠拍脑袋；梳理规则比北美难 | never turned into process；gut；harder than North America | 「拍脑袋」→ call them by gut |
| 原因三 | 压价；500 万收入 1000 万成本；毕业生循环 | billed at five million RMB / cost ten million；new graduate loop | 人民币单位保留 |
| 判断 | 没有 FDE 生态；碎石路，没看到高速路开工 | no FDE ecosystem yet；gravel road；no groundbreaking for the highway | 比喻保留，（笑）去掉 |
| 后训练 | 通用模型若能触达就没意义；2028?；token 两级分化 | if a general model can reach the job；maybe 2028；two-tier token thesis | Maybe 2028 的留白保留 |
| 补丁隐喻 | 更先进的不完美取代落后的不完美 | replacing last year's imperfect with a more advanced imperfect | 结构保留 |
| 合规牌照 | 老玩家可共建；模型厂体量够买门槛；It doesn't make sense | incumbents can co-build；door really that hard to buy? It doesn't make sense. | 口语句保留 |
| Go Viral | 短期仍要做人向增长；长期做模型语料/检索里最适配目标客群的产品；意图经济取代注意力经济 | growth aimed at humans；what models retrieve for the customers you want；intent replaces attention | 目标课群按客群译；「课群」当错字 |
| Narrative | 活在硅谷新贵小时候的科幻里；火星 vs 摇篮/多星球；许愿机；Ambition；反 Lean Startup，偏 Thiel | 结构几乎直译；wish-machine；anti-Lean-Startup. More Peter Thiel. | AGI 信仰保留；Fable 5 / GPT-6 Astra 保留产品名 |
| Be Raw | 假设没人看过科幻还会不会要飞船；另一条创业路是刚需 | strip us back；need that was already there | 节名 Be raw 保留 |

「许愿机」→ `wish-machine`：比 wishing well 更贴「模型把想要变成得到」。

---

### 5.4 AI 时代的学习迭代与认知升级

**标题：** Learning and judgment in the model era

「认知升级」不译 cognitive upgrade（鸡汤词）。判断文的核心是 judgment + 学习还要不要，用 judgment。

| 小节 | 中文 | 英文 | 调整 |
|---|---|---|---|
| 新兵优势 | 22 年入行 NLP；ChatBot 答非所问；留学下一句移民 | entered AI in 2022；studying abroad → emigration | ChatBot 年代感保留 |
| 胆子 | 新同学用 AI 更大胆；Altman 仍鼠标点邮件 | guts；still clicks into email | 「古法习惯遗留」→ leftover habits from the old method |
| 范式切换 | 26 年 1 月才切到 Vibe Coding | January 2026 — vibe coding first | 日期保留 |
| 多智能体 | Grok Bot 才敢用；龙虾那波是一坨 | Grok Bot made it work；tried during the OpenClaw wave and it was a mess | 「龙虾」= OpenClaw，英文写产品名 |
| 框 | 使用上限受限于对过去 AI 上限的认知 | ceiling we remember from the last generation of models | 直译会绕，改成 remember |
| 解法 | 新模型先探边界；做不好再补 | probe the boundary；fill in only what it cannot do | 保留操作指令 |
| 吾辈如神 | 远古大脑不适合和大模型协作 | *We Are as Gods* (吾辈如神) | 书名给英译 + 原文，不假装已有官方英版书名约定 |
| CS329Z | 该学这个，不该学过时网页 / PHP / MySQL / jQuery | Engineering AI Agents, Fall 2026；leftover web stack | 「垃圾的」收成 leftover / dated，判断仍在 |
| You don't know you don't know | 保留英文 | 斜体保留 | 原稿已是英文 |
| 非技术建议 | 每做一个模块就追问到逻辑搞懂 | keep asking until the logic is actually clear | 「至少逻辑上」→ at least the logic |
| agency | 不愿意提高技术 agency | will not raise their own technical agency | 原稿混用英文，保留 agency |
| 验收 | 边界拓展了没有；模型没变强也能解决 | did your frontier move | 「边界拓展」用 frontier，对接后文效率代差 |
| 贪婪匹配例子 | Fable 5.1；15 分钟乱查 vs 直接指向 | 例子保留 | 「完全不懂技术的同学」→ classmate with no technical background，避免 beginner 变说教 |
| 效率代差 | Stack those episodes and you get a gap in efficiency that does not close by waiting | 「学得够慢就不用学」的反例收在最后一句 | 不另加鸡汤结尾 |

---

## 6. 语气与用词对照（高频）

| 中文口吻 | 英文站 | 为什么 |
|---|---|---|
| 大家好 / 看完本篇 | 删 | 公众号开场，英文站不需要 |
| （笑） | 删 | 判断已经够清楚，笑会把锋芒变成俏皮 |
| 一坨 / 狗屎 / 卵用 | a mess / unusable / does nothing | 保留否定，去掉脏口 |
| 古法 | written by hand / leftover habits from the old method | 古法在中文是反讽标签，英译会飘成 classical method |
| 落地 | shipped / actually ships | landing 会让人以为 go-to-market |
| 不 work | no longer works | 保留口语判断 |
| 卷 | brutally competitive | involution 需要注释 |
| 拍脑袋 | call them by gut | 直译拍脑袋是笑话 |
| 大号外包 | large-scale outsourcing / staffing shop | 两条都用：本质 vs 做大客户的结局 |
| 许愿机 | wish-machine | 对应「想要所以得到」 |
| 意图经济 | intent（through a general entry point） | 与 attention economy 对仗；第一次出现写全，后文用 intent |
| 课群 | customers you actually want | 按客群修 |

---

## 7. SEO 对照检查

按 [`docs/seo-playbook.md`](./seo-playbook.md)：

| 项 | 做法 |
|---|---|
| Title | `Don't work where the model will catch up — CPH4.AI`，约 52 字符，自然句，不堆词 |
| Description | 约 150 字符；前半是现象（prompts / RAG / harnesses became default），后半是还在复利的三件事 |
| H1 | 与 Title 相关；静态 HTML 里就有 |
| 层级 | H1 → H2 × 3 → H3，不跳级。原稿「FDE / 后训练」从 H4 感升为 H3 |
| robots | `index, follow` |
| canonical | `https://cph4.ai/blog/dont-work-where-the-model-will-catch-up.html` |
| OG / Twitter | article + summary_large_image；图用绝对路径 `https://cph4.ai/og.png` |
| JSON-LD | Organization + Article + WebPage |
| keywords | 不加 |
| sitemap | 已加本页 URL |
| 内链 | eyebrow `Blogs` 回 `/#blogs`；不链微信 |
| 外链 | 本篇无产品站外链。行业专名（Palantir、OpenAI、n8n 等）作正文专名，不硬插链 |
| AEO | 作者 Jimmy Xu、日期 2026-09-08、判断可被模型转述；不把 Coming 产品写进这篇 |

首页 `site.ts` `notes`：**新文在前**，旧文 Cursor 在后。

---

## 8. 有意不译 / 有意改写的专名

| 原稿 | 处理 |
|---|---|
| GPT Wrapper | GPT wrappers |
| CoT | chain-of-thought（节名写出；后文可 CoT） |
| Deepseek-R1 | DeepSeek-R1 |
| Skills / MCPs / Harness / FDE / RAG | 保留 |
| Z.ai (智谱) | Z.ai (Zhipu)，海外读者需要括号 |
| 龙虾那波 | the OpenClaw wave。中文梗落到产品名，不写 lobster |
| 《吾辈如神：重构AI时代的生存力与胜任力》 | 正文缩成 *We Are as Gods* (吾辈如神)。致谢里的书被删，论证里的书留下 |
| Fable 5 / Fable 5.1 / GPT 6 Astra / Grok Bot / CS329Z | 按作者写法保留（GPT-6 加连字符） |
| It doesn't make sense / You don't know you don't know / Be Raw / Go Viral / Distribution / Narrative / Ambition | 原稿已是英文的，结构保留 |

---

## 9. 和第一篇博文的对齐

| 项 | 第一篇 Cursor | 本篇 |
|---|---|---|
| 去掉 | 第一篇自称、致谢、公众号链接 | 系列自称、致谢、联系、图片 |
| 语气 | 第一人称经验贴 | 第一人称判断贴 |
| 壳 | 同一套 header / Article SEO / `.post-body` | 同 |
| 不写 | 假文章、年龄、产品竞品对标墙 | 同。行业工具名（Cursor、Claude Code、Manus）与第一篇一样按讨论对象保留 |

---

## 10. 一句话总结改写

中文是公众号判断长文（图、连载、私域、脏口、梗）。英文是可以单独被搜索、被转发、被模型引用的一篇判断：结论先行，国内说成 in China，图换成表，系列和联系拿掉，论证留下。
