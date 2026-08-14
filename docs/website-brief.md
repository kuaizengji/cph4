# CPH4.AI 官网 Brief

日期：2026-08-13  
站点语言：英文  
观众：人才、合作方、资方  
范围：`cph4.ai` 母站。产品站（如 [kuaizengji.com](https://www.kuaizengji.com/)）各自独立。

本文是 2026-08-13 官网改版讨论的决策沉淀，不是会议记录。改站、改文案、加产品条目，以本文为准。

---

## 1. 根因

难改的不是动效，是对外身份。

CPH4 使命很大、起点很小：人工智能软件应用与模型后训练，同时是内部孵化式的 AI Venture Studio。旧站用 SpaceX / Palantir 已完成神话的口吻，讲一个还没有 Falcon 9 的工作室——全是宣言，没有器物。

| 层 | 内部真实 | 旧站呈现 |
|---|---|---|
| 使命 | Lucy / 超级个体 / 超级组织 | 已写满 |
| 形态 | 小团队内部孵化 | 未说 |
| 现在 | 教育有一块上线；金融、增长在建 | 列出未做的 Biopharma / Enterprise |
| 证据 | 快增绩已有合办院校信任 | 零 |
| 十年后 | 哈夫克式超国家主体 | 不应出现 |

原则：**对外用使命公司的语气，用工作室的诚实结构。** 主页立法，不解释公司；下一屏立刻给出真实产品。神话需要器物授权。

身份选择：不自称孵化器，不自称已做成的平台公司。`cph4.ai` 是母站（人才 / 合作方 / 资方的第一眼），不是快增绩的产品页。

---

## 2. 名字与叙事分层

灵感来自《超体》（*Lucy*）：CPH4 是催化物，进入身体后开发大脑，个体跃迁，最终扩散成更大的存在。映射：

```
电影 CPH4     →  AI（第二大脑）
Lucy 个体变强  →  组织里每个人成为超级个体
Lucy 最终扩散  →  成长为超级组织
```

公开用法抄 Palantir：名字承载神话，主页不解释出处。

| 层级 | 放什么 | 不放什么 |
|---|---|---|
| 主页 | 名字 + 一句当下成立的主张 | 药物、百分百大脑、电影剧情 |
| Company 末段 | 一句出典 | 长篇影评、超人类主义宣言 |
| 内部 | 完整 Lucy → 超级组织 → 更远的东西 | — |

Company 已锁定英文：

> The name comes from *Lucy*: CPH4 was the catalyst that unlocked unused capacity. We build that catalyst as AI.

「哈夫克 / 自有货币 / 武装安保 / 行政司法」是创始人内部罗盘，**永不进官网、永不进对外 deck 封面**。会吓跑院校、合作老师和机构客户。

---

## 3. 参考站：各偷一条

不要做五家合集。

| 参考 | 可偷 | 不该偷 |
|---|---|---|
| [SpaceX](https://spacex.com/) | 少字、器物即品牌、使命短 | 没有火箭时的史诗口吻 |
| Anysphere / Cursor | 克制：不解释文明；品味是减法 | 把母站做成单一产品站 |
| [Palantir](https://www.palantir.com/) | 名字不解释；语气严肃 | 把 Ontology 当首页词；假装已是平台公司 |
| [Scale AI](https://scale.com/) | 滚动绑定一条主张，然后立刻给证据 | 没有客户墙时的豪华案例 |

Hero 语感以现站为质量下限。咨询腔（second brain、compounding layer、Small teams. Shipped systems.）已否决——那是在解释公司，现站是在立法。

---

## 4. 已锁定决策

| 项 | 决定 |
|---|---|
| 观众 | 人才、合作方、资方 |
| 语言 | 英文 |
| Lucy | 主页不解释；Company 一句出典 |
| 哈夫克 | 永不进官网 |
| 产品 | 主页下一屏必须露出，状态诚实；悬停左侧介绍；每条仍有独立介绍页 |
| 导航名 | **Products**（不用 Work / Domains / Ventures / Portfolio） |
| Capabilities | 独立一屏，不算产品；不叫 Technology |
| Blogs | 顶栏 + 页脚。有文再发。空列表可接受，不做假文章 |
| 页脚 | Products · Capabilities · Company / Careers · Blogs · Contact |
| Careers | 主页态度保留；真实 JD 进 `site.ts` 的 `jobs` + `careers/{slug}.html`。空岗不展示 |
| 快增绩截图 | 本版不上 |
| 创始人 | Company 页；文字列表；不上照片；不上年龄 |
| 排序 | Chairman 是一把手，**Jimmy Xu 在前** |
| 头衔英文 | `Chairman of the Board`，不写 `COB` |
| Ontology | Capabilities 屏末条；不当导航、不当大标题 |
| Growth systems | 已拆出；不再作为 Products 条目 |
| Verdict | 一条、一句话；不拆 Finance / Data / 科普；不写价格 |
| CTA | Contact（`nemoarce2007@gmail.com`）+ Careers |
| 量化 / 链上套利 | 不上站 |
| 医疗 / 生物制药 | 未做，不进 Products |

`Work` 已否决：那是设计公司 / 咨询公司的案例墙。证据要有，频道名用 Products。  
`Technology` 已否决：偏平台公司口吻。技术栈用 **Capabilities**。

---

## 5. 信息架构

Organization / Individual 不再各占一屏。那两句收进 Hero。单页连续上下滑（线框世界固定在背后，随滚动推进）：

```
Nav:  Products · Capabilities · Company · Blogs · Careers | Contact
Footer: Products (各介绍页) · Capabilities · Company · Careers · Blogs · Contact

0 Home          index.html
1 Products      index.html#products  →  products/{slug}.html
2 Capabilities  index.html#capabilities（无子页）
3 Company       index.html#company
4 Careers       index.html#careers   →  careers/{slug}.html（有 JD 时）
  Blogs         blog/index.html
```

| 段 / 页 | 功能 |
|---|---|
| Home | 立法全屏。不放产品、不放 Studio 说明、不放 Enter CTA |
| Products | 右列目录（名 + 状态）；悬停 / 焦点时左侧浮现该条完整介绍（一句 + 两段 + Live Open）。默认第一条。鼠标离开列表保持最后一条 |
| Capabilities | 三层栈：Applied / Media / Foundation。右列目录（分组 + 名）；悬停 / 焦点时左侧浮现该条介绍（组名 + 一句 + 两段）。默认第一条。无 Live 状态，无独立介绍页 |
| 产品介绍页 | 仍保留。点名字 / 页脚 / 外部分享进 `products/{slug}.html`。状态 + 一句 + 两段。Live 可外链产品站。不上截图（另说） |
| Company | 两人列表 + Lucy 一句 |
| Careers | 招聘态度 + 邮件。有真实 JD 时主页列出标题，点进介绍页 |
| Blogs | 写作频道。无文时一行 *Nothing filed yet.* |
| Footer | 全站。结束悬空感 |

主页仍单页滚动。不用分页滚轮劫持，不用 scroll-snap。顶栏锚点跳转对应段。内页顶栏回主页对应段。

---

## 6. 英文文案（源）

### Home

```
Intelligence,
without end.

An organization that evolves itself.
A self that never stops becoming.
```

主句沿用旧站。副句用旧站第 2、3 屏里更强的两句，替换原先口号化的 *Self-evolving organizations. / Endlessly advancing individuals.*  
不放 `Enter CPH4`：顶栏已有 Products，往下即是器物。

### Products

标题：`In motion.`

| Name | Status | One line | 介绍页 | 产品站 |
|---|---|---|---|---|
| Kuaizengji | Live | Coursework-native AI for students in English-medium and overseas programs. | `products/kuaizengji.html` | https://www.kuaizengji.com/ |
| Kuaizengji 3.0 | Coming | A general learning agent: any source in, structured knowledge out. September 2026. | `products/kuaizengji-3.html` | — |
| Taoran Agent | Demo | Exam-prep that follows a named teacher’s method, not a generic tutor. | `products/taoran.html` | — |
| Verdict | Building | Financial opinions, settled against real prices. | `products/verdict.html` | — |

主页放目录 + 悬停左侧介绍；介绍页文案源在 `site.ts`（`productIntroHtml` 主页与子页共用）。产品站内部细节、竞品名、停运计划、获客手法，不进母站。

Growth systems 已从 Products 移除；RPA / AEO / Digital humans / 媒体能力 / Ontology 见 Capabilities。

发 Blogs：在 `site.ts` 的 `notes` 加一条，并加对应 `blog/{slug}.html`。

### Capabilities

标题：`The stack.`

不算产品，无 Live / Coming，无子页。三组：

| 组 | Name | One line |
|---|---|---|
| Applied | RPA | Automated ops across Xiaohongshu, WeChat, Reddit, YouTube. |
| Applied | AEO | Public acquisition — so models recommend the brand. |
| Applied | Digital humans | Generated presenters from video, speech, and voice clone. |
| Media | Video Gen | Image and video synthesis. |
| Media | ASR | Speech to text. |
| Media | TTS | Text to speech. |
| Media | Voice Clone | A voice that can be reused. |
| Foundation | Ontology | The model underneath. |

不对标竞品名（含 HeyGen）。不写后训练（本版未点名）。

### Company

无大标题宣言。Chairman 在左。无序列表，不用完整句子。Co-founded，不用 Founded。

**Jimmy Xu**  
Co-Founder & Chairman of the Board

- Hong Kong Baptist University (Zhuhai Campus), Computer Science
- Co-founded CPH4 and Kuaizengji
- SunnyOJ, an online judge platform
- Product and strategy

**Jason Guo**  
Co-Founder & CEO

- Hong Kong University of Science and Technology (Guangzhou), Artificial Intelligence
- Co-founded CPH4 and Kuaizengji
- Research and finance

职责分工：徐赫铖 — 产品与战略；郭骐畅 — 研究与金融业务。

### Careers

```
Small teams.
You ship.

High agency. Leverage, not headcount.
Write to us  →  mailto:nemoarce2007@gmail.com?subject=Careers
```

有真实岗位后再加条目。空招聘墙比没有更差。

加 JD：在 `site.ts` 的 `jobs` 加一条，并加 `careers/{slug}.html`（`data-job="{slug}"`，结构同产品介绍页）。Vite 会扫 `careers/*.html`。

---

## 7. 不上官网（红线）

从创始人成长路径与产品内部纪要里读到、但明确不外露：

- 年龄
- 第一段创业失败的产品名
- 小学 / 早期交易与量化细节
- 奖项堆叠、家庭、内部评价
- 快增绩 2.0 停运与迁移计划
- 对标竞品名称
- 陶然项目的获客与数据采集手法
- Verdict 定价、拆分后的三条业务线
- 量化与链上套利
- 未启动的医疗、生物制药、企业级智能体组织
- 哈夫克 / 超国家主体叙事

年龄对部分早期资方是故事，对合作方和严肃人才会把母站读成学生项目。Palantir / Anysphere 从不在站上写年龄。

---

## 8. 实现备注

- 实现：`index.html` / `styles.css` / `main.ts` / `page.ts` / `site.ts` / `world.ts`。主页 `SECTION_COUNT = 5`。内页共用线框世界，定在 Products 焦点。
- 视觉：黑白线框世界、Orbitron；主页单页原生滚动，背景 canvas 固定，ScrollTrigger 把滚动进度映射到世界 zoom/focus。
- 本版已做移动端适配：去掉 `min-width: 1100px`，`max-width: 1099px` 单列 + 汉堡导航，触屏 tap 切换详情。
- `dist/` 若用于 `file://` 预览，改完需重新 `npm run build`。

---

## 9. 材料来源

讨论中读过、但只抽取对外可用事实：

- [徐赫铖成长路径（Jimmy Xu）](https://ccnqm2vlujb3.feishu.cn/wiki/PJ8wwmVgliwI4ykXG4lclTQanTR)
- [郭骐畅成长路径](https://ccnqm2vlujb3.feishu.cn/wiki/JY7zw873ZiDr1gkoXFtc0SRynae)
- [快增绩 3.0 讨论纪要](https://ccnqm2vlujb3.feishu.cn/docx/VOVkdYmBVo4GkDxT25WcFlv7nRb)
- [陶然 AI 智能体启动纪要](https://ccnqm2vlujb3.feishu.cn/docx/I4Fddmq00olOTCxslVvcyCp8n8c)
