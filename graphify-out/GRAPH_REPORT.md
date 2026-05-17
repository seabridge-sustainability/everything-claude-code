# Graph Report - .  (2026-05-17)

## Corpus Check
- 6854 files · ~16,671,140 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 140189 nodes · 272251 edges · 2779 communities detected
- Extraction: 65% EXTRACTED · 35% INFERRED · 0% AMBIGUOUS · INFERRED: 95428 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `Constraint` - 1959 edges
2. `CardSource` - 1936 edges
3. `Session` - 1861 edges
4. `ConstraintType` - 1764 edges
5. `Candidate` - 1605 edges
6. `ReplSkin` - 1574 edges
7. `SettingsManager` - 1123 edges
8. `NewsCard` - 1025 edges
9. `BaseSearchEngine` - 839 edges
10. `BaseRecommender` - 751 edges

## Surprising Connections (you probably didn't know these)
- `Resources associated with research projects.` --uses--> `ResearchStatus`  [INFERRED]
  external\local-deep-research\src\local_deep_research\database\models\research.py → external\local-deep-research\src\local_deep_research\constants.py
- `Research history table.     Tracks research sessions and their progress.` --uses--> `ResearchStatus`  [INFERRED]
  external\local-deep-research\src\local_deep_research\database\models\research.py → external\local-deep-research\src\local_deep_research\constants.py
- `Singleton class for managing SocketIO connections and subscriptions.` --uses--> `ResearchStatus`  [INFERRED]
  external\local-deep-research\src\local_deep_research\web\services\socket_service.py → external\local-deep-research\src\local_deep_research\constants.py
- `Args:             app: The Flask app to bind this service to. It must be specif` --uses--> `ResearchStatus`  [INFERRED]
  external\local-deep-research\src\local_deep_research\web\services\socket_service.py → external\local-deep-research\src\local_deep_research\constants.py
- `Initializes the singleton instance.          Args:             app: The app t` --uses--> `ResearchStatus`  [INFERRED]
  external\local-deep-research\src\local_deep_research\web\services\socket_service.py → external\local-deep-research\src\local_deep_research\constants.py

## Communities

### Community 0 - "Community 0"
Cohesion: 0.0
Nodes (2561): enforce_business_rules(), enfore_business_rules(), enrich_response(), main(), Business Logic Validation:     Enforces max stay duration (e.g., max 14 days)., Callback fired before a tool is executed.     Enforces business logic: Max stay, Callback fired after a tool execution.     Enriches response for successful boo, Post-Processing & Enrichment:     Adds loyalty points information to successful (+2553 more)

### Community 1 - "Community 1"
Cohesion: 0.0
Nodes (4446): AdaptiveDecompositionStrategy, Adaptive Decomposition Strategy for step-by-step query analysis.  This strateg, Decide the next step based on current knowledge.          Args:             q, Types of steps in the adaptive process., Execute a specific step in the adaptive process.          Args:             s, Extract specific constraints and clues from the query.          Args:, Perform initial search based on extracted constraints.          Args:, Result from a single adaptive step. (+4438 more)

### Community 2 - "Community 2"
Cohesion: 0.0
Nodes (4649): WSGI middleware that strips the Server header from responses to     prevent inf, Custom Request class that spools large file uploads to disk.      This prevent, Create and configure the Flask application.      Returns:         tuple: (app, Check if IP is a private/local network address (RFC 1918 + localhost).      Th, WSGI middleware that adds the Secure flag to Set-Cookie iff the     request is, Apply middleware to the Flask app., Register blueprints with the Flask app., Register error handlers with the Flask app. (+4641 more)

### Community 3 - "Community 3"
Cohesion: 0.0
Nodes (4563): cli(), config(), config_delete(), config_get(), config_path(), config_set(), file(), file_upload() (+4555 more)

### Community 4 - "Community 4"
Cohesion: 0.0
Nodes (2245): BaseCard, CardSource, CardVersion, NewsCard, OverviewCard, Base card class for all news-related content. Following LDR's pattern from Base, Add a new version with research results, Get the most recent version of this card. (+2237 more)

### Community 5 - "Community 5"
Cohesion: 0.0
Nodes (1912): Factory function for Anthropic LLMs.          Args:             model_name: N, Check if this provider is available.          Args:             settings_snap, BaseSearchEngine, FullSearchResults, Fetch and attach full content to an existing list of items., Internal method to create LLM instance with provided parameters.          This, Check if this provider is available.          Args:             settings_snap, Check if this provider requires authentication for listing models.          Ov (+1904 more)

### Community 6 - "Community 6"
Cohesion: 0.0
Nodes (1695): ABC, create_access_token(), create_refresh_token(), _decode_subject_without_verification(), get_current_subject(), get_current_subject_allow_password_change(), _get_secret_for_subject(), is_desktop_access_token() (+1687 more)

### Community 7 - "Community 7"
Cohesion: 0.0
Nodes (1575): AccountLockoutManager, Clear the failure counter for *username* after a successful login., Track failed login attempts and lock accounts after a threshold., Return ``True`` if *username* is currently locked out., Remove expired/unlocked entries to reclaim memory.          Must be called whi, Record a failed login attempt for *username*., current_user(), get_current_db_session() (+1567 more)

### Community 8 - "Community 8"
Cohesion: 0.0
Nodes (1342): fetchInstallSource(), isUpdateInstallSource(), ApiProviderLogo(), apiProviderLogoSrc(), commitDelete(), handleDeleteThread(), useAttachmentSrc(), useFileSrc() (+1334 more)

### Community 9 - "Community 9"
Cohesion: 0.0
Nodes (741): activity_group(), activity_list(), Activity feed commands for SeaClip CLI., View the activity feed., List recent activity., agent_group(), agent_list(), capabilitySeverity() (+733 more)

### Community 10 - "Community 10"
Cohesion: 0.0
Nodes (1474): ArxivDownloader, arXiv PDF and Text Downloader, Get full text content from arXiv PDF (with metadata from API)., Extract arXiv ID from URL., Downloader for arXiv papers with PDF and abstract/text support., Fetch abstract and metadata from arXiv API., Check if URL is from arXiv., Download content from arXiv. (+1466 more)

### Community 11 - "Community 11"
Cohesion: 0.0
Nodes (1166): AnthropicProvider, Anthropic LLM provider for Local Deep Research., Anthropic provider for Local Deep Research.      This is the official Anthropi, discover_providers(), get_available_discovered_provider_options(), get_discovered_provider_options(), get_provider_class(), ProviderDiscovery (+1158 more)

### Community 12 - "Community 12"
Cohesion: 0.0
Nodes (1148): calculate_combined_score(), calculate_metrics(), calculate_quality_metrics(), calculate_resource_metrics(), calculate_speed_metrics(), evaluate_benchmark_quality(), measure_execution_time(), Unified metrics calculation module.  This module provides functions for calcul (+1140 more)

### Community 13 - "Community 13"
Cohesion: 0.0
Nodes (1159): BaseException, LDRClient, quick_query(), Get headers with CSRF token for API requests., Research a topic using LLMs and search engines.          This method runs a re, Wait for research to complete and get results.          Use this after startin, Get current user settings., Update a setting.          Args:             key: Setting key (e.g., "llm.mod (+1151 more)

### Community 14 - "Community 14"
Cohesion: 0.0
Nodes (1097): auth_db_session(), dispose_auth_engine(), get_auth_db_path(), get_auth_db_session(), _get_auth_engine(), init_auth_database(), Authentication database initialization and management. This manages the central, Initialize the authentication database if it doesn't exist.      Uses SQL-leve (+1089 more)

### Community 15 - "Community 15"
Cohesion: 0.0
Nodes (1033): _disable_fk_for_migration(), _drop_orphan_alembic_temp_tables(), get_alembic_config(), get_current_revision(), get_head_revision(), get_migrations_dir(), needs_migration(), Programmatic Alembic migration runner for per-user encrypted databases.  This (+1025 more)

### Community 16 - "Community 16"
Cohesion: 0.01
Nodes (938): api_access_control(), api_analyze_documents(), api_documentation(), api_generate_report(), api_quick_summary(), api_quick_summary_test(), apiRouter(), authFetch() (+930 more)

### Community 17 - "Community 17"
Cohesion: 0.0
Nodes (968): categorize(), main(), Bucket a passthrough journal_ref into a category., BaseFilter, Abstract base class for all search result filters., Initialize the filter.          Args:             model: The language model t, BaseFilter, Cross-engine search result filter implementation. (+960 more)

### Community 18 - "Community 18"
Cohesion: 0.0
Nodes (927): _anthropic_image_block_to_openai_part(), anthropic_messages_to_openai(), anthropic_tool_choice_to_openai(), anthropic_tools_to_openai(), AnthropicPassthroughEmitter, AnthropicStreamEmitter, build_anthropic_sse_event(), Convert Anthropic tool definitions to OpenAI function-tool format. (+919 more)

### Community 19 - "Community 19"
Cohesion: 0.0
Nodes (629): backend_capability_stale_reason(), backend_desktop_auth_status(), backend_desktop_owner_match(), backend_health(), backend_root_status(), BackendHealth, BackendRootStatus, DesktopLoginProbe (+621 more)

### Community 20 - "Community 20"
Cohesion: 0.0
Nodes (915): get_account_lockout_manager(), Per-user account lockout after repeated failed login attempts.  Complements th, Return the module-level singleton ``AccountLockoutManager``., AttentionConfig, AttentionContext, Run attention using config / context info.      Backend choice is prioritized fo, Per-layer attention metadata.      NOTE(djsaunde): I had originally intended thi, Per-call info required to run attention. (+907 more)

### Community 21 - "Community 21"
Cohesion: 0.0
Nodes (760): BaseExporter, ExportOptions, ExportResult, Generate a safe filename from the title.          Args:             title: Op, Prepend title as H1 heading if content doesn't already have one.          This, Result of an export operation., Common options for all exporters.      Attributes:         title: Optional do, Abstract base class for document exporters.      All exporters must inherit fr (+752 more)

### Community 22 - "Community 22"
Cohesion: 0.0
Nodes (769): get_llm(), optimize_query_for_arxiv(), print_comparison(), Initialize an LLM for query optimization. Supports Ollama, OpenAI and Gemini for, Use a LLM to convert a natural language question into an optimized arXiv search, Run a search against arXiv and return the top results.      Uses the arxiv lib, Run a search using the real LDR ArXivSearchEngine., Print a readable side-by-side comparison of raw vs optimized results.      Ret (+761 more)

### Community 23 - "Community 23"
Cohesion: 0.0
Nodes (600): BaseRatingSystem, QualityRating, QualityRatingSystem, Base class for rating systems. Following LDR's pattern from BaseSearchStrategy., Get recent ratings by a user.          Args:             user_id: ID of the u, Get aggregated ratings for a card.          Args:             card_id: ID of, Remove a user's rating for a card.          Args:             user_id: ID of, Create a standard rating record.          Helper method for subclasses to crea (+592 more)

### Community 24 - "Community 24"
Cohesion: 0.0
Nodes (663): AudioCodecManager, _numpy_to_wav_bytes(), Decode SNAC tokens (Orpheus) into WAV bytes.          generated_ids: full model, Decode CSM output (already a waveform from model.generate(output_audio=True))., Decode BiCodec tokens (Spark-TTS) from generated text.         Extracts bicodec_, Convert a float32 numpy waveform to WAV bytes (16-bit PCM)., Decode DAC tokens (OuteTTS) from generated text.         Extracts c1_N and c2_N, Unified decode — dispatches to the right codec decoder. (+655 more)

### Community 25 - "Community 25"
Cohesion: 0.0
Nodes (583): BackgroundJobScheduler, DocumentSchedulerSettings, Tests for DocumentSchedulerSettings dataclass.  Note: More comprehensive tests, Tests for the DocumentSchedulerSettings frozen dataclass., Dataclass has correct default values., Dataclass accepts custom values., Dataclass accepts partial values with defaults for the rest., Frozen dataclass raises FrozenInstanceError on mutation. (+575 more)

### Community 26 - "Community 26"
Cohesion: 0.0
Nodes (447): DataSanitizer, Utility class for removing sensitive information from data structures., Behavioral tests for data_sanitizer module.  Tests the DataSanitizer class whi, Tests for sanitizing basic dictionaries., API_KEY in uppercase is removed., Api_Key in mixed case is removed., PASSWORD in uppercase is removed., Secret capitalized is removed. (+439 more)

### Community 27 - "Community 27"
Cohesion: 0.0
Nodes (506): connect(), connect_all(), MCPClient, MCPClientError, MCPClientManager, Thin wrapper around requests for WireMock admin API calls., Initialize the MCP session with retry logic for subprocess startup race., List available tools on the connected server.          Returns:             L (+498 more)

### Community 28 - "Community 28"
Cohesion: 0.0
Nodes (517): BaseRetriever, KnowledgeAccumulationApproach, Search mode for filtering search engines., SearchMode, BusinessDocsRetriever, create_knowledge_base_retriever(), demonstrate_meta_search_config(), demonstrate_multiple_retrievers() (+509 more)

### Community 29 - "Community 29"
Cohesion: 0.0
Nodes (492): BaseBenchmarkEvaluator, BenchmarkDataset, DatasetRegistry, Extract main content text from HTML.          Args:             html: Raw or, Get the loaded examples, loading the dataset if needed.          Returns:, Base class for all benchmark datasets.      This abstract base class defines t, Extract the question from an example.          This method may be overridden b, Extract the answer from an example.          This method may be overridden by (+484 more)

### Community 30 - "Community 30"
Cohesion: 0.01
Nodes (463): AtomicFactQuestionGenerator, Atomic fact question generator for complex queries. Decomposes complex queries, Generate questions to fill knowledge gaps or make connections., Generates questions by decomposing complex queries into atomic facts.      Thi, Generate atomic fact questions from a complex query.          Args:, Decompose complex query into atomic, searchable facts., BaseFollowUpQuestionGenerator, Base class for follow-up question generators.  This extends the standard quest (+455 more)

### Community 31 - "Community 31"
Cohesion: 0.01
Nodes (404): BaseFailure, FailureClassifier, PermanentFailure, RateLimitFailure, Failure Classification System with Inheritance  Provides base classes and spec, Classifies download failures into appropriate types based on error patterns, Classify a download failure based on error information.          Args:, Base class for all failure types with common functionality (+396 more)

### Community 32 - "Community 32"
Cohesion: 0.01
Nodes (403): api_add_resource(), api_delete_resource(), api_get_config(), api_get_resources(), api_research_status(), api_start_research(), api_terminate_research(), check_ollama_model() (+395 more)

### Community 33 - "Community 33"
Cohesion: 0.0
Nodes (467): Model for tracking active research processes per user.  As noted by djpetti: ", Track active research processes for each user.     Allows multiple concurrent r, UserActiveResearch, BaseEmbeddingProvider, create_dataset(), DataSource, fetch(), get_available_datasets() (+459 more)

### Community 34 - "Community 34"
Cohesion: 0.0
Nodes (522): _calculate_average_metrics(), compare_configurations(), _create_comparison_visualizations(), _create_metric_comparison_chart(), _create_pareto_chart(), _create_spider_chart(), _evaluate_single_configuration(), evaluateToolCall() (+514 more)

### Community 35 - "Community 35"
Cohesion: 0.01
Nodes (417): Bootstrap environment settings.  These settings are required early in the appl, Database configuration environment settings.  These settings control SQLite an, _create_registry(), get_env_setting(), is_ci_environment(), is_github_actions(), is_rate_limiting_enabled(), is_test_mode() (+409 more)

### Community 36 - "Community 36"
Cohesion: 0.01
Nodes (381): BaseCitationHandler, Base class for all citation handlers., Format sources with numbers for citation., Abstract base class for citation handlers., Get a setting value from the snapshot., Check if fact-checking is enabled and log the state once., Get formatted output instructions from settings if present.          This allo, Convert search results to LangChain documents format and add index         to o (+373 more)

### Community 37 - "Community 37"
Cohesion: 0.01
Nodes (360): Abstract base class for report storage backends., ReportStorage, calculate_duration(), DatabaseReportStorage, get_db_connection(), get_logs_for_research(), get_total_logs_for_research(), MetricsDatabase (+352 more)

### Community 38 - "Community 38"
Cohesion: 0.0
Nodes (525): api_key(), app(), auth_session(), authenticated_client(), AuthHelper, base_url(), binary_classification_data(), _BlockedSocket (+517 more)

### Community 39 - "Community 39"
Cohesion: 0.01
Nodes (272): NewsAnalyzer, News analyzer that produces modular output components. Breaks down news analysi, Extract structured news items from search results.          Args:, Generate the big picture summary of how events connect.          Args:, Analyzes news search results to produce modular components.      Instead of on, Generate list of developments to watch for in next 24-48 hours.          Args:, Identify emerging patterns from today's news.          Args:             news, Initialize the news analyzer.          Args:             llm_client: LLM clie (+264 more)

### Community 40 - "Community 40"
Cohesion: 0.01
Nodes (390): check(), main(), _apply_transform(), _best_axis_corner(), _brush_offsets(), build_parser(), _camera_basis(), CameraView (+382 more)

### Community 41 - "Community 41"
Cohesion: 0.01
Nodes (289): _dispose_global_cache(), get_search_cache(), normalize_entity_query(), Search Cache Utility Provides intelligent caching for search results to avoid r, Generate hash for query + search engine + username combination.          Incor, Remove expired entries from database., Evict least recently used items from memory cache., Get cached search results for a query.          Args:             query: Sear (+281 more)

### Community 42 - "Community 42"
Cohesion: 0.01
Nodes (260): BaseLoader, extract_text_from_bytes(), load_from_bytes(), Load documents from bytes content.  This module provides functions to load doc, Extract text from bytes content.      This is a convenience function that load, Load documents from bytes content.      This function writes the bytes to a te, extract_strings_from_json(), extract_text_from_json() (+252 more)

### Community 43 - "Community 43"
Cohesion: 0.01
Nodes (285): GitHubSearchEngine, Optimize the GitHub search query using LLM to improve search results., Perform a GitHub search based on the configured search type.          Args:, GitHub search engine implementation.     Provides search across GitHub reposito, Get README content for a repository.          Args:             repo_full_nam, Get recent issues for a repository.          Args:             repo_full_name, Get content of a file from GitHub.          Args:             file_url: API U, Initialize the GitHub search engine.          Args:             max_results: (+277 more)

### Community 44 - "Community 44"
Cohesion: 0.01
Nodes (298): _assembly_node(), _assembly_root_node(), AssemblyCompositionError, build_linked_assembly_composition(), build_native_assembly_composition(), _children_by_parent(), _clone_native_source_node(), component_name() (+290 more)

### Community 45 - "Community 45"
Cohesion: 0.01
Nodes (224): apply_middleware(), create_app(), create_database(), DiskSpoolingRequest, _is_private_ip(), register_blueprints(), register_error_handlers(), SecureCookieMiddleware (+216 more)

### Community 46 - "Community 46"
Cohesion: 0.01
Nodes (196): High-value tests for findings module: topic.py and repository.py.  Covers Topi, link_topics creates bidirectional relationships., Linking twice doesn't create duplicate relationships., Root topics have no parent., Merging combines sources and removes topic2., Test format_links helper function., Test FindingsRepository CRUD operations., String finding is converted to dict. (+188 more)

### Community 47 - "Community 47"
Cohesion: 0.01
Nodes (221): _check_response_size(), _install_body_guard(), _parse_retry_after(), Safe HTTP Requests Wrapper  Wraps requests library to add SSRF protection and, Determine HTTP method after redirect, per RFC 7231., Make a safe HTTP GET request with SSRF protection.      Args:         url: UR, Make a safe HTTP POST request with SSRF protection.      Args:         url: U, Session with built-in SSRF protection.      Redirect validation relies on ``re (+213 more)

### Community 48 - "Community 48"
Cohesion: 0.01
Nodes (158): Service for calculating relevance and trending scores., Personalize a feed of cards based on user preferences.          Args:, Calculate relevance score for a card based on user preferences.          Args:, Calculate trending score based on impact and engagement.          Args:, Filter and sort cards by trending score.          Args:             cards: Li, RelevanceService, _make_card(), Deep behavioral tests for RelevanceService. Tests relevance scoring, trending c (+150 more)

### Community 49 - "Community 49"
Cohesion: 0.01
Nodes (308): block_external_conflict(), build_replay_command(), build_split_capture_command(), build_unified_command(), check_health(), check_health_inner(), check_watchdog_health(), command_test_backend() (+300 more)

### Community 50 - "Community 50"
Cohesion: 0.01
Nodes (238): _install_thread_excepthook(), main(), Install a global hook that loudly logs uncaught exceptions on any     thread —, Entry point for the web application when run as a command.     This function is, add_to_broadcast(), broadcast_all_panes(), clear_broadcast(), get_broadcast_domains() (+230 more)

### Community 51 - "Community 51"
Cohesion: 0.01
Nodes (196): NewsSearchCallback, Callback handler for search system integration.     Tracks searches for news pe, Process a search completion.          Args:             query: The search que, Track a user search for personalization.          Args:             search_id, Calculate quality score for search results.          Args:             result, Deep behavioral tests for NewsSearchCallback and search integration. Tests qual, Content check looks at only the first 5 findings., Tests for the callback invocation. (+188 more)

### Community 52 - "Community 52"
Cohesion: 0.01
Nodes (224): BulkDeletionService, CollectionDeletionService, delete_collection(), delete_collection_index(), delete_document(), delete_document_blob(), delete_documents_blobs_bulk(), delete_documents_bulk() (+216 more)

### Community 53 - "Community 53"
Cohesion: 0.01
Nodes (211): _normalize_list(), Initialize the SearXNG search engine with ethical usage patterns.          Arg, Acceptable settings for safe search., Apply self-imposed rate limiting between requests, Get search results from SearXNG with ethical rate limiting.          Args:, SearXNG search engine implementation that requires an instance URL provided via, Get preview information for SearXNG search results.          Args:, Get full content for the relevant search results.          Args: (+203 more)

### Community 54 - "Community 54"
Cohesion: 0.01
Nodes (263): GitHubAuthError, GitHubClient, RateLimitError, Distinguish auth failures from rate limiting on 401/403 responses.          - 40, Raised when GitHub returns 401/403 due to invalid or insufficient credentials., _retry_after_seconds(), GitHubRepoSeedReader, _lookup_cached_scrape() (+255 more)

### Community 55 - "Community 55"
Cohesion: 0.01
Nodes (198): InterceptHandler, Intercepts logging messages and forwards them to Loguru's logger., clear_queue(), _format_outputs(), get_history(), get_prompt_history(), get_queue_status(), interrupt() (+190 more)

### Community 56 - "Community 56"
Cohesion: 0.01
Nodes (189): GuardianSearchEngine, Enhanced Guardian API search engine implementation with LLM query optimization, Adapt date range based on query type (historical vs current).          Args:, Perform adaptive search that progressively adjusts parameters based on results., Get all article data from The Guardian API in a single call.         Always req, Initialize The Guardian search engine with enhanced features.          Args:, Get preview information for Guardian articles with enhanced optimization., Get full content for the relevant Guardian articles.         Restores full cont (+181 more)

### Community 57 - "Community 57"
Cohesion: 0.01
Nodes (219): classify_events(), NewQueryClassifier(), _parse_classification(), QueryClassification, QueryClassifier, QueryType, Classify tool calls against compliance steps using LLM., Classify which tool calls match which compliance steps.      Returns {step_id: (+211 more)

### Community 58 - "Community 58"
Cohesion: 0.01
Nodes (306): add_assembly_constraint(), add_part_to_assembly(), add_simulation_step(), collapse_assembly(), create_assembly(), create_simulation(), degrees_of_freedom(), explode_assembly() (+298 more)

### Community 59 - "Community 59"
Cohesion: 0.01
Nodes (181): FollowUpContextHandler, Follow-up Context Manager  Manages and processes past research context for fol, Extract key entities from past research.          Args:             research_, Create a targeted summary of past research relevant to the follow-up question., Manages past research context for follow-up research.      This class handles:, Extract metadata from past research.          Args:             research_data, Create a concise summary of findings for external use (e.g., in prompts)., Shared summary generation logic.          Args:             findings: Researc (+173 more)

### Community 60 - "Community 60"
Cohesion: 0.01
Nodes (289): analyze_findings(), demonstrate_batch_research(), demonstrate_export_formats(), demonstrate_keyword_extraction(), demonstrate_report_generation(), demonstrate_result_analysis(), extract_citations(), extract_concepts() (+281 more)

### Community 61 - "Community 61"
Cohesion: 0.01
Nodes (139): _public_dns_mock(), SSRF Validator Tests  Tests for the SSRF (Server-Side Request Forgery) protect, Scheme-relative URLs use '?' as the scheme sentinel., urllib3 rejects malformed IPv6 brackets and out-of-range         ports; helper, End-to-end: validate_url's rejection log must not contain the         password, Non-http(s) schemes must be rejected outright (not just the host check)., Public IPs should not be blocked., Schemes are case-insensitive per RFC 3986. (+131 more)

### Community 62 - "Community 62"
Cohesion: 0.01
Nodes (160): DomainClassifier, Close the LLM client if one was created., Get sample resources from a domain.          Args:             domain: Domain, Build prompt for LLM classification.          This method uses actual content, Classify a single domain using LLM.          Args:             domain: Domain, Classify all unique domains in the database.          Args:             force, Get existing classification for a domain.          Args:             domain:, Get all domain classifications.          Returns:             List of all Dom (+152 more)

### Community 63 - "Community 63"
Cohesion: 0.01
Nodes (194): ConfigurableLLM, create_configured_llm(), DomainExpertLLM, main(), Advanced example of custom LLM integration with Local Deep Research.  This exa, LLM that specializes in specific domains., Generate domain-specific response., Factory function that creates LLMs based on configuration. (+186 more)

### Community 64 - "Community 64"
Cohesion: 0.01
Nodes (169): ensure_default_library_collection(), ensure_research_history_collection(), get_default_library_id(), get_source_type_id(), _get_user_init_lock(), initialize_library_for_user(), Database initialization for Library - Unified Document Architecture.  This mod, Ensure the default "Library" collection exists for a user.     Creates it if it (+161 more)

### Community 65 - "Community 65"
Cohesion: 0.01
Nodes (154): buildSessionRecord(), getAllSessions(), getMatchingSessionCandidates(), getSessionById(), getSessionCandidates(), getSessionContent(), getSessionStats(), getSessionTitle() (+146 more)

### Community 66 - "Community 66"
Cohesion: 0.01
Nodes (173): _generate_combined_css(), _get_themes_from_registry(), Tests for the multi-theme system.  These tests ensure: 1. All themes define a, RGB values should be in 'R, G, B' format (no parentheses)., Test color value consistency across themes., Success colors should be in the green spectrum., Error colors should be in the red spectrum., RGB variants should match their hex counterparts. (+165 more)

### Community 67 - "Community 67"
Cohesion: 0.01
Nodes (177): append_command_history(), build_session_payload(), changes(), clear_doc(), clear_node(), cli(), create_child(), daily() (+169 more)

### Community 68 - "Community 68"
Cohesion: 0.01
Nodes (170): app(), client(), mock_login_required(), mock_user_context(), Comprehensive tests for news/flask_api.py - Phase 3.1 Coverage Expansion  Test, Test handling of ConnectionError., Test handling of unicode characters in error message., Extended tests for get_user_id function. (+162 more)

### Community 69 - "Community 69"
Cohesion: 0.01
Nodes (147): ElasticsearchManager, Elasticsearch utilities for indexing and managing documents., Utility class for managing Elasticsearch indices and documents.      This clas, Delete an Elasticsearch index.          Args:             index_name: Name of, Index a single document in Elasticsearch.          Args:             index_na, Bulk index multiple documents in Elasticsearch.          Args:             in, Index a file in Elasticsearch, extracting text content and metadata., Initialize the Elasticsearch manager.          Args:             hosts: List (+139 more)

### Community 70 - "Community 70"
Cohesion: 0.01
Nodes (156): AssertionError, breakpoint_delete(), breakpoint_disable(), breakpoint_enable(), breakpoint_group(), breakpoint_list(), breakpoint_set(), _cleanup() (+148 more)

### Community 71 - "Community 71"
Cohesion: 0.01
Nodes (119): MCPSearchStrategy, _make_strategy(), Pure-logic tests for MCPSearchStrategy helper methods.  Tests _to_bool, _build, Verify engine name extraction from class name., Verify string-to-bool conversion handling., Verify argument sanitization logic., Build a minimal Mock for MCPSearchStrategy., Verify OpenAI-style schema generation from tool dicts. (+111 more)

### Community 72 - "Community 72"
Cohesion: 0.01
Nodes (237): _apply_draw_ops(), _apply_filters(), _apply_sepia(), _apply_single_effect(), _apply_single_filter(), _apply_track_effects(), _apply_wsl_sudo_patch(), batch_export() (+229 more)

### Community 73 - "Community 73"
Cohesion: 0.01
Nodes (93): Validate temperature parameter., Raised when parameter validation fails., _validate_temperature(), ValidationError, Coverage tests for local_deep_research/mcp/server.py  Focuses on branches NOT, TestAnalyzeDocumentsValidation, TestBuildSettingsOverrides, TestClassifyError (+85 more)

### Community 74 - "Community 74"
Cohesion: 0.01
Nodes (136): Format Wayback Machine timestamp into readable date, Get snapshots from the Wayback Machine for a specific URL.          Args:, Internet Archive Wayback Machine search engine implementation     Provides acce, Get preview information for Wayback Machine snapshots.          Args:, Remove boilerplate using the shared extraction pipeline., Retrieve content from a Wayback Machine URL.          Args:             url:, Get full content for the relevant Wayback Machine snapshots.          Args:, Initialize the Wayback Machine search engine.          Args:             max_ (+128 more)

### Community 75 - "Community 75"
Cohesion: 0.01
Nodes (97): AdGuardHomeClient, AdGuardHome HTTP API client - wraps all REST calls to the real AdGuardHome servi, GET request - returns deserialized JSON or raw text., POST request - sends JSON body, returns deserialized response., HTTP client for the AdGuardHome REST API., blocked_services(), blocked_services_list(), blocked_services_set() (+89 more)

### Community 76 - "Community 76"
Cohesion: 0.01
Nodes (142): clear_llm_registry(), get_llm_from_registry(), is_llm_registered(), list_registered_llms(), LLMRegistry, Registry for custom LangChain LLMs.  This module provides a global registry fo, Register a custom LLM in the global registry.      Args:         name: Unique, Unregister a custom LLM from the global registry.      Args:         name: Na (+134 more)

### Community 77 - "Community 77"
Cohesion: 0.01
Nodes (129): _clean_wikinews_snippet(), Optimize a natural language query for Wikinews search.         Uses LLM to tran, Adapt the date range based on the query type (historical vs recent events)., Fetch search results from Wikinews API.          Args:             query (str, Process and filter a single search result.          Args:             result, Fetch full article content and publication date from Wikinews API.          Ar, Retrieve article previews from Wikinews based on the query.          Args:, Retrieve full content for relevant Wikinews articles.          Args: (+121 more)

### Community 78 - "Community 78"
Cohesion: 0.01
Nodes (123): _bnb_rocm_prerelease_url(), _bootstrap_uv(), _build_flash_attn_wheel_url(), _build_pip_cmd(), _build_uv_cmd(), _detect_rocm_version(), _dim(), download_file() (+115 more)

### Community 79 - "Community 79"
Cohesion: 0.01
Nodes (135): PaperlessSearchEngine, Make a request to the Paperless-ngx API.          Args:             endpoint:, Use LLM to expand query with relevant keywords and synonyms.          Args:, Paperless-ngx search engine implementation with full LDR integration., Perform multiple search passes with different strategies.          Args:, Get preview results from Paperless-ngx using multi-pass strategy.          Arg, Convert a Paperless-ngx document to LDR preview format.          Args:, Initialize the Paperless-ngx search engine.          Args:             api_ur (+127 more)

### Community 80 - "Community 80"
Cohesion: 0.02
Nodes (133): escapeHtml(), executivePosture(), executivePriorityFindings(), formatOwnerReviewDetail(), formatRuntimeConfidence(), formatTimestamp(), gradeMetadata(), inlineStyles() (+125 more)

### Community 81 - "Community 81"
Cohesion: 0.02
Nodes (121): BaseKnowledgeGenerator, Base class for knowledge extraction and generation., Validate the knowledge input.          Args:             knowledge: The knowl, Validate the source links.          Args:             links: List of source l, Base class for generating knowledge from text., Extract key points from knowledge.          Args:             knowledge: The, Initialize the knowledge generator.          Args:             model: The lan, Standard knowledge generator implementation. (+113 more)

### Community 82 - "Community 82"
Cohesion: 0.02
Nodes (150): clear_cache(), _get_cache_file_path(), _get_cache_key(), _get_default_configs(), _get_heuristic_configs(), get_or_autotune_moe_kernels(), is_autotuning_completed(), load_cached_config() (+142 more)

### Community 83 - "Community 83"
Cohesion: 0.01
Nodes (123): Tests for benchmarks/web_api/benchmark_routes.py  Tests cover: - start_benchm, Test getting results with limit parameter., Test getting results for nonexistent run., Extended tests for cancel benchmark endpoint., Test cancelling nonexistent benchmark., Extended tests for delete benchmark endpoint., Test deleting nonexistent benchmark., Tests that search_config captures LLM settings at benchmark start. (+115 more)

### Community 84 - "Community 84"
Cohesion: 0.01
Nodes (127): _mock_ref_db(), Tests for metrics_routes module - Metrics dashboard endpoints., Same as above for ``?per_page=xyz``., Tests for /metrics/api/journal-data/status., Tests for POST /metrics/api/journal-data/download — the     rate-limited, CSRF-, A single authenticated POST either succeeds or is rejected         by CSRF/rate, Tests for /metrics/api/rate-limiting/current endpoint., CodeQL #7684 regression guard: the JSON body must be built         from structu (+119 more)

### Community 85 - "Community 85"
Cohesion: 0.01
Nodes (116): cpu_host(), _extract_sh_function_body(), macos_host(), nvidia_host(), Tests for AMD ROCm support across install pathways.  Verifies that ROCm detectio, Live checks that run on the actual host -- skip if no NVIDIA GPU., On an NVIDIA machine, get_torch_index_url should return a CUDA URL., Verify worker.py Mamba/SSM install logic on ROCm. (+108 more)

### Community 86 - "Community 86"
Cohesion: 0.01
Nodes (101): Behavioral tests for settings/manager module.  Tests pure functions: parse_boo, Strips whitespace from string values., Non-zero integers return True., Tests for _parse_json_value function., JSON array string is parsed into a list., JSON array string with \\r\\n (browser textarea) is parsed correctly., JSON object string is parsed into a dict., Already-parsed list is returned as-is. (+93 more)

### Community 87 - "Community 87"
Cohesion: 0.02
Nodes (68): BridgeMod, BridgeMod, BridgeMod, BridgeMod, BridgeMod, BridgeMod, deleteTrainingRun(), getTrainingRun() (+60 more)

### Community 88 - "Community 88"
Cohesion: 0.01
Nodes (77): Extended tests for the SSRF validator module.  Provides comprehensive coverage, Public IPv6 addresses are not blocked., Public IPv6 remains unblocked regardless of flags., Loopback addresses blocked by default, allowed via flags., Standard IPv4 loopback is blocked., Alternate IPv4 loopback address in 127/8 is blocked., End of IPv4 loopback range is blocked., IPv6 loopback ::1 is blocked. (+69 more)

### Community 89 - "Community 89"
Cohesion: 0.02
Nodes (105): Google search engine implementation using Serper API with two-phase approach, Get full content for the relevant search results.         Extends base implemen, Return list of temporary attribute names to clean up after run()., Initialize the Serper search engine.          Args:             max_results:, Get preview information from Serper API.          Args:             query: Th, SerperSearchEngine, _make_engine(), _mock_response() (+97 more)

### Community 90 - "Community 90"
Cohesion: 0.02
Nodes (92): get_permissions_policy(), _is_api_route(), Security headers middleware for Flask applications.  This module provides comp, Generate Content Security Policy header value.          Returns:, Configure and apply security headers to Flask responses.      Addresses securi, Add comprehensive security headers to Flask response.          Args:, Validate CORS configuration at startup to catch misconfigurations early., Initialize security headers middleware.          Args:             app (Optio (+84 more)

### Community 91 - "Community 91"
Cohesion: 0.02
Nodes (68): Deep behavioral tests for input validation patterns. Tests field validation, sc, Check if URL uses HTTPS., Extract host from URL., Tests for numeric validation patterns., Check if value is positive., Check if value is non-negative., Check if value is in range., Tests for string validation patterns. (+60 more)

### Community 92 - "Community 92"
Cohesion: 0.01
Nodes (108): flask_app(), Extended tests for news/flask_api.py  Tests cover: - safe_error_message() hel, Returns None when current_user returns None., Returns username when current_user returns a username., Tests for news_api_bp Blueprint., Blueprint news_api_bp is defined., Blueprint name is 'news_api'., Blueprint has /api url_prefix. (+100 more)

### Community 93 - "Community 93"
Cohesion: 0.01
Nodes (93): _make_setting(), Comprehensive coverage tests for settings_routes.py.  Targets uncovered code p, Duplicate settings get removed., GET /settings/api/warnings, GET /settings/api/ollama-status, GET /settings/api/bulk, GET /settings/api/search-favorites, PUT /settings/api/search-favorites (+85 more)

### Community 94 - "Community 94"
Cohesion: 0.03
Nodes (29): make_artifact(), make_checksums(), make_checksums_with_source(), make_host(), make_release(), mock_linux_runtime(), mock_windows_runtime(), Tests for binary selection logic in install_llama_prebuilt.py.  Covers: normaliz (+21 more)

### Community 95 - "Community 95"
Cohesion: 0.01
Nodes (104): app(), client(), Comprehensive tests for news/flask_api.py  Tests cover: - safe_error_message, Tests for error handling in endpoints., Test that endpoints exist and handle requests., Test getting user ID when not authenticated., Tests for news blueprint import., Test that news API blueprint exists. (+96 more)

### Community 96 - "Community 96"
Cohesion: 0.02
Nodes (106): Google search engine implementation using ScaleSerp API with caching support, Get full content for the relevant search results.         Extends base implemen, Return list of temporary attribute names to clean up after run()., Initialize the ScaleSerp search engine.          Args:             max_result, Get preview information from ScaleSerp API.          Args:             query:, ScaleSerpSearchEngine, _mock_response(), Tests for uncovered code paths in ScaleSerpSearchEngine.  Targets: - _get_pre (+98 more)

### Community 97 - "Community 97"
Cohesion: 0.01
Nodes (92): mock_model(), mock_search(), Tests for search_system_factory.py  Tests cover: - _get_setting helper functi, Test unknown strategy defaults to source-based., Tests for concurrent-dual-confidence strategy., Tests for constraint-parallel strategy., Tests for modular strategy., Tests for modular-parallel strategy. (+84 more)

### Community 98 - "Community 98"
Cohesion: 0.02
Nodes (59): Deep behavioral tests for configuration validation patterns. Tests setting vali, Tests for numeric range validation., Validate value is within range., Clamp value to range., Tests for configuration type validation., Tests for string length validation., Validate string length., Validate value is of expected type. (+51 more)

### Community 99 - "Community 99"
Cohesion: 0.02
Nodes (84): adapterById(), adjustDocsExampleFinding(), adjustFindingForSourceContext(), adjustPluginManifestFinding(), annotateFindingRuntimeConfidence(), applyFixes(), buildAccuracyRecommendations(), buildArtifactManifestEntries() (+76 more)

### Community 100 - "Community 100"
Cohesion: 0.02
Nodes (61): _auth_patches(), _auth_session(), authed_client(), Comprehensive tests for local_deep_research.news.flask_api endpoints.  These t, Tests for the /preferences endpoint., Tests for the /categories endpoint., Tests for the /subscription/folders GET endpoint., Tests for the POST /subscription/folders endpoint. (+53 more)

### Community 101 - "Community 101"
Cohesion: 0.01
Nodes (79): Tests for utilities/type_utils.py  Tests cover: - to_bool function with vario, Test integer 0 converts to False., Test positive integers convert to True., Test negative integers convert to True., Test None uses default False., Test None uses custom default True., Tests for to_bool function., Test empty string converts to False. (+71 more)

### Community 102 - "Community 102"
Cohesion: 0.03
Nodes (46): app(), _auth_client(), _build_mock_query(), _create_app(), _make_db_session(), _make_settings_mock(), _mock_db_manager(), Comprehensive coverage tests for rag_routes.py.  Exercises route handlers, hel (+38 more)

### Community 103 - "Community 103"
Cohesion: 0.02
Nodes (56): Deep behavioral tests for notification patterns. Tests notification creation, f, Tests for notification priority patterns., Get priority for notification type., Tests for notification content formatting., Format notification for display., Tests for notification creation patterns., Tests for notification content truncation., Truncate content to max length. (+48 more)

### Community 104 - "Community 104"
Cohesion: 0.02
Nodes (58): Deep behavioral tests for query building patterns. Tests SQL query construction, Tests for date range filter building., Build date range filter., Tests for basic query builder patterns., Build filter for relative date., Build a SELECT query., Tests for sort clause building., Build ORDER BY clause. (+50 more)

### Community 105 - "Community 105"
Cohesion: 0.02
Nodes (57): Deep behavioral tests for content formatting patterns. Tests markdown conversio, Tests for HTML sanitization patterns., Remove all HTML tags., Escape HTML special characters., Sanitize HTML keeping only allowed tags., Tests for markdown formatting patterns., Tests for date formatting patterns., Format date to string. (+49 more)

### Community 106 - "Community 106"
Cohesion: 0.02
Nodes (60): Deep behavioral tests for text processing patterns. Tests tokenization, stemmin, Collapse multiple whitespace to single space., Apply all normalizations., Tests for unicode normalization patterns., Remove diacritical marks., Keep only ASCII characters., Tests for basic tokenization patterns., Tests for stop word removal patterns. (+52 more)

### Community 107 - "Community 107"
Cohesion: 0.02
Nodes (52): Deep behavioral tests for storage interface contracts and patterns. Tests BaseS, Tests for card retrieval by user., Tests for storage ID generation., Tests for card versioning patterns., Tests for card archive/pin patterns., Tests for active subscription filtering., Tests for due subscription detection., Tests for refresh time update patterns. (+44 more)

### Community 108 - "Community 108"
Cohesion: 0.02
Nodes (60): Deep behavioral tests for state machine patterns. Tests state transitions, guar, Tests for news card state patterns., Get card state transitions., Tests for basic state machine patterns., Tests for research task state patterns., Get research state transitions., Create a simple state machine., Check if research can be retried. (+52 more)

### Community 109 - "Community 109"
Cohesion: 0.02
Nodes (87): Tavily search engine implementation with two-phase approach, Get full content for the relevant search results.         Extends base implemen, Initialize the Tavily search engine.          Args:             max_results:, Get preview information from Tavily Search.          Args:             query:, TavilySearchEngine, Tests for the TavilySearchEngine class.  Tests cover: - Initialization and co, Tests for Tavily domain filtering., Test that include_domains defaults to empty list. (+79 more)

### Community 110 - "Community 110"
Cohesion: 0.02
Nodes (83): Tests for database/thread_metrics.py., Test that get_session commits the session on successful exit., Test that initialization creates thread-local storage., Test that get_session rolls back on error., Test that get_session raises error when session creation fails., Tests for write_token_metrics method., Test that write_token_metrics creates a TokenUsage record., Tests for the global metrics_writer instance. (+75 more)

### Community 111 - "Community 111"
Cohesion: 0.02
Nodes (60): Deep behavioral tests for subscription scheduling patterns. Tests jitter calcul, Tests for date trigger configuration., Tests for next run time calculation., Calculate next run time from now., Tests for jitter calculation patterns., Tests for calculating next run from last refresh., Calculate next run based on last refresh time., Calculate random jitter within bounds. (+52 more)

### Community 112 - "Community 112"
Cohesion: 0.02
Nodes (52): _is_private(), _normalize(), Comprehensive coverage tests for url_utils.normalize_url.  Focuses on exhausti, Protocol-relative URLs starting with // are stripped then re-schemed., localhost and 127.0.0.1 should always get http://., Private IPs (10.x, 172.16-31.x, 192.168.x) should get http://., Public IPs and hostnames should get https://., IPv6 addresses in brackets. (+44 more)

### Community 113 - "Community 113"
Cohesion: 0.03
Nodes (135): _auto_snapshot(), _clean_for_api(), cli(), config_(), config_set(), config_show(), config_test(), _conn() (+127 more)

### Community 114 - "Community 114"
Cohesion: 0.01
Nodes (81): Extended tests for IntegratedReportGenerator - Research report generation.  Te, Structure item should have subsections key., Subsection should have name key., Subsection should have purpose key., Should parse section from numbered line., Should parse subsection from bullet line., Should handle subsection without purpose., Should filter out source-related sections. (+73 more)

### Community 115 - "Community 115"
Cohesion: 0.02
Nodes (57): Deep behavioral tests for caching patterns. Tests LRU cache, TTL cache, cache i, Put value in TTL cache., Tests for TTL cache cleanup patterns., Remove all expired entries., Tests for LRU cache patterns., Tests for cache key generation patterns., Generate cache key from arguments., Tests for cache key namespacing patterns. (+49 more)

### Community 116 - "Community 116"
Cohesion: 0.02
Nodes (54): Deep behavioral tests for error handling patterns. Tests error categorization,, Decide if error should be retried., Tests for exponential backoff patterns., Calculate exponential backoff delay., Calculate backoff without jitter., Tests for error categorization patterns., Tests for circuit breaker patterns., Create a circuit breaker. (+46 more)

### Community 117 - "Community 117"
Cohesion: 0.03
Nodes (71): _Invokable, _a2a_blocker(), _action_brief_prompt(), _action_priority(), AnthropicBriefClient, _auto_add_to_registry(), BriefClientProtocol, _clamp() (+63 more)

### Community 118 - "Community 118"
Cohesion: 0.01
Nodes (79): Extended tests for research_functions API - Programmatic research access.  Tes, Return should have questions key., Return should have sources key., Research ID should be auto-generated if not provided., Search context should have required fields., Tests for generate_report function., Output file parameter should be optional., Default searches per section should be 2. (+71 more)

### Community 119 - "Community 119"
Cohesion: 0.02
Nodes (34): Deep behavioral tests for news query detection heuristics. Tests the is_news_qu, Just 'news' in query without matching patterns is not detected., Tests for the JSON metadata parsing pattern from api.py:198-208., Reproduce metadata parsing from api.py., Tests for the has_news_metadata detection heuristic., Reproduce the has_news_metadata check from api.py:212-215., Dict input should be used directly, not serialized/deserialized., Tests for link extraction logic from api.py:332-379. (+26 more)

### Community 120 - "Community 120"
Cohesion: 0.02
Nodes (46): defaults(), Deep behavioral tests for scheduler.py pure logic. Tests default config, settin, Tests for singleton pattern logic., Test copy of DocumentSchedulerSettings., Tests for user session data structure.      Note: passwords are now stored in, Tests for user session update logic., Tests for jitter calculation in scheduling., Tests for getting jitter from config. (+38 more)

### Community 121 - "Community 121"
Cohesion: 0.02
Nodes (55): Deep behavioral tests for async operation patterns. Tests queue management, tas, Tests for task scheduling patterns., Create a scheduled task., Check if task is due for execution., Get all tasks that are due., Schedule a new task with delay., Tests for queue management patterns., Tests for recurring task patterns. (+47 more)

### Community 122 - "Community 122"
Cohesion: 0.02
Nodes (47): _classify_error(), _clean_globals(), find_blocked_keys(), Comprehensive tests for helper / pure-logic functions used by research_routes., Reimplementation of the error classification logic from     get_research_status, Tests for the error-type classification logic., Every classification result should have type, message, suggestion., Tests for calculate_duration helper. (+39 more)

### Community 123 - "Community 123"
Cohesion: 0.02
Nodes (79): Tests for llm_config module., Tests for wrapper handling string responses., Should handle string response from LLM., Should propagate exceptions from LLM invoke., Should return False when no API key., Tests for is_ollama_available function (delegates to OllamaProvider)., Should return True when OllamaProvider reports available., Should return False when OllamaProvider reports unavailable. (+71 more)

### Community 124 - "Community 124"
Cohesion: 0.02
Nodes (55): Deep behavioral tests for pagination patterns. Tests offset pagination, cursor, Tests for calculating visible page ranges., Calculate range of pages to display., Tests for building pagination result objects., Tests for offset-based pagination., Build pagination info object., Calculate offset for page., Tests for cursor-based pagination. (+47 more)

### Community 125 - "Community 125"
Cohesion: 0.02
Nodes (56): Deep behavioral tests for data aggregation patterns. Tests counting, summing, a, Calculate weighted average., Tests for min/max aggregation patterns., Get minimum value of a field., Get maximum value of a field., Find item with minimum field value., Find item with maximum field value., Tests for count aggregation patterns. (+48 more)

### Community 126 - "Community 126"
Cohesion: 0.02
Nodes (57): Deep behavioral tests for event processing patterns. Tests event creation, publ, Tests for event subscription patterns., Subscribe to an event type., Unsubscribe from an event type., Get handlers for an event type., Tests for event creation patterns., Tests for wildcard event subscription patterns., Check if event type matches subscription pattern. (+49 more)

### Community 127 - "Community 127"
Cohesion: 0.02
Nodes (52): Deep behavioral tests for rate limiting patterns. Tests token bucket, sliding w, Get remaining requests in window., Tests for sliding window counter pattern., Count requests in sliding window., Check if rate limited., Tests for token bucket rate limiting., Tests for fixed window rate limiting., Get current window key. (+44 more)

### Community 128 - "Community 128"
Cohesion: 0.02
Nodes (100): app(), _authed_get(), _authed_post(), _authenticated_client(), _create_test_app(), _make_db_ctx(), _make_setting(), _mock_auth() (+92 more)

### Community 129 - "Community 129"
Cohesion: 0.02
Nodes (76): DuckDuckGoSearchEngine, DuckDuckGo search engine implementation with two-phase retrieval, Get full content for the relevant items by using FullSearchResults.          A, Initialize the DuckDuckGo search engine.          Args:             max_resul, Get preview information (titles and snippets) for initial search results., Tests for the DuckDuckGoSearchEngine class.  Tests cover: - Initialization an, Tests for DuckDuckGo engine type identification., Test that engine type is properly set. (+68 more)

### Community 130 - "Community 130"
Cohesion: 0.02
Nodes (73): Behavioral tests for type_utils module.  Tests the to_bool function for boolea, String '0' returns False., String 'no' returns False., String 'off' returns False., Boolean True returns True., String 'disabled' returns False., Empty string returns False., Whitespace-only string returns False. (+65 more)

### Community 131 - "Community 131"
Cohesion: 0.02
Nodes (73): Extended tests for route_registry - Central documentation of all application rou, Route dict should have method key., Route dict should have path key., Route dict should have endpoint key., Route dict should have description key., Tests for ROUTE_REGISTRY structure., Route dict should have blueprint key., Should concatenate prefix with path. (+65 more)

### Community 132 - "Community 132"
Cohesion: 0.02
Nodes (49): Deep behavioral tests for card interaction patterns. Tests view tracking, votin, Tests for vote toggle behavior., Toggle vote from current to new., Tests for view interaction tracking., Tests for research interaction tracking., Record a research interaction., Record a view interaction., Tests for share interaction tracking. (+41 more)

### Community 133 - "Community 133"
Cohesion: 0.02
Nodes (74): Extended tests for BrowseCompAnswerDecoder - Answer decoding pipeline.  Tests, Tests for hexadecimal decoding., Should decode valid hex string., Should decode uppercase hex., Should decode lowercase hex., Odd length hex should fail., Tests for URL encoding decoding., Should decode URL encoded string. (+66 more)

### Community 134 - "Community 134"
Cohesion: 0.03
Nodes (23): Deep behavioral tests for news_analyzer.py pure logic methods. Tests _validate_, Tests for impact score summarization., Tests for news item validation logic., Tests for empty analysis structure., Tests for search result snippet preparation., Tests for parsing LLM watch-for bullet points., Tests for developing story filtering logic in generate_watch_for., Tests for category grouping used in generate_patterns. (+15 more)

### Community 135 - "Community 135"
Cohesion: 0.02
Nodes (74): BraveSearchEngine, Get preview information from Brave Search.          Args:             query:, Brave search engine implementation with two-phase approach, Initialize the Brave search engine.          Args:             max_results: M, Tests for the BraveSearchEngine class.  Tests cover: - Initialization and con, Mock BraveSearch to avoid needing an API key., Test that engine type is properly set., Initialize with unknown language defaults to English. (+66 more)

### Community 136 - "Community 136"
Cohesion: 0.02
Nodes (82): Extended tests for session security - Comprehensive session management coverage., Tests for session refresh token handling., Refresh token should be generated securely., Refresh token should be rotated on use., Refresh should extend session expiry., Tests for sliding session expiry., Session expiry should extend on activity., Tests for absolute session expiry. (+74 more)

### Community 137 - "Community 137"
Cohesion: 0.02
Nodes (28): Comprehensive coverage tests for json_utils and type_utils.  Tests every publi, Direct parse gives dict; bracket extraction for [] finds inner list., Plain list when dict expected and no inner dict exists., Paired tags, orphaned tags, no tags, empty input., ```json fences, plain ``` fences, no fences., ```json is checked before plain ```., Single ``` without a matching close returns original text., Dict brackets, list brackets, nested, no brackets. (+20 more)

### Community 138 - "Community 138"
Cohesion: 0.02
Nodes (82): Tests for research_routes module - Research page and API endpoints., Should return settings page when authenticated., Tests for /settings/main endpoint (now redirects via settings blueprint)., Should require authentication., Should redirect to settings dashboard., Tests for /settings/collections endpoint (now redirects via settings blueprint)., Should require authentication., Should redirect to settings dashboard. (+74 more)

### Community 139 - "Community 139"
Cohesion: 0.02
Nodes (35): Deep behavioral tests for API response building patterns. Tests response struct, Tests for list response with pagination., Tests for success response construction., Tests for subscription-specific response patterns., Tests for card-specific response patterns., Tests for feed-specific response patterns., Tests for statistics response patterns., Tests for scheduler status response patterns. (+27 more)

### Community 140 - "Community 140"
Cohesion: 0.02
Nodes (37): Deep behavioral tests for card_storage.py pure logic. Tests field mapping, sour, Tests for extracting source info from nested or flat data., Tests for title extraction from topic or title field., Tests for URL extraction., Tests for update field mapping patterns., Tests for _card_to_dict conversion., Tests for list filtering logic., Tests for category filtering. (+29 more)

### Community 141 - "Community 141"
Cohesion: 0.02
Nodes (50): Deep behavioral tests for data transformation patterns. Tests card serializatio, Tests for JSON serialization patterns., Convert data to JSON-safe dict., Tests for data normalization patterns., Normalize text fields., Tests for card to dict serialization., Tests for score normalization patterns., Normalize score to range. (+42 more)

### Community 142 - "Community 142"
Cohesion: 0.02
Nodes (29): Deep behavioral tests for subscription_manager/storage.py pure logic. Tests upd, Tests for next_refresh time calculation., Tests for subscription update field validation., Tests for refresh interval change triggering next_refresh update., Tests for list filtering logic patterns., Tests for due subscription detection., Tests for pause/resume status validation., Tests for stats increment patterns. (+21 more)

### Community 143 - "Community 143"
Cohesion: 0.02
Nodes (66): Tests for json_utils module., Test that .content attribute is extracted from response., Tests for extract_json function., Test parsing a pure JSON dict string., Test parsing a pure JSON list string., Test parsing nested JSON structures., Test extracting JSON from ```json code fences., Test extracting JSON from bare ``` code fences. (+58 more)

### Community 144 - "Community 144"
Cohesion: 0.02
Nodes (37): Deep behavioral tests for base_card.py pure logic. Tests CardSource, CardVersio, Tests for card interaction dictionary., Tests for updating interaction counts., Tests for CardSource dataclass structure., Tests for _extract_headline logic., Tests for _extract_summary logic., Tests for _calculate_impact score logic., Tests for _extract_topics logic. (+29 more)

### Community 145 - "Community 145"
Cohesion: 0.02
Nodes (70): Extended tests for CitationHandler - Configurable citation handler.  Tests cov, Should create forced answer handler for 'forced' type., Should accept 'forced_answer' alias., Should accept 'browsecomp' alias., Should create precision handler for 'precision' type., Should accept 'precision_extraction' alias., Should accept 'simpleqa' alias., Unknown handler type should fallback to standard. (+62 more)

### Community 146 - "Community 146"
Cohesion: 0.02
Nodes (68): Behavioral tests for data serialization patterns.  These tests verify the logi, Tests for JSON deserialization patterns., Test deserializing basic JSON types., Test deserializing datetime strings., Test deserializing with type conversion., Test handling missing fields with defaults., Test handling extra fields., Tests for JSON serialization patterns. (+60 more)

### Community 147 - "Community 147"
Cohesion: 0.02
Nodes (68): _AlwaysAuthenticated, app(), _bypass_login_required(), client(), Tests for news/web.py - Flask blueprint for news system web routes.  Tests cov, Tests for news_page route., Test that news page returns 200 status., Test that correct template is rendered. (+60 more)

### Community 148 - "Community 148"
Cohesion: 0.02
Nodes (37): Comprehensive coverage tests for url_utils.normalize_url and thread_context (se, Private IPs get http://., External / public hosts get https://., Empty string and whitespace edge cases., Protocol-relative //hostname format., Mock-based tests to force both branches of the private-ip decision., Bracketed IPv6 passes bracket-inclusive hostname to is_private_ip., set_search_context sets context and overwrites previous. (+29 more)

### Community 149 - "Community 149"
Cohesion: 0.02
Nodes (54): _patch_all_availability(), Comprehensive tests for provider availability functions and related helpers in, Edge-case coverage for is_ollama_available()., Edge-case coverage for is_openai_endpoint_available()., Edge-case coverage for is_lmstudio_available()., Edge-case coverage for is_llamacpp_available() — now HTTP-based., Returns True when LlamaCppProvider.is_available() returns True., Returns False when llama-server isn't reachable. (+46 more)

### Community 150 - "Community 150"
Cohesion: 0.02
Nodes (74): Behavioral tests for ssrf_validator module.  Tests the SSRF (Server-Side Reque, Link-local allowed with allow_private_ips=True (except AWS)., Tests for AWS metadata endpoint blocking., AWS metadata endpoint 169.254.169.254 is always blocked., 127.0.0.1 is blocked by default., Tests for public IP address handling., Public IPs are not blocked., Tests for IPv6 private address handling. (+66 more)

### Community 151 - "Community 151"
Cohesion: 0.02
Nodes (41): defaults(), DocumentSchedulerSettings, Deep behavioral tests for scheduler document processing patterns. Tests Documen, Tests for custom settings values., Tests for TTL cache pattern for settings., Pattern for cached settings retrieval., Test version of DocumentSchedulerSettings., Tests for cache invalidation patterns. (+33 more)

### Community 152 - "Community 152"
Cohesion: 0.03
Nodes (57): _fake_session_ctx(), _get_raw_run_research_process(), _make_research_mock(), Comprehensive coverage tests for research_service.py targeting uncovered code p, Test search error handling in run_research_process., Test LLM/search configuration error handling., Test the error handler within run_research_process., Error handler when no username -> cannot queue error update. (+49 more)

### Community 153 - "Community 153"
Cohesion: 0.03
Nodes (72): Get preview information from SerpAPI.          Args:             query: The s, Google search engine implementation using SerpAPI with two-phase approach, Initialize the SerpAPI search engine.          Args:             max_results:, SerpAPISearchEngine, mock_serpapi_wrapper(), Tests for the SerpAPISearchEngine class.  Tests cover: - Initialization and c, Initialize without API key raises ValueError., Test that engine is marked as public. (+64 more)

### Community 154 - "Community 154"
Cohesion: 0.03
Nodes (80): app(), _auth_client(), _build_mock_query(), _create_app(), _make_db_session(), _make_settings_mock(), _mock_db_manager(), Deep coverage tests for rag_routes.py targeting uncovered branches.  Covers: (+72 more)

### Community 155 - "Community 155"
Cohesion: 0.03
Nodes (40): _auth_session(), authed_client(), _mock_access_control(), Comprehensive tests for local_deep_research.web.api – REST API endpoints.  Cov, GET /api/v1/health – no auth required., Health check must be accessible without a session., GET /api/v1/ – requires auth + api_access_control., Tests exercising the api_access_control decorator paths. (+32 more)

### Community 156 - "Community 156"
Cohesion: 0.03
Nodes (35): Deep behavioral tests for search_subscription.py pure logic. Tests query transf, Tests for detecting if query needs transformation., Tests for YYYY-MM-DD placeholder replacement., Tests for evolve_query logic., Tests for get_statistics logic., Tests for query evolution count., Tests for statistics dictionary structure., Tests for to_dict data structure. (+27 more)

### Community 157 - "Community 157"
Cohesion: 0.02
Nodes (66): Behavioral tests for security patterns.  These tests verify the logic of secur, Test password similarity to username/email., Tests for token generation patterns., Test random token generation., Test URL-safe token generation., Test that generated tokens are unique., Test encoding expiry time in token., Test creating a signed token. (+58 more)

### Community 158 - "Community 158"
Cohesion: 0.02
Nodes (70): Tests for constrained search strategy extended functionality.  Tests cover: -, Tests for domain filtering constraints., Domain constraint filters results., Excluded domains are filtered out., Subdomains are handled correctly., Tests for date range filtering., Date range constraint filters results., Tests for constraint parsing. (+62 more)

### Community 159 - "Community 159"
Cohesion: 0.02
Nodes (68): Extended tests for RapidSearchStrategy - Optimized rapid search implementation., Snippet should have expected structure., Results without snippet should be skipped., Tests for follow-up question generation., Should generate follow-up questions., Should generate fewer questions for speed., Questions should be stored by iteration., Tests for final synthesis. (+60 more)

### Community 160 - "Community 160"
Cohesion: 0.02
Nodes (60): Tests for API research functions., Test that progress callback is set., Test that custom retrievers are registered., Test that custom LLMs are registered., Tests for _init_search_system function., Test that settings_snapshot is passed through., Tests for quick_summary function., Test that function returns a dictionary. (+52 more)

### Community 161 - "Community 161"
Cohesion: 0.02
Nodes (77): app(), _auth_session(), authed_client(), _common_patches(), _make_app(), Extra coverage tests for local_deep_research.news.flask_api.  Targets uncovere, Non-empty context string includes 'while <context>'., Branch coverage for _is_job_owned_by_user. (+69 more)

### Community 162 - "Community 162"
Cohesion: 0.03
Nodes (33): Deep behavioral tests for folder_manager.py pure logic. Tests folder update val, Tests for calculating next_refresh from last_refresh., Tests for handling subscriptions when deleting folder., Tests for folder update field validation., Tests for organizing subscriptions by folder., Tests for folder entry structure in result., Tests for _sub_to_dict mapping., Tests for datetime isoformat conversion patterns. (+25 more)

### Community 163 - "Community 163"
Cohesion: 0.02
Nodes (67): Extended tests for ArxivDownloader - arXiv paper downloading.  Tests cover: -, Should extract old format arXiv ID (category/NNNNNNN)., Should return None for invalid URLs., Tests for PDF URL construction., Should construct PDF URL from new format ID., Should construct PDF URL from old format ID., Tests for arXiv API URL construction., Should construct API URL for new format ID. (+59 more)

### Community 164 - "Community 164"
Cohesion: 0.02
Nodes (63): Behavioral tests for network_utils module.  Tests the is_private_ip function w, Tests for IPv4 loopback address detection., Cloudflare DNS is public., example.com IP is public., Tests for link-local IPv4 addresses., Link-local start is private., Localhost hostname is private., Link-local end is private. (+55 more)

### Community 165 - "Community 165"
Cohesion: 0.02
Nodes (53): _auth_session(), authed_client(), _make_classification(), _make_rate_limit_attempt(), _make_rate_limit_estimate(), _make_rating(), _make_resource(), _make_token_usage() (+45 more)

### Community 166 - "Community 166"
Cohesion: 0.03
Nodes (37): Deep behavioral tests for base_rater.py pure logic. Tests rating enums, validat, Tests for RelevanceRating enum values., Tests for _validate_rating_value base logic., Tests for QualityRatingSystem behavior., Tests for quality rating response structure., Tests for RelevanceRatingSystem behavior., Tests for relevance rating response structure., Tests for default method implementations. (+29 more)

### Community 167 - "Community 167"
Cohesion: 0.02
Nodes (58): Behavioral tests for search_utilities module.  Tests utility functions for pro, Nested-looking patterns are handled., Tests for extracting links from search results., Extracts title and URL from results., Paired <think>...</think> tags are removed., Extracts index from results., Strips whitespace from title and URL., Skips results with empty title. (+50 more)

### Community 168 - "Community 168"
Cohesion: 0.03
Nodes (64): extract_batch(), extract_text_and_metadata(), get_pdf_extraction_service(), PDFExtractionService, PDF text extraction service.  Provides efficient PDF text extraction with sing, Get the singleton PDF extraction service instance., Service for extracting text and metadata from PDF files., Comprehensive tests for PDFExtractionService. Tests PDF text extraction, metada (+56 more)

### Community 169 - "Community 169"
Cohesion: 0.02
Nodes (20): _make_preview_bundle(), _make_preview_session(), Tests for cli-hub — registry, installer, analytics, and CLI., Tests for the Click CLI interface., Tests for registry.py — fetch, cache, search, and lookup., Tests for preview bundle inspection and HTML rendering., Tests for installer.py — install, uninstall, tracking., Tests for uv-managed public CLI installs (e.g. generate-veo-video). (+12 more)

### Community 170 - "Community 170"
Cohesion: 0.03
Nodes (49): Deep behavioral tests for news filtering patterns. Tests category filtering, to, Tests for filtering by multiple topics., Filter items by multiple topics., Tests for category-based filtering., Tests for time-based filtering., Filter items from the last N hours., Filter items by category., Tests for date range filtering. (+41 more)

### Community 171 - "Community 171"
Cohesion: 0.03
Nodes (37): Deep behavioral tests for storage_manager.py pure logic. Tests InteractionType, Tests for extra fetching for filtering., Tests for VIEW interaction recording., Tests for InteractionType enum values., Tests for VOTE_UP interaction recording., Tests for VOTE_DOWN interaction recording., Tests for RESEARCH interaction recording., Tests for attaching metadata to interaction. (+29 more)

### Community 172 - "Community 172"
Cohesion: 0.02
Nodes (60): Comprehensive tests for news core utilities. Tests generate_card_id, generate_s, Test returns a datetime object., Test returned datetime has UTC timezone., Test returned time is close to current time., Test times are consistent and increasing., Tests for generate_card_id function., Test returned datetime is not naive., Tests for hours_ago function. (+52 more)

### Community 173 - "Community 173"
Cohesion: 0.02
Nodes (62): Behavioral tests for scheduling patterns.  These tests verify the logic of sch, Test cron expression aliases., Tests for interval-based scheduling., Test calculating next run time from interval., Test parsing interval string to seconds., Test adding jitter to interval., Tests for cron expression parsing., Test aligning time to interval boundary. (+54 more)

### Community 174 - "Community 174"
Cohesion: 0.03
Nodes (39): Deep behavioral tests for topic_based.py pure logic. Tests trending topics retr, Tests for interest boosting in filtering., Tests for default fallback topics., Tests for sorting topics by boost., Tests for complete preference filtering., Tests for _generate_topic_query., Tests for progress percentage calculation., Tests for max_recommendations default. (+31 more)

### Community 175 - "Community 175"
Cohesion: 0.02
Nodes (50): app(), Tests for web/auth/decorators.py  Tests cover: - login_required decorator -, Test authenticated user with DB connection succeeds., Nested API blueprints (e.g. /news/api/...) must return JSON 401,         not an, Nested /library/api/... paths must also return JSON 401., Stale-session case on a nested API path must return JSON 401,         not redir, Tests for login_required decorator., Minimal Flask app with routes using each error format. (+42 more)

### Community 176 - "Community 176"
Cohesion: 0.02
Nodes (68): Tests for web/routes/context_overflow_api.py  Tests cover: - get_context_over, Test 1 year period calculation., Test all time period has no date filter., Test that an invalid period value is normalized to 30d., Test that valid period values pass through unchanged., Tests for chart data formatting logic., Test basic chart data formatting., Unit tests for get_context_overflow_metrics logic. (+60 more)

### Community 177 - "Community 177"
Cohesion: 0.03
Nodes (53): Tests for the check-silent-cleanup pre-commit hook.  Ensures the hook correctl, Should allow except blocks that use logger.exception., Should allow any logger.* call., Should allow except blocks that re-raise., Should not flag handlers for specific exception types (e.g. OSError)., Should not inspect methods other than close()., A top-level function named close() should still be checked., close() with no try/except should pass cleanly. (+45 more)

### Community 178 - "Community 178"
Cohesion: 0.02
Nodes (66): Behavioral tests for url_utils module.  Tests the normalize_url function for U, 127.0.0.1:port gets http:// scheme., Tests for URLs that already have a scheme., Tests for private IP addresses., 10.x.x.x gets http:// scheme., 172.16.x.x gets http:// scheme., 192.168.x.x gets http:// scheme., Private IP with port gets http:// scheme. (+58 more)

### Community 179 - "Community 179"
Cohesion: 0.03
Nodes (43): _ctx(), _make_log_entry(), _make_milestone(), _make_research(), _mock_db_session(), Extra coverage tests for research_routes.py targeting remaining uncovered branch, No model configured → 400., OPENAI_ENDPOINT provider without custom_endpoint → 400. (+35 more)

### Community 180 - "Community 180"
Cohesion: 0.05
Nodes (36): _fake_settings(), _FakeDatasetType, _FakeStatus, _make_app(), _make_routed_query(), _patch_auth_and_db(), Coverage tests for benchmarks/web_api/benchmark_routes.py  Targets the uncover, datasets_config with valid structure but non-integer count. (+28 more)

### Community 181 - "Community 181"
Cohesion: 0.03
Nodes (37): Deep behavioral tests for api.py helper logic patterns. Tests response structur, Tests for limit parameter validation., Tests for success response dictionary structure., Tests for offset parameter validation., Tests for extracting user ID from session., Tests for subscription type validation., Tests for subscription status validation., Tests for refresh interval validation. (+29 more)

### Community 182 - "Community 182"
Cohesion: 0.02
Nodes (72): Extended tests for rate_limiter module - Comprehensive rate limiting coverage., Tests for per-endpoint rate limiting., Different endpoints should have separate limits., Unknown endpoints should use default limits., Tests for per-user rate limiting., Different users should have separate limits., Tests for sliding window rate limiting behavior., Anonymous users should fall back to IP-based limiting. (+64 more)

### Community 183 - "Community 183"
Cohesion: 0.02
Nodes (62): Tests for search favorites API endpoints in settings_routes.py., Should require favorites field in request., Tests for GET /settings/api/search-favorites endpoint., Should reject non-list favorites value., Should create new favorites setting if none exists., Should require authentication., Should update existing favorites setting., Should accept empty favorites list (clear all favorites). (+54 more)

### Community 184 - "Community 184"
Cohesion: 0.03
Nodes (70): _check_studio_venv(), _create_no_torch_venv(), _has_uv(), no_torch_venv(), Comprehensive E2E sandbox tests for PR #4624 (fix/install-mac-intel-no-torch)., Run Python code in a sandboxed interpreter., When NO_TORCH=True, overrides.txt and triton are skipped (source guard check)., Return the studio venv Python path, or None if not found. (+62 more)

### Community 185 - "Community 185"
Cohesion: 0.04
Nodes (27): _make_card(), Deep behavioral tests for relevance_service.py. Tests calculate_relevance scori, Create a mock card with configurable attributes., Tests for impact threshold effects., Tests for topic matching effects., Tests for score clamping to [0, 1]., Tests for calculate_relevance without user preferences., Tests for trending score calculation. (+19 more)

### Community 186 - "Community 186"
Cohesion: 0.03
Nodes (31): Deep behavioral tests for user session management patterns. Tests session stora, Tests for user session removal patterns., Tests for user session data structure., Tests for user activity tracking patterns., Tests for inactive session cleanup patterns., Tests for scheduled job tracking patterns., Tests for job count aggregation patterns., Tests for thread-safe access patterns. (+23 more)

### Community 187 - "Community 187"
Cohesion: 0.02
Nodes (50): make_host(), Comprehensive tests for PR #4562 bug fixes.  Tests cover:   - Bug 1: PS1 detache, When cmake --build fails on Metal, the fallback should re-configure and rebuild, build/bin should be searched before install_dir for .so files., When binary is directly in install_dir, no duplicate entries., Test setup.sh fragments via bash subprocess with controlled PATH., Bug 3: When cmake is missing, rm -rf should NOT run., Bug 3: When git is missing, rm -rf should NOT run. (+42 more)

### Community 188 - "Community 188"
Cohesion: 0.02
Nodes (61): Behavioral tests for data structure patterns.  These tests verify the logic of, Test finding value in tree., Tests for Trie (prefix tree) patterns., Test Trie insert and search., Tests for tree data structure patterns., Test Trie prefix search., Test in-order tree traversal., Test Trie autocomplete suggestions. (+53 more)

### Community 189 - "Community 189"
Cohesion: 0.04
Nodes (100): additive_box(), additive_cone(), additive_cylinder(), additive_helix(), additive_loft(), additive_pipe(), _additive_primitive(), additive_sphere() (+92 more)

### Community 190 - "Community 190"
Cohesion: 0.02
Nodes (50): GenDxfCliTests, GenStepAssemblyCliTests, GenStepPartCliTests, GenUrdfCliTests, mock_data_directory(), Tests for benchmarks/cli (benchmark_commands.py)  Tests cover: - setup_benchm, Test that simpleqa accepts custom examples., Test that simpleqa has default iterations of 3. (+42 more)

### Community 191 - "Community 191"
Cohesion: 0.02
Nodes (56): _clean_allow_registrations_env(), _default_typed_setting(), _env_typed_setting(), _mock_data_dir(), _passthrough_typed_setting(), Tests for server_config module.  Covers server configuration management for we, LDR_WEB_HOST env var should override default host., LDR_WEB_PORT env var should override default port. (+48 more)

### Community 192 - "Community 192"
Cohesion: 0.03
Nodes (33): Deep behavioral tests for exceptions.py pure logic. Tests exception structure,, Tests for base NewsAPIException structure., Tests for InvalidLimitException., Tests for SubscriptionNotFoundException., Tests for SubscriptionCreationException., Tests for SubscriptionUpdateException., Tests for SubscriptionDeletionException., Tests for DatabaseAccessException. (+25 more)

### Community 193 - "Community 193"
Cohesion: 0.02
Nodes (56): Tests for thread_context module., Should return a copy to prevent mutations., Multiple calls should return same data., Tests for thread isolation of context., Clear context before each test., Context should be isolated between threads., Each thread should have its own context., Tests for preserve_research_context decorator. (+48 more)

### Community 194 - "Community 194"
Cohesion: 0.04
Nodes (26): _auth(), _mock_db_session(), Comprehensive coverage tests for news/flask_api.py, TestCreateFolder, TestDeleteFolder, TestDeleteSubscription, TestErrorHandlers, TestGetActiveUsers (+18 more)

### Community 195 - "Community 195"
Cohesion: 0.02
Nodes (55): Behavioral tests for monitoring patterns.  These tests verify the logic of mon, Test metrics with labels., Tests for metrics collection patterns., Tests for health check patterns., Test basic health check., Test counter metric incrementing., Test dependency health check with timeout., Test readiness vs liveness probes. (+47 more)

### Community 196 - "Community 196"
Cohesion: 0.02
Nodes (70): _make_project(), patch_globals(), project_tree(), Tests for continuous-learning-v2 instinct-cli.py  Covers:   - parse_instinct_, Patch module-level globals to use tmp_path-based directories., Create project directory structure and return a project dict., Instincts without an 'id' field should be silently dropped., Tilde expansion should work. (+62 more)

### Community 197 - "Community 197"
Cohesion: 0.03
Nodes (27): Deep behavioral tests for rating_system/storage.py pure logic. Tests rating typ, Tests for quality rating average calculation., Tests for _get_rating_distribution logic., Tests for parsing rating values from strings., Tests for ratings summary structure., Tests for rating list filtering patterns., Tests for rating to dict mapping., Tests for create rating default values. (+19 more)

### Community 198 - "Community 198"
Cohesion: 0.04
Nodes (78): _APIScanner, _atomic_write_bytes(), cell_source(), cmd_all(), cmd_api(), cmd_colab_diff(), cmd_convert(), cmd_drift() (+70 more)

### Community 199 - "Community 199"
Cohesion: 0.03
Nodes (33): Deep behavioral tests for card_factory.py pure logic. Tests card type registry,, Tests for user_id handling during reconstruction., Tests for card type registration., Tests for topic handling during reconstruction., Tests for datetime parsing during reconstruction., Tests for card_type enum extraction during reconstruction., Tests for filter building in get_user_cards., Tests for create_news_card_from_analysis data mapping. (+25 more)

### Community 200 - "Community 200"
Cohesion: 0.02
Nodes (55): Behavioral tests for configuration patterns.  These tests verify the logic of, Test getting nested config value., Tests for environment variable handling., Test parsing environment variable values., Tests for configuration loading patterns., Test converting config key to env var name., Test expanding environment variables in strings., Test merging multiple configuration sources. (+47 more)

### Community 201 - "Community 201"
Cohesion: 0.06
Nodes (93): app(), app_enable_local_api(), app_launch(), app_ping(), app_status(), app_version(), _build_runtime_from_config(), _can_encode_for_stdout() (+85 more)

### Community 202 - "Community 202"
Cohesion: 0.03
Nodes (27): Deep behavioral tests for preference_manager/storage.py pure logic. Tests upser, Tests for adding items to liked list., Tests for preference creation default values., Tests for adding items to disliked list., Tests for item_type validation., Tests for preference embedding patterns., Tests for update field validation patterns., Tests for creating prefs when adding liked item. (+19 more)

### Community 203 - "Community 203"
Cohesion: 0.02
Nodes (33): Deep behavioral tests for edge cases across the news module. Tests boundary con, Tests for time boundary conditions., Tests for special string values., Tests for handling empty inputs., Tests for list edge cases., Tests for dictionary edge cases., Tests for number edge cases., Tests for datetime edge cases. (+25 more)

### Community 204 - "Community 204"
Cohesion: 0.04
Nodes (54): _canonical_skill_name(), _click_decorator_info(), CommandGroup, CommandInfo, _default_command_name(), _default_group_name(), Example, extract_cli_metadata() (+46 more)

### Community 205 - "Community 205"
Cohesion: 0.03
Nodes (87): _build_install_guard_script(), _extract_check_health_function(), _extract_install_sh_guard_block(), install.sh / install.ps1 must refuse to rm -rf an existing $STUDIO_HOME/unsloth_, install.ps1 must write the id at $StudioHome\\share\\studio_install_id     so th, A bare directory at $STUDIO_HOME/bin/unsloth must NOT pass the     sentinel. The, A symlink at $STUDIO_HOME/bin/unsloth (real installer artefact)     must still s, The Test-Path checks that gate Remove-Item $VenvDir must use     -PathType Leaf (+79 more)

### Community 206 - "Community 206"
Cohesion: 0.03
Nodes (24): Deep behavioral tests for api.py subscription management logic patterns. Tests, Tests for the field-by-field update pattern in update_subscription., Tests for subscription dict formatting in get_subscription., Mirror the subscription formatting from api.py get_subscription., Mirror the field update pattern from api.py update_subscription., Tests for the subscription list format from get_subscriptions., Mirror the subscription list formatting., Test the LIKE pattern used to count research runs. (+16 more)

### Community 207 - "Community 207"
Cohesion: 0.03
Nodes (27): Deep behavioral tests for base_preference.py pure logic. Tests default preferen, Tests for add_interest method logic., Tests for get_default_preferences structure., Tests for remove_interest method logic., Tests for ignore_topic method logic., Tests for boost_source method logic., Tests for TopicRegistry topic data structure., Tests for register_topic logic. (+19 more)

### Community 208 - "Community 208"
Cohesion: 0.02
Nodes (48): Date may differ based on timezone., Handles settings_manager returning None., Handles settings_manager returning empty string., Tests for generate_card_id function., Returns string in UUID format (36 characters with dashes)., Generates unique IDs on each call., Generated ID is a valid UUID., Tests for generate_subscription_id function. (+40 more)

### Community 209 - "Community 209"
Cohesion: 0.02
Nodes (53): Comprehensive tests for Flask API helper functions. Tests safe_error_message, g, Test blueprint has correct name., Test blueprint has /api prefix., Test returns a string., Tests for Flask error handlers., Test 400 error handler., Test 404 error handler., Test 500 error handler. (+45 more)

### Community 210 - "Community 210"
Cohesion: 0.03
Nodes (33): Deep behavioral tests for headline_generator.py pure logic. Tests headline gene, Tests for generate_headline main flow., Tests for findings length logging., Tests for max_length parameter handling., Tests for handling LLM response content., Tests for prompt structure requirements., Tests for LLM temperature setting., Tests for findings preview handling. (+25 more)

### Community 211 - "Community 211"
Cohesion: 0.02
Nodes (48): app(), Tests for web/auth/middleware_optimizer.py  Tests cover: - should_skip_databa, Should skip /auth/register., Should skip /auth/logout., Should skip OPTIONS requests regardless of path., Should skip OPTIONS on arbitrary paths., Should NOT skip /api/research., Should NOT skip POST to /api/research. (+40 more)

### Community 212 - "Community 212"
Cohesion: 0.04
Nodes (84): add_blank_to_playlist(), add_chain_to_bin(), _add_disabled_filter(), add_entry_to_playlist(), add_filter_to_element(), _add_prop(), _add_system_transitions(), add_track_to_tractor() (+76 more)

### Community 213 - "Community 213"
Cohesion: 0.03
Nodes (57): fresh_engine(), fully_migrated_engine(), _get_columns(), _get_indexes_by_name(), migrated_to_0004_engine(), Tests for migration 0005: Add document_id column to research_resources.  Tests, document_id should be nullable (existing rows have no value)., document_id should be VARCHAR(36) to hold UUIDs. (+49 more)

### Community 214 - "Community 214"
Cohesion: 0.04
Nodes (51): ExaSearchEngine, Exa.ai search engine implementation with neural search capabilities, Initialize the Exa search engine.          Args:             max_results: Max, Get preview information from Exa Search.          Args:             query: Th, Tests for the ExaSearchEngine class.  Tests cover: - Initialization and confi, Initialize with API key from settings snapshot., Initialize with include_full_content=False., Tests for _get_previews method. (+43 more)

### Community 215 - "Community 215"
Cohesion: 0.02
Nodes (51): Tests for models manager module, Test handling of missing metrics, Test custom weight configuration, Test that ranking includes scores, Test rank numbers are sequential, Test status label assignment, Test ranking with no runs, Sample runs with different metrics (+43 more)

### Community 216 - "Community 216"
Cohesion: 0.02
Nodes (55): Extended tests for FindingsRepository - Research findings management.  Tests c, Tests for retrieving findings., Should return findings for existing query., Should return empty list for nonexistent query., Tests for clearing findings., Should remove findings for specific query., Tests for FindingsRepository initialization., Should handle clearing nonexistent query. (+47 more)

### Community 217 - "Community 217"
Cohesion: 0.03
Nodes (27): Deep behavioral tests for web.py pure logic. Tests default settings structure,, Tests for anonymous user detection., Tests for default settings dictionary structure., Tests for condition to load user settings., Tests for health check response structures., Tests for subscription form page context., Tests for subscription not found error context., Tests for subscription load error context. (+19 more)

### Community 218 - "Community 218"
Cohesion: 0.05
Nodes (60): _authenticated_client(), _create_test_app(), _make_setting(), Deep coverage tests for settings_routes.py targeting ~170 remaining uncovered st, Provide an authenticated test client with mocked auth and settings_limit., _get_setting_from_session: db_session is None branch., Test the inject_csrf_token context processor., save_all_settings: new setting creation with different value types. (+52 more)

### Community 219 - "Community 219"
Cohesion: 0.02
Nodes (44): Tests for research_service synthesis and report generation.  Tests cover: - Q, Quick mode synthesis uses synthesized content as first fallback., Quick mode synthesis uses current_knowledge as second fallback., Tests for quick mode synthesis., Quick mode synthesis combines findings as last fallback., Quick mode synthesis completes successfully., Quick mode synthesis handles exhausted fallbacks., Quick mode synthesis recovers partial content from errors. (+36 more)

### Community 220 - "Community 220"
Cohesion: 0.02
Nodes (52): Extended tests for CrossEngineFilter - Cross-engine search result filtering., Reindexing should update result indices., Reindexing should respect start_index., When reindex=False, indices should not be updated., Tests for result reordering., Should reorder results by ranked indices., When reorder=False, should maintain original order., Tests for CrossEngineFilter initialization. (+44 more)

### Community 221 - "Community 221"
Cohesion: 0.02
Nodes (55): Tests for Smart Query Strategy.  Phase 35: Complex Strategies - Tests for smar, Test detection of comparison intent., Tests for smart query strategy initialization., Tests for query expansion functionality., Test query expansion with synonyms., Test query expansion with related terms., Test query expansion with context., Test basic initialization of smart query components. (+47 more)

### Community 222 - "Community 222"
Cohesion: 0.02
Nodes (49): Tests for boolean parsing in settings manager.  This module tests the parse_bo, Test HTML checkbox unchecked (empty string from hidden input)., Test HTML checkbox with custom value attribute., Test hidden input fallback value for unchecked checkbox., Test parse_boolean with values from JSON parsing., Test JSON boolean true., Test JSON boolean false., Test JSON string "true". (+41 more)

### Community 223 - "Community 223"
Cohesion: 0.02
Nodes (44): Comprehensive coverage tests for search_utilities.py.  Focuses on gaps not cov, Additional edge cases for link extraction., A title of only spaces should be treated as empty after strip., A link of only spaces should be treated as empty after strip., None index becomes empty string, not None., Missing index key defaults to empty string., Output order matches input order., Handles a moderately large list without error. (+36 more)

### Community 224 - "Community 224"
Cohesion: 0.02
Nodes (42): Tests for search_utilities.py — format_links_to_markdown and format_findings ed, Titles with markdown-special chars are included., Tests for index aggregation in format_links_to_markdown., link' key fallback still aggregates indices for same URL., Handles mix of 'url' and 'link' keys for same actual URL., Tests for iteration numbering in format_findings., Single iteration with questions formatted correctly., Non-sequential iteration numbers (e.g., 1, 3, 5) handled correctly. (+34 more)

### Community 225 - "Community 225"
Cohesion: 0.02
Nodes (52): Tests for api_routes module - API endpoints., Tests for /settings/current-config endpoint., Should delegate to start_research and return queued status., Should require authentication., Tests for /status/<research_id> endpoint., Should require authentication., Should return 404 for non-existent research., Should return status for existing research. (+44 more)

### Community 226 - "Community 226"
Cohesion: 0.04
Nodes (31): _bash_resolution_fragment(), _clone_script(), make_mock_git(), Tests for the current llama.cpp wrapper policy in setup.sh / setup.ps1.  Tests c, Build the bash fragment that mirrors setup.sh resolution logic., PR_FORCE promotes to _LLAMA_PR when user hasn't set one., UNSLOTH_LLAMA_PR takes priority over PR_FORCE., Source remains pinned to ggml-org while the temporary policy is active. (+23 more)

### Community 227 - "Community 227"
Cohesion: 0.04
Nodes (52): app(), _ctx(), _inject_session(), _make_milestone(), _make_research(), _mock_db_session(), Deep coverage tests for research_routes.py targeting uncovered branches.  Targ, Create a minimal Flask app with the research blueprint, auth bypassed. (+44 more)

### Community 228 - "Community 228"
Cohesion: 0.02
Nodes (50): Tests for Answer Extraction functionality.  Phase 34: Answer Decoding - Tests, Tests for answer extraction from various content types., Test handling of malformed HTML., Tests for extraction from JSON content., Test extraction from simple JSON., Test extraction from nested JSON., Test extraction from JSON array., Test extraction from plain text content. (+42 more)

### Community 229 - "Community 229"
Cohesion: 0.02
Nodes (46): Extended tests for environment registry convenience functions.  Tests cover:, Test is_test_mode returns True when LDR_TESTING_TEST_MODE=true., Test is_test_mode returns False when not set., Test is_test_mode returns False when set to false., Tests for is_ci_environment convenience function., Test is_ci_environment returns True when CI=true., Test is_ci_environment returns True for CI=true., Test is_ci_environment returns True for CI=1. (+38 more)

### Community 230 - "Community 230"
Cohesion: 0.03
Nodes (48): Tests for topic organization strategy extended functionality.  Tests cover: -, Tests for topic hierarchy building., Topic hierarchy is built correctly., Hierarchy depth is limited., Flat topics create shallow hierarchy., Tests for topic extraction from queries., Subtopics are generated for main topics., Tests for topic relevance scoring. (+40 more)

### Community 231 - "Community 231"
Cohesion: 0.03
Nodes (23): Deep behavioral tests for news item construction patterns. Tests the news_item, Tests for summary fallback logic from api.py:391., Tests for the news-{research_id} ID format from api.py:387., Tests for the news feed response structure from api.py:467-474., Tests for the limit validation pattern from api.py:109-111., Tests for subscription dict construction patterns from api.py:731-754., Tests for history item processing from api.py:630-659., Reproduce history item processing from api.py. (+15 more)

### Community 232 - "Community 232"
Cohesion: 0.03
Nodes (27): Deep behavioral tests for core/utils.py pure logic. Tests date string generatio, Tests for generate_subscription_id UUID generation., Tests for get_local_date_string timezone logic., Tests for utc_now function., Tests for hours_ago calculation., Tests for hours_ago with naive datetime handling., Tests for TZ environment variable handling., Tests for settings manager error handling. (+19 more)

### Community 233 - "Community 233"
Cohesion: 0.03
Nodes (44): Tests for the check-absolute-module-paths pre-commit hook.  Ensures the hook c, Should not flag strings that don't start with local_deep_research., Should not flag 'local_deep_research' without a dot-suffix., Should not flag integer or other non-string constants., Tests for the _is_file_allowed() function., Files under tests/ should be allowed., Files under .pre-commit-hooks/ should be allowed., module_whitelist.py should be allowed. (+36 more)

### Community 234 - "Community 234"
Cohesion: 0.05
Nodes (79): draft_array_linear(), draft_array_path(), draft_array_polar(), draft_bezier(), draft_bspline(), draft_circle(), draft_clone(), draft_copy() (+71 more)

### Community 235 - "Community 235"
Cohesion: 0.04
Nodes (48): fresh_engine(), fully_migrated_engine(), _get_columns(), _get_fk_ondelete(), _get_indexes_by_name(), _get_unique_column_sets(), migrated_to_0005_engine(), Tests for migration 0006: Journal Quality System.  This migration consolidates (+40 more)

### Community 236 - "Community 236"
Cohesion: 0.04
Nodes (49): FileWriteSecurityError, Security module for verified file write operations.  This module ensures that, Write JSON data to a file only if security settings allow it.      Args:, Remove sensitive keys from data before writing to disk.      Args:         da, Raised when a file write operation is not allowed by security settings., Write content to a file only if security settings allow it.      Args:, _sanitize_sensitive_data(), write_file_verified() (+41 more)

### Community 237 - "Community 237"
Cohesion: 0.03
Nodes (46): Behavioral tests for text_cleaner module.  Tests the remove_surrogates functio, Handles emoji characters., Handles mixed script text., Returns same text for normal ASCII., Handles special Unicode symbols., Tests for actual surrogate character handling., Removes lone high surrogate character., Removes lone low surrogate character. (+38 more)

### Community 238 - "Community 238"
Cohesion: 0.03
Nodes (41): health_app(), _make_csp_app(), _make_protected_app(), Tests for web/auth/middleware_optimizer.py and related middleware.  Tests cove, Should return False for regular API requests., Should return False for regular page requests., Tests for should_skip_queue_checks function., Should return True for GET requests. (+33 more)

### Community 239 - "Community 239"
Cohesion: 0.04
Nodes (51): fresh_engine(), fully_migrated_engine(), _get_indexes_by_name(), migrated_to_0002_engine(), Tests for migration 0003: Add research indexes.  Tests cover: - Index creatio, Tests that verify index creation on upgrade to 0003., Verify ix_research_tasks_status and ix_research_tasks_created_at exist., Verify composite indexes on research_tasks with correct column order. (+43 more)

### Community 240 - "Community 240"
Cohesion: 0.03
Nodes (49): _category_from_filename(), _discover_env_definition_files(), _extract_setting_from_call(), _format_constraints(), format_value(), generate_docs(), generate_docs_content(), get_env_only_settings() (+41 more)

### Community 241 - "Community 241"
Cohesion: 0.03
Nodes (47): Extended tests for utilities/search_utilities.py  Tests cover edge cases and s, Test Follow-up Iteration with iteration not in questions dict., Tests for Sub-query phase parsing in format_findings., Test Sub-query X format is parsed correctly., Tests for Follow-up Iteration phase parsing in format_findings., Test Sub-query 2 shows second question., Test Follow-up Iteration X.Y format is parsed correctly., Test Sub-query with index out of bounds. (+39 more)

### Community 242 - "Community 242"
Cohesion: 0.03
Nodes (43): Tests for queue processor v2 core functionality.  Tests cover: - Process queu, Users are removed from check list when queue empty., Multiple users are processed independently., Queue loop recovers from database errors., Tests for the main queue processing loop., Tests for processing individual user queues., Password is retrieved from session store., Database opening error is handled. (+35 more)

### Community 243 - "Community 243"
Cohesion: 0.03
Nodes (50): authenticated_client(), client(), Tests for history_routes module - History endpoints., Should return formatted history items., Create a test client without authentication., Should filter settings_snapshot from metadata and only expose is_news_search., Should handle database errors gracefully., Tests for /history/status/<research_id> endpoint. (+42 more)

### Community 244 - "Community 244"
Cohesion: 0.04
Nodes (46): Tests for web/utils/vite_helper.py., Test initialization without Flask app., Test that manifest is loaded in production mode., Test that manifest loading is skipped in dev mode., Tests for ViteHelper._load_manifest method., Test that manifest JSON is loaded from file., Test that default static directory is used when not configured., Test that missing manifest file results in empty dict. (+38 more)

### Community 245 - "Community 245"
Cohesion: 0.03
Nodes (43): Tests for encrypted database extended functionality.  Tests cover: - Thread l, Session is bound to thread local engine., Transactions are isolated between threads., Thread local recovers from errors., Tests for thread local engine management., Thread local doesn't leak memory., Tests for SQLCipher pragma configuration., Pragma statements are applied to connection. (+35 more)

### Community 246 - "Community 246"
Cohesion: 0.03
Nodes (49): Extended tests for StandardKnowledge - Standard knowledge generation.  Tests c, Should handle empty context., Tests for knowledge compression., Compression prompt should include query., On compression failure, should return original., Should log compression details., Tests for citation formatting., Tests for basic knowledge generation. (+41 more)

### Community 247 - "Community 247"
Cohesion: 0.03
Nodes (49): Extended tests for Question Generators - Follow-up and sub-question generation., Simple generator concatenates context with query., Should preserve exact user query., Should provide full context from previous research., Tests for LLM-based follow-up question generation., LLM reformulation is placeholder for future implementation., Tests for StandardQuestionGenerator., Should generate multiple targeted questions. (+41 more)

### Community 248 - "Community 248"
Cohesion: 0.05
Nodes (31): _make_candidate(), _make_constraint(), _make_strategy(), High-value tests for EarlyStopConstrainedStrategy.  Covers pure logic paths:, unlikely' contains 'likely' substring, so 'likely' keyword matches first (0.7)., definitely' keyword is checked before 'likely'., When a number is present, it wins over keyword matching., Tests for evidence evaluation scoring. (+23 more)

### Community 249 - "Community 249"
Cohesion: 0.03
Nodes (21): Tests for the _commit_analysis pre-commit hook shared module.  Covers: classif, Files not under src/ and not matching other patterns are 'other'., Excluded dirs match case-insensitively., test_*.py files are classified as test even outside tests/., Tests for suggest_test_path path generation., Should strip src/ prefix from path., Should add test_ prefix to the filename., Tests for _parse_numstat git output parsing. (+13 more)

### Community 250 - "Community 250"
Cohesion: 0.04
Nodes (55): app(), _authed_delete(), _authed_get(), _authed_post(), _build_filter_chain(), _make_db_ctx(), _make_db_ctx_raising(), _mock_auth() (+47 more)

### Community 251 - "Community 251"
Cohesion: 0.03
Nodes (41): Behavioral tests for web/routes/route_registry module.  Tests the route regist, Tests for get_all_routes function., Returns non-empty list., ROUTE_REGISTRY is a dictionary., Each route dict has 'method' key., Each route dict has 'path' key., Each route dict has 'endpoint' key., Each route dict has 'description' key. (+33 more)

### Community 252 - "Community 252"
Cohesion: 0.05
Nodes (44): app(), _build_main_endpoint_session(), _create_test_app(), _make_chainable_query(), _make_overview_row(), _make_token_summary_row(), _make_token_usage(), _mock_db_session() (+36 more)

### Community 253 - "Community 253"
Cohesion: 0.03
Nodes (33): Tests for utilities/url_utils.py  Tests cover: - URL normalization - Scheme, Test that 127.0.0.1 gets http:// scheme., Test that private IPv4 ranges are recognized., Test that URL path is preserved., Test that public IPv4 addresses are not recognized as private., Test that query string is preserved., Test that localhost addresses get http:// prefix., Test hostname handling. (+25 more)

### Community 254 - "Community 254"
Cohesion: 0.03
Nodes (41): Tests for LLM config Ollama provider specifics.  Tests cover: - Ollama provid, Default API format is Ollama native., OpenAI compatible format is supported., Tests for Ollama provider edge cases., Empty model list triggers fallback., Model list is parsed correctly., Ollama model not found returns fallback., Keep alive parameter is configurable. (+33 more)

### Community 255 - "Community 255"
Cohesion: 0.03
Nodes (42): Tests for automatic RAG indexing functionality., Test that auto-indexing is skipped when no documents provided., Test that the auto_index_enabled setting is defined in defaults., Test that auto-indexing is skipped when settings check raises exception., Test that trigger_auto_index passes correct arguments to the worker., Test that auto-indexing works with a single document., Test that auto-indexing works with many documents., Test the ThreadPoolExecutor infrastructure for auto-indexing. (+34 more)

### Community 256 - "Community 256"
Cohesion: 0.03
Nodes (40): Tests for generate_card_id() function., Returns UUID format string., Generates unique IDs., ID has correct length (36 chars for UUID)., Tests for generate_subscription_id() function., Returns UUID format string., Generates unique IDs., ID has correct length (36 chars for UUID). (+32 more)

### Community 257 - "Community 257"
Cohesion: 0.03
Nodes (38): _cleanup(), Extended tests for thread_context module.  Focuses on thread-local context pro, After clearing, get_search_context returns None., Calling clear when there is nothing stored must not raise., Extended tests for get_search_context., Without prior set_search_context the return value is None., Modifying the returned dict must not alter the stored context., The returned dict contains exactly the same key-value pairs that         were o (+30 more)

### Community 258 - "Community 258"
Cohesion: 0.03
Nodes (45): Error recovery integration tests.  Tests cover: - Error detection and classif, Exponential backoff should increase wait times., Retry with jitter should add randomness., Retry budget should be enforced., Tests for circuit breaker pattern., Circuit should open after consecutive failures., Tests for error detection., Circuit should become half-open after timeout. (+37 more)

### Community 259 - "Community 259"
Cohesion: 0.04
Nodes (18): Deep behavioral tests for flask_api.py route handler logic patterns. Tests sche, Tests for scheduler status dict building in get_scheduler_status., Mirror scheduler status construction from flask_api., Tests for overdue subscription detection logic., Tests for APScheduler job list formatting., Tests for error handler response patterns., Tests for folder validation patterns., Tests for subscription ID filtering via LIKE pattern. (+10 more)

### Community 260 - "Community 260"
Cohesion: 0.03
Nodes (46): Comprehensive tests for settings logger module.  Tests cover: - log_settings, Test that debug_unsafe no longer logs unredacted settings., Tests for log_settings with forced level override., Test that force_level parameter overrides environment setting., Tests for edge cases in log_settings., Test log_settings handles empty dict gracefully., Test log_settings handles non-dict input., Tests for redact_sensitive_keys function. (+38 more)

### Community 261 - "Community 261"
Cohesion: 0.03
Nodes (44): Tests for EvidenceEvaluator - Evidence quality and relevance evaluation.  Test, Should parse confidence as float., Should extract confidence from text with numbers., Tests for evidence type parsing., Should parse direct_statement type., Should parse official_record type., Tests for EvidenceEvaluator initialization., Unknown types should default to speculation. (+36 more)

### Community 262 - "Community 262"
Cohesion: 0.03
Nodes (42): Integration tests for document loaders in the upload workflow.  These tests cr, Tests that create real files and verify extraction works., Test extracting text from a real .md file., Test extracting text from a real .txt file., Test extracting text from a real .html file., Test extracting text from a real .csv file., Test extracting text from a real .tsv file., Test extracting text from a real .xml file. (+34 more)

### Community 263 - "Community 263"
Cohesion: 0.04
Nodes (16): Deep behavioral tests for card storage field mapping patterns. Tests _card_to_d, Tests for the _card_to_dict field mapping pattern from card_storage.py:226-279., Tests for the create method's field mapping from card_storage.py:42-98., Reproduce source extraction from create()., Reproduce the mapping without requiring a real ORM object., card_type falls back to 'type' then 'news'., Tests for the update method's field mapping from card_storage.py:108-141., Tests for the get_by_user post-filtering from card_storage.py:281-302. (+8 more)

### Community 264 - "Community 264"
Cohesion: 0.03
Nodes (43): Tests for realistic LLM output patterns in JSON parsing that are not covered by, Edge cases for extracting text from LLM response objects., None input returns empty string., Object with .content attribute uses it., Object with .text but no .content uses .text., .content and .text both None -> falls to str()., Empty string .content is used as-is (not None)., Think tags in content are removed. (+35 more)

### Community 265 - "Community 265"
Cohesion: 0.04
Nodes (52): _make_example(), _quick_summary_response(), Coverage tests for benchmarks/runners.py.  Targets uncovered paths: dataset fa, Cover loop iteration with multiple examples., Cover line 391: when dataset_path is None, use DEFAULT_DATASET_URLS., Cover line 424: metrics.get('accuracy', 0) when key missing., Cover lines 156-167: legacy approach for extracting question/answer., Cover lines 188-245: quick_summary call, extract, write result. (+44 more)

### Community 266 - "Community 266"
Cohesion: 0.03
Nodes (40): Behavioral tests for embeddings_config module.  Tests embedding provider avail, Can be called without arguments., Tests for VALID_EMBEDDING_PROVIDERS constant., Accepts settings_snapshot parameter., Tests for is_openai_embeddings_available function., Can be called without arguments., VALID_EMBEDDING_PROVIDERS constant exists., Accepts settings_snapshot parameter. (+32 more)

### Community 267 - "Community 267"
Cohesion: 0.06
Nodes (70): add_arc(), add_bspline(), add_circle(), add_constraint(), add_ellipse(), add_external_from_face(), add_line(), add_point() (+62 more)

### Community 268 - "Community 268"
Cohesion: 0.03
Nodes (42): Extended tests for search_system_factory.py - covering _get_setting helper, str, iterdrag name should create IterDRAGStrategy., Should return default when settings_snapshot is None., rapid name should create RapidSearchStrategy., parallel name should create ParallelSearchStrategy., standard name should create StandardSearchStrategy., Tests for unknown strategy name handling., Unknown strategy name should fall back to SourceBasedSearchStrategy. (+34 more)

### Community 269 - "Community 269"
Cohesion: 0.05
Nodes (51): hex_bytes(), NativePathKind, NativePathLeasePayload, NativePathLeaseResponse, NativePathOperation, NativePathSourceKind, NativePathType, now_ms() (+43 more)

### Community 270 - "Community 270"
Cohesion: 0.04
Nodes (23): Comprehensive coverage tests for topic_generator.py.  Focuses on areas with in, Items that are not strings should be removed., When extract_json returns None but content has commas, split on comma., If content has no comma and JSON parsing failed, function returns []., Verify error handling and LLM cleanup., Test generate_topics with real _validate_topics (only mock _generate_with_llm)., Verify the prompt fed to the LLM is built correctly., Cover edge cases not well-tested elsewhere. (+15 more)

### Community 271 - "Community 271"
Cohesion: 0.03
Nodes (38): Tests for LLM config context window and token counting.  Tests cover: - Conte, Anthropic uses cloud context handling., OpenAI uses cloud context handling., Custom OpenAI endpoint uses cloud handling., Tests for context window size calculation., Default context window is used when not configured., Context window lookup by model name., Local providers are detected correctly. (+30 more)

### Community 272 - "Community 272"
Cohesion: 0.05
Nodes (48): _count_settings(), fresh_engine(), _get_setting(), _insert_setting(), migrated_to_0003_engine(), Tests for migration 0004: Migrate legacy app.* settings.  Tests cover: - Depr, app.enable_fact_checking should be deleted., app.output_dir should be deleted. (+40 more)

### Community 273 - "Community 273"
Cohesion: 0.03
Nodes (22): Deep behavioral tests for core utilities. Tests utc_now, generate_card_id, get_, The 'x.isoformat() if x else None' pattern., The .replace('Z', '+00:00') pattern., Tests for timedelta calculation patterns used in the codebase., Jitter should be within max_jitter_seconds., Tests for dict merge patterns used in card/subscription construction., Tests for utc_now utility., The 'x or default' pattern. (+14 more)

### Community 274 - "Community 274"
Cohesion: 0.04
Nodes (30): _check_code(), Tests for the check-settings-manager-thread-safety pre-commit hook.  Ensures t, Tests for how the hook recognises get_settings_manager() call shapes., module.get_settings_manager() should be caught via ast.Attribute., Cases that should NOT be flagged., db_session is the first positional param - a positional arg counts., Flask route / non-thread code may call get_settings_manager() freely., Calls to other functions should never be flagged. (+22 more)

### Community 275 - "Community 275"
Cohesion: 0.03
Nodes (37): Tests for metrics routes aggregation.  Tests cover: - Rating analytics - Lin, Tests for link analytics., Domain is extracted from URL., www prefix is removed from domain., Daily link counts are tracked., Tests for rating analytics., Domain connections are tracked., Links with title have higher quality. (+29 more)

### Community 276 - "Community 276"
Cohesion: 0.04
Nodes (33): Coverage-focused tests for benchmarks/metrics/calculation.py.  Targets the ~37, confidence=[1,2] is truthy, but int([1,2]) raises TypeError,         which is c, confidence='85.5' – int('85.5') raises ValueError, skipped., When no result has 'category', metrics should not contain 'categories'., processing_time=0 is in the result (key exists), so it counts., Three categories, each with different accuracy., Ensure it handles a larger dataset correctly., A result can have both 'error' and 'is_correct'. (+25 more)

### Community 277 - "Community 277"
Cohesion: 0.03
Nodes (35): _FakeBoth, _FakeModelName, _FakeModelOnly, _FakeNeither, _FakeWrapper, Tests for llm_utils module., Should pass settings snapshot to get_setting_from_snapshot., Tests for get_server_url function. (+27 more)

### Community 278 - "Community 278"
Cohesion: 0.03
Nodes (24): _clean_globals(), Tests for globals.py — thread-safe accessor functions.  Tests cover: - Access, Mutating returned settings must not affect internal state., Reset all global state before each test., Another thread should be able to write while we iterate., Multiple threads updating progress should not lose data., Concurrent add/remove should not crash., cleanup_research from multiple threads should not crash. (+16 more)

### Community 279 - "Community 279"
Cohesion: 0.03
Nodes (32): Plain HuggingFace model IDs pass through unchanged., Tests for local tokenizer_config.json fallback., Local tokenizer_config.json with v5 tokenizer should return True., Local tokenizer_config.json with standard tokenizer should return False., When local file exists, no network request should be made., Subsequent calls should use the cache., Integration tests for the top-level needs_transformers_5() function., Standard models should not trigger v5. (+24 more)

### Community 280 - "Community 280"
Cohesion: 0.03
Nodes (37): Tests for error propagation chains.  Tests cover: - Error propagation between, Settings errors propagate to service layer., Cache errors propagate to service layer., Nested errors preserve chain., Tests for error propagation between components., Errors are transformed for API response., Errors are logged during propagation., LLM errors propagate to service layer. (+29 more)

### Community 281 - "Community 281"
Cohesion: 0.03
Nodes (10): Expanded tests for metadata_extractor — covers format functions and edge cases, Product in both JSON-LD and microdata — only JSON-LD should be used., TestExtractMetadataEdgeCases, TestFormatArticle, TestFormatGeneric, TestFormatOpengraph, TestFormatProduct, TestFormatSoftware (+2 more)

### Community 282 - "Community 282"
Cohesion: 0.03
Nodes (39): Tests for network_utils module - IP address classification., Should detect 'localhost' as private., Should not detect public IPv6 addresses as private., Tests for hostname handling., Should not detect public hostnames as private., Should detect .local domains as private (mDNS)., Should only match lowercase .local., Should not detect internal.corp as private (no DNS resolution). (+31 more)

### Community 283 - "Community 283"
Cohesion: 0.05
Nodes (35): _handler_by_name(), _make_config(), Coverage tests for local_deep_research/web/app.py.  Targets the ~50 missing st, main() must call create_app() and then socket_service.run()., When use_https=True, main() logs a warning but does not raise., Cleanup scheduler is started when debug=False (or WERKZEUG_RUN_MAIN=true)., After starting cleanup scheduler, main() registers a lambda atexit handler., Prevent main() from spawning a real log-queue daemon thread during tests. (+27 more)

### Community 284 - "Community 284"
Cohesion: 0.03
Nodes (32): Tests for benchmarks/comparison/evaluator.py  Tests cover: - compare_configur, Test averaging of resource metrics., Test handling of empty results list., Test handling of results with missing metric categories., Test handling of None values in metrics., Tests for compare_configurations input validation., Test handling when results have different metric keys., Tests for default metric weights. (+24 more)

### Community 285 - "Community 285"
Cohesion: 0.03
Nodes (40): _huggingface_hub_reachable(), Tests for embeddings/splitters/text_splitter_registry.py  Tests cover: - get_, Test recursive splitter with custom separators., Test recursive splitter uses default separators., Tests for get_text_splitter with token type., Test getting token splitter., Test token splitter with custom parameters., Tests for get_text_splitter with sentence type. (+32 more)

### Community 286 - "Community 286"
Cohesion: 0.03
Nodes (36): Behavioral tests for security/security_settings module.  Tests type conversion, Value below minimum is clamped to minimum., Value above maximum is clamped to maximum., None min_value allows any low value., None max_value allows any high value., Both None bounds returns value unchanged., Tests for _convert_value function., Value equal to minimum is accepted. (+28 more)

### Community 287 - "Community 287"
Cohesion: 0.03
Nodes (11): Tests for citation_normalizer — engine-specific dict → CSL-JSON metadata., When both authors_csl (structured) and authors (display string)         are pre, OpenAlex / NASA ADS used to emit ``journal="unknown"`` when no         venue wa, Same filter catches "Unknown", "UNKNOWN", "  unknown  " variants., TestDetectEngine, TestExtractArxivId, TestExtractDoi, TestNormalizeCitation (+3 more)

### Community 288 - "Community 288"
Cohesion: 0.03
Nodes (37): Tests for utilities/search_utilities.py - None Safety and Edge Cases  Tests co, Tags in markdown code preserved., Multi-line think content., Tests for edge cases in remove_think_tags function., Tests for None safety in link formatting functions., Link with url=None skipped., Link with link=None skipped., <think><think>inner</think></think> handled. (+29 more)

### Community 289 - "Community 289"
Cohesion: 0.03
Nodes (23): Deep behavioral tests for _format_time_ago utility function. Tests time formatt, Tests for minute-based formatting., Tests for 'Just now' output., Tests for day-based formatting., Tests for timezone handling., Naive timestamps should be treated as UTC., Tests for error recovery., Tests for various timestamp format inputs. (+15 more)

### Community 290 - "Community 290"
Cohesion: 0.03
Nodes (37): Extended tests for news/utils/topic_generator.py  Tests cover: - generate_top, _generate_with_llm function exists., _generate_with_llm returns a list., _generate_with_llm returns empty list on error., Tests for _validate_topics() helper., Removes empty string topics., Removes topics shorter than 2 characters., Basic tests for generate_topics() function. (+29 more)

### Community 291 - "Community 291"
Cohesion: 0.03
Nodes (34): _AlwaysAuthenticated, _bypass_login_required(), Comprehensive tests for news web routes and blueprint. Tests create_news_bluepr, Tests for the subscriptions page route., Tests for the new subscription page route., Tests for the edit subscription page route., Tests for load_user_settings function., Test load_user_settings function exists. (+26 more)

### Community 292 - "Community 292"
Cohesion: 0.03
Nodes (34): Tests for end-to-end research flow.  Tests cover: - Complete research flow -, Progress is tracked throughout research., Report is generated at end of research., Research exports to multiple formats., Tests for end-to-end research flow., Research is persisted to database., Socket notifications are sent during research., Quick mode research completes with mock LLM. (+26 more)

### Community 293 - "Community 293"
Cohesion: 0.05
Nodes (45): app(), _auth_client(), _build_mock_query(), _create_app(), _make_db_session(), _make_settings_mock(), _mock_db_manager(), Coverage tests for background indexing in rag_routes.py.  Covers: - _get_rag_ (+37 more)

### Community 294 - "Community 294"
Cohesion: 0.03
Nodes (38): auth_client(), Tests for collection search and research history routes.  Uses the Flask test, When the enrichment query finds no matching document rows,         results shou, Exception responses should not leak internal details., Tests for _enrich_with_document_metadata enrichment on search results., Create a test client that bypasses the login_required checks., Search results for a user_collection should include file_type,         domain,, Document not in DB should get default metadata values. (+30 more)

### Community 295 - "Community 295"
Cohesion: 0.07
Nodes (38): _make_service(), Coverage tests for LibraryRAGService.  Focuses on logic paths not exercised by, Tests for _deduplicate_chunks., Create a LibraryRAGService with all external deps mocked out., Tests for load_or_create_faiss_index., Patch _get_or_create_rag_index on a service instance., Tests for _get_index_hash determinism and sensitivity., Tests for the db_password property propagation. (+30 more)

### Community 296 - "Community 296"
Cohesion: 0.03
Nodes (35): Tests for queue processor v2 research handling.  Tests cover: - Start researc, Research thread is created., Thread ID is tracked after start., Exception during start triggers cleanup., Settings snapshot is passed to research., Tests for starting individual researches., Research options are propagated correctly., Custom search engine is handled. (+27 more)

### Community 297 - "Community 297"
Cohesion: 0.03
Nodes (35): Comprehensive tests for resource_service. Tests CRUD operations for ResearchRes, Test exception handling in get_resources., Tests for get_resources_for_research function., Test handling of null resource_metadata., Tests for add_resource function., Test adding resource with minimal parameters., Test that exceptions are raised on database error., Tests for get_resources_for_research function. (+27 more)

### Community 298 - "Community 298"
Cohesion: 0.03
Nodes (23): Pure-function tests for hardware warning checks — zero mocking needed., Context exactly at 8192 should NOT trigger (uses <=)., Context at 8193 is just above the threshold — should trigger., Verify the LOCAL_PROVIDERS constant., None model should not crash — treated as falsy like empty string., Tests for check_legacy_server_config., File exists but all values match defaults — no warning., Empty JSON object has no customizations — no warning. (+15 more)

### Community 299 - "Community 299"
Cohesion: 0.05
Nodes (60): apply_transform(), compute_c2c_distances(), compute_c2m_distances(), compute_curvature(), compute_density(), compute_normals(), compute_roughness(), convert_format() (+52 more)

### Community 300 - "Community 300"
Cohesion: 0.09
Nodes (59): _alpha_box(), _apply_curiosity_combo_motion_pose(), _apply_curiosity_showcase_pose(), _apply_curiosity_spin_motion_pose(), build_command_cards(), build_static_backdrop(), build_terminal_lines(), collect_demo() (+51 more)

### Community 301 - "Community 301"
Cohesion: 0.03
Nodes (34): Tests for search cache extended functionality.  Tests cover: - Stampede prote, Cleanup thread runs periodically., Cleanup doesn't conflict with active fetches., Race condition window is minimized., Tests for cache stampede protection., Concurrent fetches for same query are coalesced., Double-check locking prevents duplicate fetches., Fetch result is propagated to all waiting threads. (+26 more)

### Community 302 - "Community 302"
Cohesion: 0.03
Nodes (35): Tests for utilities/search_utilities.py  Tests cover: - remove_think_tags fun, Test returns empty list for empty input., Test handles results without title., Test handles results without link., Tests for remove_think_tags function., Test that whitespace is stripped from values., Test handles None values gracefully., Test that paired think tags are removed. (+27 more)

### Community 303 - "Community 303"
Cohesion: 0.03
Nodes (10): High-value tests for small utility modules: url_utils, network_utils, type_utils, TestIsPrivateIpDomains, TestIsPrivateIpIpv6, TestIsPrivateIpLocalhost, TestIsPrivateIpRanges, TestNormalizeUrl, TestRemoveSurrogates, TestToBoolNoneAndOther (+2 more)

### Community 304 - "Community 304"
Cohesion: 0.03
Nodes (34): Tests for metrics routes cost calculation.  Tests cover: - Cost calculation p, Pricing is cached for efficiency., Costs are summed across research phases., Costs from multiple models are aggregated., Tests for cost calculation., Tests for cost analytics., Costs are grouped by research ID., Cost is calculated per model. (+26 more)

### Community 305 - "Community 305"
Cohesion: 0.05
Nodes (59): cli(), handle_error(), images(), images_download(), images_download_all(), images_list(), main(), models() (+51 more)

### Community 306 - "Community 306"
Cohesion: 0.05
Nodes (33): CredentialStoreBase, Temporary authentication storage for handling post-registration flow. Stores pa, Stores authentication temporarily for post-registration/login flow.     Passwor, Initialize the temporary auth store.          Args:             ttl_seconds:, Store authentication temporarily.          Args:             username: Userna, Retrieve and remove authentication data.          Args:             token: To, Peek at authentication data without removing it.          Args:             t, Alias for store_auth. (+25 more)

### Community 307 - "Community 307"
Cohesion: 0.03
Nodes (28): Tests for benchmarks/graders.py  Tests cover: - extract_answer_from_response, Tests for the get_evaluation_llm function., Tests for the extract_answer_from_response function., Test extraction of exact answer from BrowseComp response., Tests for the grade_single_result function., Tests for grade_results function (batch grading)., Test handling of missing answer in BrowseComp response., Tests for human_evaluation function. (+20 more)

### Community 308 - "Community 308"
Cohesion: 0.03
Nodes (41): Detailed behavior tests for working strategies.  Tests specific features and b, Detailed tests for SourceBasedSearchStrategy., Test that rapid strategy searches with original query., Detailed tests for ParallelSearchStrategy., Test that parallel strategy executes multiple searches., Detailed tests for IterDRAGStrategy., Test that IterDRAG builds knowledge through iterations., Detailed tests for NewsAggregationStrategy. (+33 more)

### Community 309 - "Community 309"
Cohesion: 0.04
Nodes (25): _fake_session_ctx(), _make_mock_research(), Extra coverage tests for research_service.py targeting cancel/termination/cleanu, Research in DB but not active/terminal → suspended, returns True., DB error during non-active lookup → returns False., Top-level exception → returns False., Queues suspension update and calls cleanup., Queue processor error → swallowed, cleanup still runs. (+17 more)

### Community 310 - "Community 310"
Cohesion: 0.04
Nodes (38): _make_args(), mock_data_directory(), High-value tests for benchmarks/cli/benchmark_commands.py.  Covers CLI output, Tests for run_browsecomp_cli output formatting paths., BrowseComp prints metrics summary when result has 'metrics'., BrowseComp prints no-eval message when result has no 'metrics'., Mock get_data_directory so module-level default paths use tmp_path., endpoint_url is mapped to openai_endpoint_url in search_config. (+30 more)

### Community 311 - "Community 311"
Cohesion: 0.03
Nodes (25): Tests for benchmarks/metrics/statistics.py  Tests cover: - normal_quantile in, 0/100 should NOT give [0.0, 0.0] (unlike normal approx)., 0/0 should return zeros without error., successes > total should raise ValueError., Negative successes should raise ValueError., 1/1 should give a wide interval., Bounds should always be in [0, 1]., Larger sample size should give narrower CI at same proportion. (+17 more)

### Community 312 - "Community 312"
Cohesion: 0.05
Nodes (27): Tests for the raw-SQL check inside the custom-checks pre-commit hook.  Covers, fr"..." f-raw-string prefix variant must be caught., Patterns that must continue to pass., SQLAlchemy text() is the sanctioned way to run raw SQL., Regression: auth_db.py was missing from one of the two allowlists., Every execute-call variant in db_execute_patterns must be flagged.      Locks, Every branch of _is_raw_sql_exempt must be covered.      If any branch silentl, Files under a /tests/ directory are exempt even without test_ prefix. (+19 more)

### Community 313 - "Community 313"
Cohesion: 0.05
Nodes (41): app(), _authenticated_client(), _ensure_parent_packages(), _fake_news_core_utils(), _fake_scheduler_module(), Tests for scheduler, folder, and history endpoints in news/flask_api.py.  Cove, Return a test client with a session that satisfies @login_required., show_all=False -> active_users counts only the current user. (+33 more)

### Community 314 - "Community 314"
Cohesion: 0.04
Nodes (16): Deep behavioral tests for rating storage logic patterns. Tests rating distribut, Tests for relevance vote counting patterns., Tests for _get_rating_distribution logic pattern., Tests for the isdigit filter pattern used in rating values., Tests for the rating summary response structure., Tests for the create-or-update (upsert) pattern., Tests for item type handling in rating storage., card_id filter maps to item_id for backward compatibility. (+8 more)

### Community 315 - "Community 315"
Cohesion: 0.03
Nodes (34): Tests for threading_utils module., Should reuse same thread ID for multiple calls in same thread., Should properly handle keyword arguments., Tests for thread_with_app_context decorator., Should run function within provided app context., Should run function normally when context is None., Tests for thread_specific_cache decorator., Should preserve function name and docstring. (+26 more)

### Community 316 - "Community 316"
Cohesion: 0.03
Nodes (32): Quantized projection matrix stores and restores with bounded error., INT4 quantized projection stores correctly., update_proj_gap increases when cosine similarity exceeds threshold., project_back applies the scale factor., Tests for _quantize, _dequantize, _quantize_stochastic., Quantize → dequantize has bounded error., Grouped quantization → dequantization has bounded error., Quantized output should be uint8. (+24 more)

### Community 317 - "Community 317"
Cohesion: 0.05
Nodes (57): baseline_decision(), baseline_discover(), baseline_list(), baseline_rotate(), baseline_save(), batch_evaluate(), compare(), convert() (+49 more)

### Community 318 - "Community 318"
Cohesion: 0.05
Nodes (57): add_edge(), add_page(), add_vertex(), build_style(), create_blank_diagram(), find_cell_by_id(), get_all_cells(), get_cell_geometry() (+49 more)

### Community 319 - "Community 319"
Cohesion: 0.07
Nodes (57): _add_heading_element(), _add_image_ref_element(), _add_list_element(), _add_page_break_element(), _add_paragraph_element(), _add_table_element(), _apply_paragraph_properties(), _apply_text_properties() (+49 more)

### Community 320 - "Community 320"
Cohesion: 0.06
Nodes (30): ConcreteKnowledgeGenerator, Tests for the BaseKnowledgeGenerator class.  Tests cover: - Initialization -, Tests for _validate_links helper., Returns True for valid list of link strings., Returns True for empty list., Returns False for non-list input., Returns False if any element is not a string., Concrete implementation for testing the base pattern. (+22 more)

### Community 321 - "Community 321"
Cohesion: 0.07
Nodes (26): _make_strategy(), _model_response(), High-value tests for RecursiveDecompositionStrategy.  Covers pure logic paths:, Supports dash-prefixed subtask lines., DECOMPOSE with no subtask lines still returns should_decompose=True., Think tags in LLM output are stripped., When original_query differs from current query, context is included in prompt., No context line when original_query matches current query. (+18 more)

### Community 322 - "Community 322"
Cohesion: 0.05
Nodes (15): Deep behavioral tests for search_integration.py. Tests NewsSearchCallback, qual, Tests for search wrapper context construction., Tests for _calculate_quality heuristic., Tests for callback __call__ logic patterns., Tests for context dict default extraction., Tests for search wrapper metadata preservation patterns., Tests for kwargs popping in wrapper., Tests for tracking_enabled property logic. (+7 more)

### Community 323 - "Community 323"
Cohesion: 0.04
Nodes (9): High-value tests for utilities/json_utils.py pure logic., TestCleanLlmJsonArtifacts, TestExtractByBrackets, TestExtractJsonComplex, TestExtractJsonDirect, TestExtractJsonExpectedType, TestGetLlmResponseText, TestRemoveThinkTags (+1 more)

### Community 324 - "Community 324"
Cohesion: 0.04
Nodes (38): _create_venv(), _has_uv(), no_torch_venv(), End-to-end sandbox tests: Studio modules in isolated no-torch venvs.  Covers: -, Static analysis: chat_templates.py has no top-level torch imports., chat_templates.py must be valid Python syntax., No top-level 'import torch' or 'from torch' at module level., All 'from torch' imports must be inside function/method bodies. (+30 more)

### Community 325 - "Community 325"
Cohesion: 0.04
Nodes (31): Extended tests for benchmarks/metrics/calculation.py - covering edge cases in c, Tests for calculate_metrics edge cases., Mixed graded and ungraded results should only use graded for accuracy., Results with errors should be counted in error_rate., Non-existent file should return error dict., Average processing time should be calculated correctly., Confidence values should be parsed and averaged., Invalid confidence values should be skipped. (+23 more)

### Community 326 - "Community 326"
Cohesion: 0.04
Nodes (34): Tests for auth_db module., Tests for get_auth_db_path function., init_auth_database creates User table using CreateTable DDL., get_auth_db_path returns a Path object., Tests for get_auth_db_session function., get_auth_db_session returns a SQLAlchemy session., get_auth_db_session initializes database if it doesn't exist., get_auth_db_session creates engine with correct SQLite URL. (+26 more)

### Community 327 - "Community 327"
Cohesion: 0.07
Nodes (21): _make_mock_folder(), _make_mock_session(), _make_mock_sub(), Deep behavioral tests for FolderManager. Tests CRUD operations, subscription ma, Create a mock SQLAlchemy session., Tests for folder creation., Tests for folder updates., Tests for folder deletion. (+13 more)

### Community 328 - "Community 328"
Cohesion: 0.04
Nodes (29): Comprehensive tests for topic_generator module. Tests topic extraction with LLM, Tests for generate_topics function., Test accepts query, findings, category, and max_topics parameters., Test returns a list (empty or with topics)., Tests for _validate_topics function., Test removes empty string topics., Test removes whitespace-only topics., Test removes topics shorter than 2 characters. (+21 more)

### Community 329 - "Community 329"
Cohesion: 0.04
Nodes (31): Tests for settings routes checkbox handling.  Tests cover: - Checkbox dual mo, String values are converted to boolean., Tests for checkbox dual mode (AJAX and POST) handling., AJAX and POST produce same result., Array values are handled for multiple checkboxes., AJAX mode sends boolean True., Tests for corrupted value detection., [object Object]' is detected as corrupted. (+23 more)

### Community 330 - "Community 330"
Cohesion: 0.05
Nodes (35): _make_settings_manager(), _patch_orchestrator(), Tests for the calculate_warnings orchestrator (__init__.py).  These test the i, Tests for exception handling., Build a mock SettingsManager with sensible defaults., Provider string is lowercased before checks., Context checks are gated on is_local AND not dismissed., Non-local provider should never trigger context history checks,         even wh (+27 more)

### Community 331 - "Community 331"
Cohesion: 0.04
Nodes (32): High-value edge case tests for web/warning_checks module.  Covers gaps not add, Non-local providers never trigger, even with very high context., Warning message includes formatted context value., Warning message includes context size., Edge cases for check_context_below_history., With 5 identical records, percentile equals that value., Context exactly at min_safe returns None (no warning)., Warning message includes both current and min safe context. (+24 more)

### Community 332 - "Community 332"
Cohesion: 0.05
Nodes (35): EngineEntry, get_engine_entry(), Hardcoded registry of search engine module paths and class names.  This is the, Look up an engine's implementation details by name., Immutable record mapping an engine name to its implementation., Tests for the hardcoded engine registry.  Validates that registry entries are, Registry should have entries for all engines with per-engine settings files., Settings files should not contain module_path/class_name (now in registry). (+27 more)

### Community 333 - "Community 333"
Cohesion: 0.04
Nodes (35): _make_llm_callable_only(), _make_llm_with_chat_messages(), _make_llm_with_invoke(), Extra coverage tests for benchmarks/graders.py targeting uncovered branches., Response with multiline reasoning (re.DOTALL) → extracts correctly., Malformed response → returns defaults (None/False)., SimpleQA with 'Correct: no' → is_correct=False., One result throwing during grading → error recorded, others graded. (+27 more)

### Community 334 - "Community 334"
Cohesion: 0.04
Nodes (16): High-value pure logic tests for graders.py.  Tests extract_answer_from_respons, Tests for grade_single_result browsecomp regex parsing of grader LLM response., Tests for DEFAULT_EVALUATION_CONFIG dict values., Tests for grade_single_result simpleqa regex parsing of grader LLM response., Directly test the citation-stripping regex used in extract_answer_from_response., Tests for get_evaluation_llm configuration merging logic., max_tokens was intentionally removed per code comments., Tests for extract_answer_from_response with simpleqa dataset type. (+8 more)

### Community 335 - "Community 335"
Cohesion: 0.08
Nodes (35): _make_service(), _make_session_ctx(), Deep coverage tests for LibraryRAGService.  Targets ~146 missing statements no, Create a LibraryRAGService with all external deps mocked out., Helper to build a context-manager mock wrapping *session*., test_already_indexed_skip(), test_basic_stats_with_collection_id(), test_chunk_sample_embedding_model_type_none() (+27 more)

### Community 336 - "Community 336"
Cohesion: 0.05
Nodes (1): TestTimeline

### Community 337 - "Community 337"
Cohesion: 0.04
Nodes (30): Tests for bytes_loader module., Tests for extract_text_from_bytes function., Test extracting text from TXT bytes., Test extracting text from JSON bytes., Test extracting text from YAML bytes., Tests for load_from_bytes function., Test that unsupported extension returns None., Test extraction with extension without dot. (+22 more)

### Community 338 - "Community 338"
Cohesion: 0.04
Nodes (17): Deep behavioral tests for safe_error_message and flask_api helpers. Tests excep, Tests for the field mapping dictionary used in update_subscription., Verify the expected request fields are mapped., Tests for exception type → message mapping., Tests for the subscription ID validation pattern from flask_api., Tests for the vote validation pattern., Tests for context string formatting., ValueError messages should not include context. (+9 more)

### Community 339 - "Community 339"
Cohesion: 0.05
Nodes (13): Deep behavioral tests for topic_generator.py. Tests _validate_topics logic, LLM, Tests for LLM response parsing patterns used in topic_generator., Tests for _validate_topics extracted logic., Mirror of _validate_topics from topic_generator.py., Tests for the generate_topics function flow patterns., When LLM returns nothing, should get failure placeholder., When LLM returns topics, they should be validated., Tests for headline generation patterns from headline_generator.py. (+5 more)

### Community 340 - "Community 340"
Cohesion: 0.05
Nodes (33): _fresh_import(), Comprehensive tests for local_deep_research.database.sqlcipher_compat module., An ImportError must be raised when sqlcipher3 is absent., The error message should mention sqlcipher3., The error message should mention pdm install., The error message should mention SQLCipher system library., Verify the public API surface of the compat module., get_sqlcipher_module must be a callable. (+25 more)

### Community 341 - "Community 341"
Cohesion: 0.04
Nodes (28): Tests for research_service lifecycle management.  Tests cover: - Resource cle, Cleanup closes file handles., Tests for resource cleanup., Cleanup releases memory references., Cleanup is thread-safe., Tests for progress callback functionality., Progress callbacks are called in sequence., Progress callbacks report accurate percentages. (+20 more)

### Community 342 - "Community 342"
Cohesion: 0.04
Nodes (27): Tests for benchmarks/benchmark_functions.py  Tests cover: - evaluate_simpleqa, evaluate_simpleqa accepts human_evaluation flag., Tests for the evaluate_browsecomp function., evaluate_browsecomp works with default parameters., evaluate_browsecomp accepts custom search strategy., Tests for the evaluate_simpleqa function., Tests for the evaluate_xbench_deepsearch function., evaluate_xbench_deepsearch works with default parameters. (+19 more)

### Community 343 - "Community 343"
Cohesion: 0.04
Nodes (35): app(), Tests for research_scheduler routes., Tests for start endpoint input validation., Start endpoint requires JSON content type., Start with empty JSON body., Tests for route authentication requirements., Prepare endpoint requires authentication., Tests for get_current_username function. (+27 more)

### Community 344 - "Community 344"
Cohesion: 0.07
Nodes (33): app(), _auth_client(), _build_mock_query(), _create_app(), _make_db_session(), _make_settings_mock(), _mock_db_manager(), Coverage tests for rag_routes.py targeting the largest untested blocks.  Cover (+25 more)

### Community 345 - "Community 345"
Cohesion: 0.04
Nodes (10): High-value pure logic tests for search_system_factory.py.  Tests AVAILABLE_STR, Tests for the ALL_STRATEGIES list (show_all=True)., ALL_STRATEGIES should begin with AVAILABLE_STRATEGIES entries., Tests for _get_setting() helper function., Tests for the AVAILABLE_STRATEGIES module-level constant., Tests for get_available_strategies() function., TestAllStrategiesList, TestAvailableStrategiesList (+2 more)

### Community 346 - "Community 346"
Cohesion: 0.04
Nodes (9): Tests for LLM-Driven Modular Strategy  Phase 18: Advanced Search Strategies -, Tests for modular component functionality, Tests for strategy orchestration, Tests for LLM constraint processor, Tests for early rejection manager, TestEarlyRejectionManager, TestLLMConstraintProcessor, TestModularComponents (+1 more)

### Community 347 - "Community 347"
Cohesion: 0.04
Nodes (33): clean_env(), Tests for SQLCipher settings and environment variable overrides.  These tests, Verify settings values have correct types., Tests for environment variable overrides., Verify LDR_DB_KDF_ITERATIONS environment variable works., Verify LDR_DB_PAGE_SIZE environment variable works., Verify LDR_DB_HMAC_ALGORITHM environment variable works., Verify LDR_DB_KDF_ALGORITHM environment variable works. (+25 more)

### Community 348 - "Community 348"
Cohesion: 0.07
Nodes (36): app(), _auth_client(), _build_mock_query(), _create_app(), _make_db_session(), _make_settings_mock(), _mock_db_manager(), Coverage tests for upload_to_collection and get_collection_documents in rag_rout (+28 more)

### Community 349 - "Community 349"
Cohesion: 0.05
Nodes (31): _get_fn(), Tests for normalize_entity_query utility function.  This function normalizes e, Special characters like hyphens and dots are preserved., Numbers in entity/constraint are preserved., Tests that normalization is deterministic and consistent., Same inputs always produce the same result., Different cases of the same entity produce identical results., Different whitespace of the same entity produce identical results. (+23 more)

### Community 350 - "Community 350"
Cohesion: 0.04
Nodes (24): Comprehensive coverage tests for utilities/type_utils.py.  Uses parametrized t, Strings NOT in the truthy set should return False., Bool values must pass through unchanged, before any other check., Empty string is a string, not None — default must be ignored., None should return the default parameter., For non-bool, non-str, non-None types, Python's bool() is used., Objects without __bool__ override default to truthy., Objects with __len__ returning 0 are falsy via bool(). (+16 more)

### Community 351 - "Community 351"
Cohesion: 0.06
Nodes (31): _handler_by_name(), _make_config(), _patch_main(), Coverage tests for local_deep_research/web/app.py.  Targets the ~50 missing st, main() configures logging with the correct debug flag., main() logs a warning when use_https=True., use_https=True must not raise; it only emits log warnings., use_https=False takes the happy path without any HTTPS logging. (+23 more)

### Community 352 - "Community 352"
Cohesion: 0.05
Nodes (28): BaseTool, Base class for all agent-compatible tools. Defines the common interface and sha, Log tool execution details.          Args:             **kwargs: Parameters u, Log tool execution result.          Args:             result: The result of t, Abstract base class for all agent-compatible tools., Initialize the tool.          Args:             name: The name of the tool, Get the JSON schema for the tool's parameters.          Returns:, Validate the provided parameters against the tool's schema.          Args: (+20 more)

### Community 353 - "Community 353"
Cohesion: 0.05
Nodes (34): app(), _auth_session(), client(), Tests covering uncovered lines in news/flask_api.py.  Targets: - scheduler_co, Returns False when neither primary nor fallback matches., Cover run_subscription_now route: subscription lookup, config, responses., Returns 404 when the subscription id is not in the list., Successful run returns status=success and a research_id. (+26 more)

### Community 354 - "Community 354"
Cohesion: 0.05
Nodes (32): _authenticated_client(), _create_test_app(), _make_setting(), Validation and save-path coverage tests for settings_routes.py.  Targeted func, validate_setting returns False when a checkbox value cannot be converted     to, validate_setting returns False when a numeric value is below min_value., validate_setting returns False when a numeric value exceeds max_value., validate_setting returns False for a select value not in allowed options. (+24 more)

### Community 355 - "Community 355"
Cohesion: 0.05
Nodes (48): _gguf_with_general(), Snapshot layout: weight in quant subdir, mmproj at snapshot root., ``phi`` substring inside ``sapphire`` must not tag Phi., ``yi`` must not cross letter boundaries (``yip``)., ``mimo`` must not tag ``mimosa``., Pin Mistral-derivative tagging., Leftmost family token wins, not tuple order., Catalogue-audit additions tag correctly. (+40 more)

### Community 356 - "Community 356"
Cohesion: 0.06
Nodes (50): _collect_anthropic_text(), _collect_streamed_content(), _collect_streamed_tool_calls(), _final_finish_reason(), _http(), _kill_server(), main(), POST a streaming request and collect SSE chunks. (+42 more)

### Community 357 - "Community 357"
Cohesion: 0.07
Nodes (11): _make_strategy_no_init(), _make_strategy_via_constructor(), High-value pure logic tests for IterativeRefinementStrategy.  Focuses on const, Tests for _merge_results() pure dict merging logic., Create an IterativeRefinementStrategy with __init__ bypassed., Tests for _build_research_context() pure dict construction., Create an IterativeRefinementStrategy through the real constructor., Tests for parameter validation in __init__. (+3 more)

### Community 358 - "Community 358"
Cohesion: 0.04
Nodes (22): _encrypt(), High-value tests for benchmarks/datasets/utils.py.  Tests cover derive_key(),, Strings shorter than 8 chars skip decryption., Strings with characters outside the base64 alphabet are skipped., Encrypt then decrypt should recover plaintext (with space for heuristic)., Multiple different plaintexts round-trip correctly., When password > 30 chars, decrypt tries the first word., When password contains 'GUID', decrypt tries the part after it. (+14 more)

### Community 359 - "Community 359"
Cohesion: 0.06
Nodes (31): _mock_get_setting(), Tests for missing coverage gaps in local_deep_research/config/llm_config.py., When provider is lmstudio and available, fallback is skipped., When provider is llamacpp and available, fallback is skipped., Tests for ollama-specific edge cases in get_llm., When model is not in the Ollama model list, ChatOllama handles it at invoke time, When ChatOllama() raises, exception is propagated (fallback removed)., Base settings dict with sensible defaults for most tests. (+23 more)

### Community 360 - "Community 360"
Cohesion: 0.05
Nodes (29): _make_openalex_response(), Unit tests for ``utilities.openalex_enrichment``.  Covers:   - ``_normalize_d, HTTP layer mocked at ``safe_get``., Short-circuit: no work to do, no request made., No DOI in any result → no request made, inputs untouched., Results with an ``openalex_source_id`` already populated must         not be re, One DOI → one resolved source; the result dict gets both         ``openalex_sou, Duplicate DOIs across results share one HTTP request and all         get the re (+21 more)

### Community 361 - "Community 361"
Cohesion: 0.06
Nodes (49): analyze_mesh(), check_mesh(), decimate_mesh(), export_mesh(), fill_holes(), _flatten(), flip_normals(), _get_indices() (+41 more)

### Community 362 - "Community 362"
Cohesion: 0.04
Nodes (22): _cli_name_for(), Parity tests — guarantee the CLI exposes every safari-mcp tool 1:1.  These tes, Required MCP params must be required in Click — covers all types.          Pre, Enum params must expose the same choices., The introspection commands (tools list/describe) reflect the registry., Spot-check schemas that had known drift bugs in previous revisions.      Each, safari_mock_route.response is required and takes a JSON object.          Regre, Match the same normalization the registry applies. (+14 more)

### Community 363 - "Community 363"
Cohesion: 0.08
Nodes (41): already_done(), Cell, main(), parse_list(), _print_table(), Build an evaluation dataset: cross-product of queries × search engines × judge L, Parse a delimiter-separated list — '|' preferred for queries with commas., Replace a row with the same (query, engine, model) or append. (+33 more)

### Community 364 - "Community 364"
Cohesion: 0.09
Nodes (18): _auth_client(), _create_app(), Coverage tests for delete_routes.py focusing on untested logic branches.  Cove, Validation paths for DELETE /library/api/documents/bulk., Validation paths for DELETE /library/api/documents/blobs., Validation paths for DELETE /collection/<id>/documents/bulk., Validation paths for POST /library/api/documents/preview., Service exceptions must be caught and return 500. (+10 more)

### Community 365 - "Community 365"
Cohesion: 0.04
Nodes (9): Extended Tests for Socket Service  Phase 19: Socket & Real-time Services - Soc, Tests for socket connection functionality, Tests for socket emission functionality, Tests for subscription management, Tests for singleton pattern enforcement, TestSingletonPattern, TestSocketConnection, TestSocketEmission (+1 more)

### Community 366 - "Community 366"
Cohesion: 0.07
Nodes (47): assemble(), badge_md(), _between(), build_call_graph(), classify_staleness(), cmd_check_structure(), cmd_generate(), conclusion_glyph() (+39 more)

### Community 367 - "Community 367"
Cohesion: 0.04
Nodes (7): Extended Tests for Evidence-Based Strategy V2  Phase 18: Advanced Search Strat, Tests for evidence collection functionality, Tests for claim verification functionality, Tests for strategy integration and orchestration, TestClaimVerification, TestEvidenceCollection, TestStrategyIntegration

### Community 368 - "Community 368"
Cohesion: 0.04
Nodes (31): Tests for paths module., Tests for get_user_database_filename function., Should generate filename with username hash., Should return same filename for same username., Should return different filenames for different usernames., Should handle special characters in username., Tests for get_data_dir backward compat function., Should return string instead of Path. (+23 more)

### Community 369 - "Community 369"
Cohesion: 0.04
Nodes (31): Extended tests for news/web.py  Tests cover: - create_news_blueprint() functi, Tests for search strategies configuration., Available strategies list., Default strategy is topic_based., Tests for create_news_blueprint() function., Tests for blueprint configuration., Blueprint can be created multiple times., Tests for web module imports. (+23 more)

### Community 370 - "Community 370"
Cohesion: 0.06
Nodes (30): _make_app(), Extended tests for web/auth/decorators.py  Tests cover: - _safe_redirect_to_l, Authenticated user without DB connection on web route: session cleared, redirect, Authenticated user without DB connection on API route returns 401., Fully authenticated user with DB connection: wrapped function is called., Tests for the current_user function., current_user returns the username stored in session., current_user returns None when session has no username. (+22 more)

### Community 371 - "Community 371"
Cohesion: 0.06
Nodes (38): add_bytes_to_tar(), add_symlink_to_tar(), approved_checksums_for(), io_bytes(), When the choice ships a paired cudart bundle (#5106), the install     is conside, If the choice has no paired runtime archive (manifest dropped it,     or upstrea, Existing pre-#5322 Windows CUDA installs (no paired cudart) must     be treated, confirm_install_tree guard rejects installs missing critical files. (+30 more)

### Community 372 - "Community 372"
Cohesion: 0.07
Nodes (47): _default_name(), _detect_format(), import_3mf(), _import_as_draft(), _import_as_mesh(), _import_as_part(), import_brep(), import_dxf() (+39 more)

### Community 373 - "Community 373"
Cohesion: 0.07
Nodes (1): TestFilters

### Community 374 - "Community 374"
Cohesion: 0.04
Nodes (9): Tests for Iterative Reasoning Strategy  Phase 18: Advanced Search Strategies -, Tests for iterative reasoning functionality, Tests for KnowledgeState dataclass, Test KnowledgeState can be created, Test KnowledgeState string representation, Tests for search decision logic, TestIterativeReasoning, TestKnowledgeState (+1 more)

### Community 375 - "Community 375"
Cohesion: 0.05
Nodes (25): _make_strategy(), Tests for pure logic in SourceBasedSearchStrategy: - Long query detection (line, Tests for question assembly deduplication (lines 281-286)., search_original_query=True, query NOT in questions → prepended., search_original_query=True, query in questions → NOT duplicated., search_original_query=False → questions returned without query., Empty questions + flag=True → returns [query]., Build a minimal mock object with the attributes used by the logic under test. (+17 more)

### Community 376 - "Community 376"
Cohesion: 0.04
Nodes (28): Extended tests for news/utils/headline_generator.py  Tests cover: - generate_, Function has correct signature., Calls LLM when findings are provided., Returns None when LLM import fails., Edge case tests for headline generation., Basic tests for generate_headline() function., Handles unicode in query., Handles very long query. (+20 more)

### Community 377 - "Community 377"
Cohesion: 0.04
Nodes (22): Tests for search_engines_config module.  Tests the configuration loading and p, Should return default when db_session raises exception., Should pass username to settings manager., Tests for _get_setting function., Tests for _extract_per_engine_config function., Should return flat config as-is for non-dotted keys., Should convert single dotted keys to nested dict., Should return value from settings snapshot when available. (+14 more)

### Community 378 - "Community 378"
Cohesion: 0.06
Nodes (29): Tests for web/utils/theme_helper.py., Test initialization without Flask app., Test that get_themes delegates to theme_registry., Tests for ThemeHelper.clear_cache method., Test that clear_cache delegates to theme_registry., Tests for the singleton theme_helper instance., Test that singleton theme_helper instance exists., Test that singleton is a ThemeHelper instance. (+21 more)

### Community 379 - "Community 379"
Cohesion: 0.04
Nodes (25): Tests for LLM-specific rate limit detection.  Tests cover: - Rate limit error, Test that local providers skip rate limiting even when enabled., Return 0 when no retry time is specified., Test the generation of rate limit keys., Test invoke when rate limiting is disabled (always the case now)., Test handling of rate limit errors during invoke., Tests for LLM rate limit error detection., Test successful retry after rate limit error. (+17 more)

### Community 380 - "Community 380"
Cohesion: 0.06
Nodes (30): create_configured_connection(), Tests for SQLCipher backwards compatibility.  These tests verify that database, Verify complex data persists correctly across sessions., Verify SQLCipher settings remain consistent after reopen., Tests for database schema changes across sessions., Verify schema can be modified across sessions., Verify indexes persist across sessions., Create a temporary database path. (+22 more)

### Community 381 - "Community 381"
Cohesion: 0.04
Nodes (28): Comprehensive tests for core/utils.py module. Tests utility functions like utc_, Tests for utc_now function., Test utc_now result can be used in time calculations., Test utc_now result can compare with datetime., Test utc_now result has timestamp method., Test returns a datetime object., Tests for module imports., Test utc_now can be imported. (+20 more)

### Community 382 - "Community 382"
Cohesion: 0.06
Nodes (34): _build_mock_query(), _fake_db_session(), _make_db_session(), _make_rag_service_mock(), _make_settings_mock(), Coverage tests for background / helper functions in rag_routes.py.  Targets li, Context manager that yields a mock db session., Additional coverage for _get_rag_service_for_thread. (+26 more)

### Community 383 - "Community 383"
Cohesion: 0.05
Nodes (19): _make_fake_config(), Test memory requirement estimation., Test automatic GPU selection based on model size and free memory., Create a fake utilization response., Test device_map string generation., Test GPU ID validation., Create a fake HF config-like object for estimation tests., Test CUDA_VISIBLE_DEVICES environment variable setting. (+11 more)

### Community 384 - "Community 384"
Cohesion: 0.06
Nodes (35): auth_headers(), encrypt_key(), _parse_sse_stream(), public_key_pem(), Log in once per session and return auth headers.      On a fresh Studio install, Fetch RSA public key PEM once per session., Download the sloth image once per session and return it as a base64 data URI., Return a callable encrypt_key(plaintext: str) -> str (base64 RSA-OAEP ciphertext (+27 more)

### Community 385 - "Community 385"
Cohesion: 0.07
Nodes (45): _build_trace_analysis(), capture_trace(), _event_depth(), _find_export_dir(), _frame_budget(), _make_highlights(), _metric_category(), _metric_inventory() (+37 more)

### Community 386 - "Community 386"
Cohesion: 0.09
Nodes (15): app(), _auth_client(), _build_mock_query(), _create_app(), _mock_db_manager(), Deep coverage tests for library_routes.py.  Focuses on edge cases and logic pa, TestCheckDownloads, TestDocumentDetailsPage (+7 more)

### Community 387 - "Community 387"
Cohesion: 0.06
Nodes (18): BenchmarkStatus, create_benchmark_tables_simple(), DatasetType, Simple benchmark table definitions for schema creation., Create benchmark tables using simple table definitions., Status of a benchmark run., Supported dataset types., High-value tests for benchmark schema definitions.  Covers: - BenchmarkStatus (+10 more)

### Community 388 - "Community 388"
Cohesion: 0.04
Nodes (13): Extended Tests for PDF Service  Phase 19: Socket & Real-time Services - PDF Se, Tests for PDF generation functionality, Tests for PDF extraction functionality, Tests for HTML to markdown conversion, Tests for CSS generation, Tests for PDF service singleton, Test get_pdf_service returns an instance, Test get_pdf_service returns same instance (+5 more)

### Community 389 - "Community 389"
Cohesion: 0.08
Nodes (41): addDiscoveredFile(), build_runtime_context(), _candidate_dirs_from_env(), _default_windows_install_dirs(), detect_tool_mode(), discover_binaries(), discoverConfigFiles(), discoverReferencedHookScripts() (+33 more)

### Community 390 - "Community 390"
Cohesion: 0.06
Nodes (32): features_path(), is_enabled(), load_features(), Optional feature toggles written by onboarding.  Stored at `.agent/memory/.featu, True iff the feature is explicitly enabled. Off when file missing     or key abs, write_features(), _is_ci(), main() (+24 more)

### Community 391 - "Community 391"
Cohesion: 0.06
Nodes (42): convert_to_path(), get_backup_directory(), get_cache_directory(), get_config_directory(), get_data_dir(), get_data_directory(), get_encrypted_database_path(), get_journal_data_directory() (+34 more)

### Community 392 - "Community 392"
Cohesion: 0.05
Nodes (16): Branch-coverage tests for benchmarks/comparison/evaluator.py.  Targets the rem, _evaluate_single_configuration returns a proper error dict on exception., _calculate_average_metrics averages correctly across all metric types., None values are skipped so the average uses only real numbers., Keys present in only one result still appear in the output., Result always contains quality_metrics, speed_metrics, resource_metrics keys., _create_comparison_visualizations makes the expected matplotlib calls., compare_configurations returns an error dict for an empty list. (+8 more)

### Community 393 - "Community 393"
Cohesion: 0.05
Nodes (26): Edge-case tests for loader_registry module.  Focuses on: - get_loader_for_pat, Notebook entry has include_outputs=True and remove_newline=True., Evernote entry has load_single_document=False., Test that HAS_* flags control whether optional extensions are registered., When HAS_ODT_LOADER is False, .odt must not be in the registry., When HAS_ODT_LOADER is True, .odt must be in the registry., EPUB registration matches HAS_EPUB_LOADER flag., RTF registration matches HAS_RTF_LOADER flag. (+18 more)

### Community 394 - "Community 394"
Cohesion: 0.07
Nodes (23): Tests for the check-datetime-timezone pre-commit hook.  Verifies that the hook, Bare ``Column(DateTime)`` without parens — new stricter handling., PR #3515's migration exemption is intentionally removed.          A migration, ``Column(DateTime() if cond else UtcDateTime())`` — body branch., ``Column(UtcDateTime() if cond else DateTime())`` — orelse branch.          Re, Positive side of the path-filter boundary., Patterns that must exit with returncode 0., ``from sqlalchemy_utc import utcnow, UtcDateTime`` is accepted. (+15 more)

### Community 395 - "Community 395"
Cohesion: 0.06
Nodes (25): _load_pre_prompt_module(), Tests for Bearer P0 security alert fixes (PR #1934).  Verifies: - Shell injec, check_gpu_linux correctly detects NVIDIA GPU from lspci output., check_gpu_linux correctly detects AMD GPU from lspci output., check_gpu_linux handles no GPU detection., check_gpu_linux filters VGA lines in Python, not via shell pipe., Load the pre_prompt module from the cookiecutter-docker hooks directory., Verify check_gpu_windows uses secure subprocess invocation. (+17 more)

### Community 396 - "Community 396"
Cohesion: 0.05
Nodes (30): authenticated_client(), client(), Tests for web/api.py module - REST API endpoints., Create a test client for the API., Tests for API access control decorator., Should return 403 when API is disabled., Tests for rate limiting functionality., Should allow requests under the rate limit. (+22 more)

### Community 397 - "Community 397"
Cohesion: 0.05
Nodes (26): Tests for queue processor v2 pending operations.  Tests cover: - Pending oper, Operations are processed in order., Lock is acquired before processing., Database session is used for updates., Partial failures are handled., Tests for pending operations processing., Tests for queueing progress updates., Progress update creates operation entry. (+18 more)

### Community 398 - "Community 398"
Cohesion: 0.07
Nodes (32): app(), _build_query_chain(), client(), _make_db_session_ctx(), _mock_auth_db_manager(), Extended tests for history route functions.  Covers get_history, get_research_, Verify that limit and offset are clamped to safe ranges., Helper that issues an authenticated GET to /history/api. (+24 more)

### Community 399 - "Community 399"
Cohesion: 0.08
Nodes (43): _assert_contained(), assets_root(), auth_db_path(), auth_root(), cache_root(), _clean_relative_path(), dataset_uploads_root(), datasets_root() (+35 more)

### Community 400 - "Community 400"
Cohesion: 0.05
Nodes (13): Deep behavioral tests for core utility functions. Tests utc_now, hours_ago, gen, Tests for hours_ago function., Test handles datetime without timezone by treating as UTC., Tests for get_local_date_string function., Tests for utc_now function., Tests for generate_card_id., Tests for generate_subscription_id., Card IDs and subscription IDs should typically differ. (+5 more)

### Community 401 - "Community 401"
Cohesion: 0.05
Nodes (26): Input Validation Security Tests  Tests that verify user inputs are properly va, Test that path traversal attempts in queries are sanitized., Test that command injection attempts are prevented., Test validation of research query inputs., Test validation of URL inputs., Test that only allowed URL schemes are accepted., Test that internal/private URLs are blocked (SSRF prevention)., Test that overly long queries are rejected or truncated. (+18 more)

### Community 402 - "Community 402"
Cohesion: 0.05
Nodes (9): Extra coverage tests for settings/manager.py — uncovered branches.  Targets:, Keys like 'search.tool' become 'LDR_SEARCH_TOOL'., TestCheckEnvSetting, TestFilterSettingColumns, TestGetTypedSettingValue, TestInferUiElement, TestParseJsonValue, TestParseMultiselect (+1 more)

### Community 403 - "Community 403"
Cohesion: 0.12
Nodes (27): _authenticated_client(), _create_test_app(), _make_overview_and_token_rows(), _make_usage_mock(), Tests for context overflow API logic paths not covered by existing tests.  Foc, Wire mock_query.first() to return the (merged) overview row., Tests for pagination parameter clamping., page=2, per_page=10 with 15 total → correct pagination metadata. (+19 more)

### Community 404 - "Community 404"
Cohesion: 0.05
Nodes (28): _classify_error(), Tests for run_research_process() core execution logic.  Covers: - Quick vs de, SEARCH_PLAN: in message → engines extracted., ENGINE_SELECTED: in message → engine extracted., Tests for termination checks in research process., Termination requested during progress → raises exception., Replicate error classification logic from run_research_process (lines 714-733)., Tests for search error classification in run_research_process. (+20 more)

### Community 405 - "Community 405"
Cohesion: 0.08
Nodes (42): _blocking_llm(), _llm_raising(), _llm_returning(), _previews(), Direct unit tests for ``relevance_filter`` module.  These exercise ``filter_pr, Chat models return a Message-like object with a ``.content`` attr., Network/provider exceptions raised inside _invoke_structured are     caught by, When max_filtered_results is None, no cap is applied to the     LLM-selected re (+34 more)

### Community 406 - "Community 406"
Cohesion: 0.11
Nodes (42): addBigQueryPrebuiltToolsConfig(), addBigQuerySqlToolConfig(), addClientAuthSourceConfig(), getBigQueryAnalyzeContributionToolInfo(), getBigQueryAuthToolInfo(), getBigQueryDataTypeTestInfo(), getBigQueryForecastToolInfo(), getBigQueryParamToolInfo() (+34 more)

### Community 407 - "Community 407"
Cohesion: 0.05
Nodes (29): End-to-end tests for all task types, Test binary classification workflow, Test multiclass classification, Test multiclass classification workflow, Test complete binary classification workflow, Test multilabel classification, Test multilabel classification workflow, Test multilabel regression (+21 more)

### Community 408 - "Community 408"
Cohesion: 0.06
Nodes (29): encrypted_db(), _open_existing_db(), Tests for SQLCipher rekey (password change) functionality.  These tests verify, Verify all data is preserved after password change., Verify rekey uses the same PBKDF2 key derivation as initial key., Verify password can be changed multiple times., Tests for rekey with special characters in passwords., Verify rekey works with quotes in password. (+21 more)

### Community 409 - "Community 409"
Cohesion: 0.05
Nodes (24): authenticated_client(), patch_db_manager(), Tests verifying that ``@login_required`` rejects unauthenticated requests corre, Stub the auth db_manager so we don't touch a real database.      Default is_us, Test client that passes both auth checks in `login_required`:     a `username`, The four news page routes added in PR #3129 must redirect to login     when the, /news/api/categories must return JSON 401, not an HTML redirect.     This is th, /api/config/limits added in PR #3129 must return JSON 401 for     unauthenticat (+16 more)

### Community 410 - "Community 410"
Cohesion: 0.06
Nodes (23): Tests for the check-safe-requests pre-commit hook.  Ensures the hook correctly, Should allow direct requests in test files., Should not flag safe_get() calls., Should not flag safe_post() calls., Should not flag SafeSession() calls., Should not flag get() calls on other modules., Should report the correct line number for violations., Integration tests for the hook as a whole. (+15 more)

### Community 411 - "Community 411"
Cohesion: 0.06
Nodes (23): _make_fake_chat_ollama(), _open_fd_count(), Tests for ``_close_base_llm`` covering both sync and async httpx clients.  Bac, The async httpx client must be closed via ``asyncio.run`` when no loop     is r, Regression for the v1.6.10 leak. ``_close_base_llm`` used to         skip the a, A close fired from inside a loop should set ``_ldr_closed`` just         like t, If the cleanup thread is still alive after the 5-second join         (e.g. ``ac, Test-local file-descriptor counter.      Inlined here to avoid coupling these (+15 more)

### Community 412 - "Community 412"
Cohesion: 0.05
Nodes (22): Tests for web/utils/formatters.py., Test handling of text that contains only dividers., Test that exceptions are handled and fallback message returned., Test that markdown formatting is preserved., Tests for the convert_debug_to_markdown function., Test complex input with headers, dividers, and content., Test proper handling of unicode characters., Test that empty input returns informative message. (+14 more)

### Community 413 - "Community 413"
Cohesion: 0.09
Nodes (30): _build_link_session(), _make_rating(), _make_resource(), _mock_session_ctx(), Unit tests for metrics_routes pure logic: _extract_domain, get_rating_analytics,, Build a mock session that handles multiple session.query(Model) calls.      ge, Tests for _extract_domain URL normalization., Tests for get_link_analytics aggregation, mocking DB layer. (+22 more)

### Community 414 - "Community 414"
Cohesion: 0.05
Nodes (24): Tests for settings routes batch update logic.  Tests cover: - Batch update lo, Single item batch works., Tests for batch settings update logic., Large batch is processed efficiently., Concurrent batches don't interfere., Prefetch optimization loads all settings., Database is committed after all updates., Tests for settings warning calculation. (+16 more)

### Community 415 - "Community 415"
Cohesion: 0.05
Nodes (39): append_research_log(), check_and_start_research(), cleanup_research(), clear_termination_flag(), get_active_research_count(), get_active_research_ids(), get_active_research_snapshot(), get_research_field() (+31 more)

### Community 416 - "Community 416"
Cohesion: 0.05
Nodes (19): Tests for optimization API functions.  This module tests the convenience funct, Tests for the optimize_for_speed function., Tests for the optimize_for_quality function., Tests for the optimize_for_efficiency function., Tests for the optimize_parameters function., Tests for the get_default_param_space function., Function returns a dictionary., Result contains iterations parameter configuration. (+11 more)

### Community 417 - "Community 417"
Cohesion: 0.08
Nodes (35): _bundled_install(), _command_exists(), _find_npm(), _find_uv(), _generic_install(), _generic_uninstall(), _generic_update(), get_installed() (+27 more)

### Community 418 - "Community 418"
Cohesion: 0.05
Nodes (28): configured_connection(), Tests for SQLCipher performance pragmas.  These tests verify that performance-, Tests for cache size settings., Verify cache_size pragma is applied., Verify temp_store is set to MEMORY., Tests for busy timeout setting., Verify busy_timeout is set to prevent immediate lock failures., Verify busy_timeout allows waiting for locks. (+20 more)

### Community 419 - "Community 419"
Cohesion: 0.11
Nodes (14): _authenticated_client(), _create_test_app(), HTTP integration tests for delete API endpoints.  42 existing tests mock servi, All endpoints redirect (302) for unauthenticated requests.      Note: /library, Context manager providing authenticated test client with mocked services., TestBulkDeleteBlobs, TestBulkDeleteDocuments, TestBulkDeletionPreview (+6 more)

### Community 420 - "Community 420"
Cohesion: 0.05
Nodes (6): Deep coverage tests for security/__init__.py.  The __init__.py conditionally i, These symbols must always be importable regardless of optional deps., Every symbol in __all__ must be defined as an attribute (may be None)., TestConditionalFlags, TestDunderAll, TestRequiredImportsAlwaysPresent

### Community 421 - "Community 421"
Cohesion: 0.05
Nodes (25): Tests for db_utils module., Tests for get_db_session function., Should check Flask g object for db_session., Tests for get_settings_manager function., Should raise error when called from background thread without app context., Should return a SettingsManager instance., Should use provided db_session., Should handle case when no session available. (+17 more)

### Community 422 - "Community 422"
Cohesion: 0.09
Nodes (30): _authenticated_client(), _create_test_app(), _make_setting(), Tests targeting uncovered lines in settings_routes.py.  Covered areas: - save, save_all_settings: corrupted value detection and replacement., save_all_settings: new setting creation failure returns validation error., fix_corrupted_settings: duplicate removal and per-key default values., Duplicate keys are removed; corrupted values get per-key defaults. (+22 more)

### Community 423 - "Community 423"
Cohesion: 0.08
Nodes (39): _bbox_center(), check_geometry(), _compute_area(), _compute_inertia(), _compute_volume(), _get_position(), measure_angle(), measure_area() (+31 more)

### Community 424 - "Community 424"
Cohesion: 0.05
Nodes (17): Tests for database_init.py engine disposal.  These tests verify that SQLAlchem, Tests for engine disposal in init_database()., Test that all expected tables and columns are created., Test that proper indexes are created., Test suite for database initialization and setup., Test that foreign key relationships work correctly., Test cascade delete behavior., Test transaction rollback behavior. (+9 more)

### Community 425 - "Community 425"
Cohesion: 0.08
Nodes (16): Tests for the check-utcnow-parens pre-commit hook.  Verifies that the hook fla, Comments mentioning utcnow() should not be flagged., Direct assignment like existing_rating.created_at = utcnow()., Lines that start with a comment or docstring delimiter must not fire,     even, Key regression: `# default=utcnow is wrong` must not fire., Indented comments also respect the skip., Verify the error messages include useful context., Write content to a temp .py file and run the hook against it. (+8 more)

### Community 426 - "Community 426"
Cohesion: 0.08
Nodes (17): _check_code(), Tests for the check-sensitive-logging pre-commit hook.  Ensures the hook detec, Ensures exception variables are not interpolated in non-debug logs., Ensures safe logging patterns are not flagged., prompt_tokens is about LLM tokens, not auth tokens., Test files should be allowed to log sensitive data for debugging., Parse code and run the sensitive logging checker., Ensures passwords are never logged. (+9 more)

### Community 427 - "Community 427"
Cohesion: 0.09
Nodes (11): _blocked(), _ok(), Pin the default so a regression below 600s without opt-in is caught., test_trusted_host_passes(), TestHostNormalization, TestMaxBodyDefault, TestMetadataHostDenylist, TestSandboxCpuRlimitDefault (+3 more)

### Community 428 - "Community 428"
Cohesion: 0.08
Nodes (23): analyzeSkillHealth(), calculateSuccessRate(), clampFeedback(), collectSkillHealth(), discoverSkills(), extractFeedback(), extractRecords(), extractSuccess() (+15 more)

### Community 429 - "Community 429"
Cohesion: 0.05
Nodes (14): High-value edge case tests for benchmarks/metrics/calculation.py.  Complements, Additional edge cases for combined score calculation., Negative weights are technically allowed by the function., Additional edge cases for resource metrics., Verify the exact formula: iterations * questions * (max_results/50)., Additional edge case tests for calculate_metrics., Verify: resource_score = 1/(1 + complexity/4)., Blank lines between JSON entries are ignored. (+6 more)

### Community 430 - "Community 430"
Cohesion: 0.05
Nodes (22): Tests for benchmarks/metrics/calculation.py  Tests cover: - calculate_metrics, Test handling of results without confidence values., Test handling of invalid confidence values., Tests for the calculate_metrics function., Tests for the calculate_combined_score function., Test combined score with default weights., Test calculation of basic metrics from results file., Test combined score with custom weights. (+14 more)

### Community 431 - "Community 431"
Cohesion: 0.05
Nodes (22): Tests for LLM config provider instantiation.  Tests cover: - Provider instant, llamacpp now talks to llama-server via ChatOpenAI; no in-process load., Tests for provider instantiation., Tests for provider validation., Anthropic instantiation with API key., VALID_PROVIDERS contains expected providers., Invalid provider raises ValueError., Provider name is cleaned of whitespace and quotes. (+14 more)

### Community 432 - "Community 432"
Cohesion: 0.07
Nodes (23): Tests for the check-css-class-prefix pre-commit hook.  Specifically guards aga, Bootstrap and other framework classes must pass the prefix check., `.ldr-foo.active` must pass — `active` is allowlisted., Lines that are CSS comments or @import should not be scanned., The HTML scanner uses the same regex inside <style> blocks., A `.ldr-foo.bare` literal outside <style> isn't a CSS rule definition;, Write content to a temp file and run the hook against it., The fix in PR #3103: every class in a compound selector must be checked. (+15 more)

### Community 433 - "Community 433"
Cohesion: 0.05
Nodes (17): Comprehensive tests for headline_generator module. Tests headline generation wi, Tests for generate_headline function., Tests for _generate_with_llm behavior through the public API., Test returns None when no findings provided., Test _generate_with_llm function exists and is callable., Test accepts query, findings, and max_length parameters., Test returns None for empty string findings., Test handles whitespace-only findings. (+9 more)

### Community 434 - "Community 434"
Cohesion: 0.09
Nodes (20): _get_function_decorators(), _get_module_level_assignments(), _get_module_source(), _parse_source(), Tests for rate limiting decorators on news API routes.  Verifies that the PR a, Test that rate limit values are reasonable., Research triggers AI work so should have the lowest limit., Feedback is lightweight so can allow more requests. (+12 more)

### Community 435 - "Community 435"
Cohesion: 0.05
Nodes (23): Tests for checkbox settings save behavior.  Verifies that checkbox settings (b, Test how form data is processed for checkbox settings., Form data with 'false' string should be converted to False boolean., AJAX JSON with false boolean should be preserved as False., Test that boolean settings can be saved as true and false., Test handling of missing checkbox values (key not in form data)., When checkbox value is None, default value is returned., parse_boolean should return False for 'false' string. (+15 more)

### Community 436 - "Community 436"
Cohesion: 0.05
Nodes (24): Edge-case tests for json_utils — cleaning pipelines, bracket extraction, and typ, First-pair-wins behavior with 4+ fence delimiters., Tests for expected_type parameter in extract_json., When expected_type=list and text contains dict with a list value,         brack, When expected_type=dict and text is a plain list, returns None., Common LLM pattern: wrapping a dict in a list. With expected_type=dict,, Tests for _extract_by_brackets with prose around JSON., rfind('}') finds the LAST brace, which may be in trailing prose. (+16 more)

### Community 437 - "Community 437"
Cohesion: 0.1
Nodes (24): _authenticated_client(), _create_test_app(), HTTP integration tests for context overflow API endpoints.  The existing 673 u, Wire mock_query.first() for the merged single-query route.      The route now, Tests for GET /api/context-overflow., Unauthenticated request returns 401., Default period (30d) returns success with overview., period=7d is a valid period. (+16 more)

### Community 438 - "Community 438"
Cohesion: 0.08
Nodes (10): _exc_with_response(), _exc_with_type(), Tests for LLM rate limit error detection and retry-after extraction.  Tests co, Exception without .response attribute doesn't crash., Tests for extract_retry_after()., Build an Exception whose .response has a status_code and headers., Build an exception whose __class__.__name__ and __module__ are set., Tests for is_llm_rate_limit_error(). (+2 more)

### Community 439 - "Community 439"
Cohesion: 0.08
Nodes (37): activate_transformers_for_subprocess(), _activate_venv(), _check_config_needs_550(), _check_tokenizer_config_needs_v5(), _deactivate_5x(), ensure_transformers_version(), _ensure_venv_dir(), _ensure_venv_t5_530_exists() (+29 more)

### Community 440 - "Community 440"
Cohesion: 0.06
Nodes (37): create_svg_element(), find_all_shapes(), find_defs(), find_element_by_id(), generate_id(), get_element_style(), _ns(), parse_style() (+29 more)

### Community 441 - "Community 441"
Cohesion: 0.09
Nodes (37): analyze_capture(), _build_analysis(), _capture_type(), _compact_result(), _first_value(), _has_files(), _is_no_error_line(), _load_json_artifact() (+29 more)

### Community 442 - "Community 442"
Cohesion: 0.12
Nodes (35): analyzeRecord(), areFilesEqual(), buildDoctorReport(), buildIssue(), buildRecordedStatePreview(), cloneJsonValue(), compareStringArrays(), createRepairPlanFromRecord() (+27 more)

### Community 443 - "Community 443"
Cohesion: 0.05
Nodes (11): Tests for Research API endpoints.  Phase 32: API Endpoint Tests - Tests for re, Tests for _init_search_system function., Tests for quick_summary function., Tests for API input validation., Tests for API error handling., Integration tests for research API., TestInitSearchSystem, TestQuickSummary (+3 more)

### Community 444 - "Community 444"
Cohesion: 0.05
Nodes (20): Tests for uncovered code paths in graders.py.  Targets: - extract_answer_from, Tests for extract_answer_from_response., SimpleQA mode returns full response as extracted answer., Tests for human_evaluation non-interactive mode., human_evaluation in non-interactive mode marks all as incorrect., human_evaluation handles empty results file., Tests for _grade_results_inner., _grade_results_inner calls progress callback correctly. (+12 more)

### Community 445 - "Community 445"
Cohesion: 0.05
Nodes (20): Ensure cipher page size hasn't changed.          Changing this will make exist, Ensure KDF algorithm hasn't changed.          Changing this will make existing, Verify the key derivation function produces the expected output.          This, Test the per-database salt functionality (v2 databases).      New databases us, Verify salt file paths are generated correctly., Verify that created salts are the correct size., Verify that each call to create_database_salt generates a unique salt., Verify that encryption constants haven't changed.      CRITICAL: These values (+12 more)

### Community 446 - "Community 446"
Cohesion: 0.05
Nodes (22): High-value edge case tests for embeddings/splitters/text_splitter_registry.py., Test is_semantic_chunker_available., Return type is exactly bool, not a truthy ModuleSpec., Validate the VALID_SPLITTER_TYPES constant., VALID_SPLITTER_TYPES is a list (not set or tuple)., There are exactly 4 valid splitter types., Edge cases for recursive splitter type., Default separators are in the exact expected order. (+14 more)

### Community 447 - "Community 447"
Cohesion: 0.05
Nodes (20): API Security Tests  Tests that verify API endpoints follow security best pract, Test protection against resource exhaustion attacks.          Attack vectors:, Test that administrative functions require admin privileges.          Common i, Test API security based on OWASP API Security Top 10 2023., Test prevention of Server-Side Request Forgery.          SSRF: Attacker makes, Test for common security misconfigurations.          Common issues:         -, Test API input validation., Test that malformed JSON is rejected gracefully. (+12 more)

### Community 448 - "Community 448"
Cohesion: 0.05
Nodes (18): Authentication Security Tests  Tests that verify authentication mechanisms are, Test that logout completely invalidates the session., Test password security and hashing., Test access control and authorization., Test that protected resources require authentication., Test edge cases and attack scenarios., Test protection against brute force login attacks., Test that login doesn't leak username existence. (+10 more)

### Community 449 - "Community 449"
Cohesion: 0.05
Nodes (26): unsloth/models/rl.py:579-618 looks for the *Config sibling of the     Trainer cl, Either the new path (trl.trainer.dpo_trainer) or the old path     (trl.trainer.u, unsloth/models/rl.py:152-155 tries     `trl.models.utils.unwrap_model_for_genera, unsloth/models/rl_replacements.py:1851-1971 string-rewrites     `VLLMGeneration., unsloth/tokenizer_utils.py:1538 does `from trl.trainer.sft_trainer     import *`, Method names unsloth string-rewrites against. Drift here     silently skips the, rl_replacements.py:526-535 inserts an autocast block immediately     AFTER `with, TRL 0.27+ moved KTOTrainer to trl.experimental.kto and the     canonical kto_tra (+18 more)

### Community 450 - "Community 450"
Cohesion: 0.09
Nodes (35): build_engine_program(), build_insights_command(), build_insights_command_line(), _build_resolution(), _candidate_binary_paths(), _default_search_roots(), ensure_engine_unrealinsights(), ensure_parent_dir() (+27 more)

### Community 451 - "Community 451"
Cohesion: 0.12
Nodes (13): _make_filter(), _make_results(), High-value pure logic tests for CrossEngineFilter., Tests for the early-return path when model is None., Create a CrossEngineFilter with __init__ bypassed., Tests for the early-return path when len(results) <= 10., Tests verifying reorder/reindex default resolution from instance., Build a list of result dicts with sequential indices. (+5 more)

### Community 452 - "Community 452"
Cohesion: 0.06
Nodes (18): Tests for authentication rate limiting (login and registration endpoints). Test, Test that 429 response includes Retry-After header., Test that registration allows 3 attempts before rate limiting., Test rate limiting on authentication endpoints., Test that registration blocks the 4th attempt within 1 hour., Test that password change blocks the 6th attempt., Test that login and password change have independent rate limits., Test that login and registration have independent rate limits. (+10 more)

### Community 453 - "Community 453"
Cohesion: 0.06
Nodes (23): Tests for SQLCipher key derivation functions.  These tests verify that passwor, Verify derived key has correct length (64 bytes = 512 bits for SHA512)., Verify empty password still produces a valid key (validation is elsewhere)., Tests for key derivation in actual database operations., Verify derived key can create and open a database., Verify wrong password cannot open database., Verify rekey produces key compatible with set_sqlcipher_key., Create a temporary database path. (+15 more)

### Community 454 - "Community 454"
Cohesion: 0.06
Nodes (21): Behavioral tests for config/paths module.  Tests the real logic: LDR_DATA_DIR, Hash portion is exactly 16 lowercase hex characters., Path-traversal chars in username don't leak into filename., Unicode usernames are encoded as UTF-8 before hashing., Tests for LDR_DATA_DIR environment variable handling., Empty string is valid input — SHA-256('') starts with e3b0c442., Tests for structural invariants across all subdirectory functions., Each subdirectory function returns the right name under data dir. (+13 more)

### Community 455 - "Community 455"
Cohesion: 0.06
Nodes (22): Extended tests for paths module - covering untested directory functions., LDR_DATA_DIR override should affect all directory functions., All directory functions should return different paths., Tests for get_library_directory function., Should return library subdirectory of data dir., Should create directory if it doesn't exist., Should return Path object., Calling twice should work fine when directory already exists. (+14 more)

### Community 456 - "Community 456"
Cohesion: 0.06
Nodes (13): Tests for database/library_init.py.  Tests the library initialization module w, Tests for ensure_default_library_collection function., Tests for ensure_research_history_collection function., Tests for initialize_library_for_user function., Tests for seed_source_types function., Tests for get_default_library_id function., Tests for get_source_type_id function., TestEnsureDefaultLibraryCollection (+5 more)

### Community 457 - "Community 457"
Cohesion: 0.06
Nodes (16): Tests for news/utils/topic_generator.py  Tests cover: - Topic generation with, Test that empty input returns failure indicator., Test that all invalid topics returns failure indicator., Tests for the generate_topics function., Tests for the _validate_topics function., Tests for the _generate_with_llm function., Test that empty topics are removed., Test that topics shorter than 2 chars are removed. (+8 more)

### Community 458 - "Community 458"
Cohesion: 0.06
Nodes (23): Edge-case tests for url_utils.normalize_url and network_utils.is_private_ip., Link-local fe80:: should be treated as private -> http., Malformed URL handling., http:///path is already prefixed with http:// so it passes through., https:host.com/api/v1 -> https://host.com/api/v1., Query strings and fragments are preserved., Query strings preserved through normalization., IPv6 handling in normalize_url. (+15 more)

### Community 459 - "Community 459"
Cohesion: 0.06
Nodes (20): Coverage tests for route_registry.py targeting ~4 missing statements.  Uncover, Deeper checks for get_routes_by_blueprint., Tests for get_routes_by_blueprint., Non-existent blueprint returns empty list., Known blueprint returns non-empty route list., Tests for get_all_routes., Returns routes from every registered blueprint., Blueprints with url_prefix=None produce root-level paths. (+12 more)

### Community 460 - "Community 460"
Cohesion: 0.1
Nodes (25): auth_client(), data_recipe_jobs_module(), local_recipe(), local_recipe_request(), Single-use rotation rejects the same token on a second consume., 64-thread pile-up against one token; DELETE RETURNING permits one winner., seed_user(), test_clear_desktop_secret_invalidates_secret() (+17 more)

### Community 461 - "Community 461"
Cohesion: 0.06
Nodes (19): Accessibility Backend Tests Tests for HTML structure and semantic markup access, Test that ARIA attributes are properly set where needed, Test HTML structure for accessibility compliance, Test that keyboard navigation hints are present, Test that forms have proper structure, Test that semantic HTML5 elements are used, Test that required fields are properly marked, Test that all form inputs have proper labels (+11 more)

### Community 462 - "Community 462"
Cohesion: 0.1
Nodes (11): _make_strategy(), High-value pure logic tests for FocusedIterationStrategy.  Tests cover constru, Verify the structure returned by _create_error_response., Instantiate FocusedIterationStrategy with all heavy deps patched out., Verify knowledge summary building logic., Verify default attribute values set during __init__., Verify int coercion and None-fallback logic for iteration params., TestConstructorDefaults (+3 more)

### Community 463 - "Community 463"
Cohesion: 0.06
Nodes (12): High-value pure logic tests for benchmarks/runners.py.  Focuses on format_quer, Empty string dataset type is not 'browsecomp', so returns unchanged., Only exact match (case-insensitive) should trigger template., Tests for format_query with simpleqa dataset type., Tests for format_query with special characters in questions., Curly braces in question should not break template formatting., Tests for format_query with browsecomp dataset type., Tests for format_query with unknown/other dataset types. (+4 more)

### Community 464 - "Community 464"
Cohesion: 0.18
Nodes (34): _make_doc_collection(), _make_document(), _make_service(), _make_session_ctx(), Coverage tests for LibraryRAGService — index/stats/remove paths.  Targets unco, Instantiate LibraryRAGService with all heavy deps fully mocked., Return a context-manager mock wrapping *session*., Build a minimal mock Document ORM object. (+26 more)

### Community 465 - "Community 465"
Cohesion: 0.08
Nodes (14): _mock_db_with_context_records(), Tests for DB-backed context warning checks.  Only mock needed: SQLAlchemy sess, Tests for check_context_truncation_history., Build a mock db_session that returns *records* for the context query     and *t, Truncation warnings carry actionUrl/actionLabel pointing to the diagnostic page., Tests for check_context_below_history., Boundary: exactly 5 records should be sufficient., Boundary: 4 records is below the threshold of 5. (+6 more)

### Community 466 - "Community 466"
Cohesion: 0.06
Nodes (18): Behavioral tests for config/llm_config module.  Tests availability checks with, Surrounding quotes are stripped: \"'none'\" → 'none' (valid but unimplemented)., Surrounding whitespace is stripped: '  none  ' → 'none'., Tests for is_*_available() functions with settings snapshots.      These funct, Provider name is lowercased: 'NONE' → 'none'., Combined cleaning: \"  'None'  \" → 'none'., Tests for get_selected_llm_provider() function., Provider value from snapshot is lowercased. (+10 more)

### Community 467 - "Community 467"
Cohesion: 0.06
Nodes (20): Tests for database initialize module functions., Tests for _initialize_default_settings function., _initialize_default_settings calls SettingsManager methods., Tests for check_database_schema function., _initialize_default_settings skips update when version matches., _initialize_default_settings handles errors without raising., check_database_schema returns dict with 'tables' key., Tests for initialize_database function. (+12 more)

### Community 468 - "Community 468"
Cohesion: 0.06
Nodes (17): CSRF (Cross-Site Request Forgery) Protection Tests  Tests that verify CSRF pro, Test CSRF protection for JSON API requests., Test CSRF protection in web forms and API endpoints., Test that CSRF tokens can be regenerated., Test that state-changing operations require CSRF protection., Test double-submit cookie CSRF protection pattern (if implemented)., Test that some endpoints may be exempt from CSRF protection., Documentation tests for CSRF protection strategy. (+9 more)

### Community 469 - "Community 469"
Cohesion: 0.09
Nodes (32): _mock_response(), _mock_response_body_raises(), Exponential-backoff retry wrapper for `safe_get`., ValueError means SSRF rejection — retrying would just re-fail., 4xx (other than 429) is caller's fault — no retry., A hostile Retry-After: 86400 must not pin the worker for a day., RFC 7231 HTTP-date form must be parsed, not silently ignored., Garbage Retry-After falls back to the backoff schedule. (+24 more)

### Community 470 - "Community 470"
Cohesion: 0.12
Nodes (21): find_exe(), main(), parseShardArg(), Check if the web server is running., Start the web server using pdm run ldr-web., Stop the web server if we started it., Run health check tests., Finds a particular command-line tool.      Args:         tool_name: The name (+13 more)

### Community 471 - "Community 471"
Cohesion: 0.06
Nodes (24): Extended Tests for Queue Middleware  Phase 20: API Client & Authentication - Q, Tests for queue middleware v2 module, Test queue middleware v2 can be imported, Test notify_queue_processor function exists, Tests for middleware optimizer functions, Test middleware optimizer can be imported, Test should_skip_queue_checks function exists, Tests for original queue middleware (+16 more)

### Community 472 - "Community 472"
Cohesion: 0.06
Nodes (18): Tests for metrics routes time series data.  Tests cover: - Time series data h, Weekly aggregation works., Tests for time series data handling., Empty periods return empty list., Single data point is handled., Timezones are handled consistently., 7 day period boundary is correct., Large datasets are handled. (+10 more)

### Community 473 - "Community 473"
Cohesion: 0.06
Nodes (18): Tests for settings routes API endpoints.  Tests cover: - Settings CRUD API op, Tests for settings API endpoints., Import from defaults creates settings., Reset replaces with defaults., Get single setting succeeds., API requires authentication., API handles session correctly., API respects rate limits. (+10 more)

### Community 474 - "Community 474"
Cohesion: 0.09
Nodes (19): _authenticated_client(), _create_test_app(), HTTP security tests for settings routes.  Existing unit tests cover corrupted, POST with empty JSON object triggers 'No settings data provided'., The three write routes must reject new keys outside allowed namespaces., PUT to a new key under a blocked prefix returns 400, not 403/201., Unknown prefixes (neither allow nor block) also return 400., save_all_settings rejects new keys in blocked namespaces via validation_errors. (+11 more)

### Community 475 - "Community 475"
Cohesion: 0.06
Nodes (28): unsloth-zoo loss_utils.py:241 replaces Trainer.get_batch_samples;     upstream s, unsloth-zoo#543: transformers 5.0+ changed     `tr_loss = tr_loss + tr_loss_step, unsloth-zoo#549: transformers 5.2+ uses `transformers.modeling_utils.checkpoint`, unsloth-zoo#393: transformers 5.x removed PushToHubMixin._create_repo.     On 4., unsloth-zoo#491/#488: 5.x moved is_replaceable to     quantizers_utils.should_co, unsloth-zoo#572: transformers 5.x renamed FP8Linear.__init__     `bias` -> `has_, unsloth-zoo#583/584: `from transformers.processing_utils import Unpack`     must, unsloth#5155: resolve_model_class iterates private attrs of     _LazyAutoMapping (+20 more)

### Community 476 - "Community 476"
Cohesion: 0.09
Nodes (33): assign_material(), create_material(), export_material(), _get_material(), import_material(), list_materials(), list_presets(), _next_id() (+25 more)

### Community 477 - "Community 477"
Cohesion: 0.09
Nodes (33): api_delete(), api_get(), api_patch(), api_post(), api_request(), exchange_code(), get_authorize_url(), get_config_dir() (+25 more)

### Community 478 - "Community 478"
Cohesion: 0.06
Nodes (12): Full coverage tests for document_loaders/loader_registry.py.  Targets uncovere, Cover get_loader_for_path with unsupported extensions., Returns None for file with unsupported extension., Cover case-insensitive extension checking., Returns None for file with no extension., Accepts string path input., Cover get_supported_extensions., Test conditional loader registration flags. (+4 more)

### Community 479 - "Community 479"
Cohesion: 0.12
Nodes (30): _make_attempt(), _make_estimate(), _mock_session_ctx(), Unit tests for get_strategy_analytics and get_rate_limiting_analytics.  These, Wire up get_user_db_session mock as context manager., Create a mock RateLimitAttempt., Create a mock RateLimitEstimate., Tests for get_rate_limiting_analytics aggregation logic. (+22 more)

### Community 480 - "Community 480"
Cohesion: 0.1
Nodes (32): _analytics_dir(), _build_posthog_payload(), _build_umami_payload(), detect_invocation_context(), _detect_is_agent(), _flush_pending(), _get_distinct_id(), _is_enabled() (+24 more)

### Community 481 - "Community 481"
Cohesion: 0.06
Nodes (20): Tests for uncovered code paths in embeddings_config.py.  Targets: - get_embed, Returns embed_documents method from embeddings object., Tests for get_available_embedding_providers., Returns all providers when all are available., Returns empty dict when no providers available., Returns only available providers., Tests for individual provider availability checks., Tests for get_embeddings function. (+12 more)

### Community 482 - "Community 482"
Cohesion: 0.09
Nodes (15): Tests for the check-env-vars pre-commit hook.  Covers regressions for the subs, Path-anchored entry: 'security/rate_limiter.py'., A file literally named rate_limiter.py at a different path must     NOT be exem, Sanity check — normal production files are still flagged., Production files whose paths merely contain an allowlist substring     must no, protest_handler.py' contains substring 'test_'., foo_settings_override.py' contains substring 'settings/' is         false, but, A basename containing 'scripts' is not a scripts/ directory. (+7 more)

### Community 483 - "Community 483"
Cohesion: 0.06
Nodes (17): Test route registry functionality, Test find_route function, Test that route paths are unique within their method, Test that API routes follow consistent patterns, Test the route registry module, Test that routes with research_id parameter are consistent, Test settings API routes specifically, Test that ROUTE_REGISTRY has the expected structure (+9 more)

### Community 484 - "Community 484"
Cohesion: 0.06
Nodes (10): Unit tests for the pure-function scoring helpers in ``journal_quality.scoring``, Single source of truth for institution h-index → score mapping.      `db.score, Helper used by the build pipeline + the runtime accessor., Tests for the new ``quartile`` parameter on ``derive_quality_score``.      Qua, The 1–10 quality score rubric., Preprint repositories (arXiv, bioRxiv, ...) are not peer-         reviewed — th, TestDeriveQualityScore, TestDeriveQualityScoreQuartile (+2 more)

### Community 485 - "Community 485"
Cohesion: 0.06
Nodes (17): XSS (Cross-Site Scripting) Prevention Tests  Tests that verify user inputs are, Document that Markdown requires additional sanitization for XSS prevention., Test that URL parameters are sanitized against XSS., Test XSS prevention in web interface and API responses., Test that responses have proper Content-Type headers to prevent XSS., Test that research content from external sources is sanitized., Test Content Security Policy (CSP) headers., Test that Content-Security-Policy headers are set (recommended). (+9 more)

### Community 486 - "Community 486"
Cohesion: 0.06
Nodes (19): Extended tests for url_utils.py - covering IPv6, fragments, and edge cases., External hostname with port and no scheme should get https., IPv6 loopback [::1] should get http:// scheme., // prefix with private IP should resolve to http., URL with user info (user:pass@host) should be preserved., IPv6 address with brackets should be handled correctly., IPv6 URL with existing scheme should be returned unchanged., Tests for URL fragment/anchor handling. (+11 more)

### Community 487 - "Community 487"
Cohesion: 0.07
Nodes (7): _clean_globals(), Tests for globals.py — gap coverage.  Covers the three functions with zero tes, Reset all global state before each test., TestCheckAndStartResearch, TestGetUsernamesWithActiveResearch, TestIsResearchThreadAlive, TestUpdateProgressAndCheckActive

### Community 488 - "Community 488"
Cohesion: 0.06
Nodes (9): Tests for Ollama status/model check endpoints in api_routes.py., Tests for /check/ollama_status endpoint., Tests for /check/ollama_model endpoint., When provider is not ollama, should return available=True., When provider is not ollama, should return running=True., No model in query and llm.model unset → HTTP 400 + error_type., Same path when 'model' key is absent from config entirely., TestCheckOllamaModel (+1 more)

### Community 489 - "Community 489"
Cohesion: 0.06
Nodes (12): Tests for route_registry functions and data structure., Tests for the ROUTE_REGISTRY dict itself., Tests for get_all_routes()., Routes from blueprints with a url_prefix get that prefix in the path., Routes with url_prefix=None keep their original path., Tests for get_routes_by_blueprint()., research blueprint has url_prefix=None so paths are root-level., Tests for find_route(). (+4 more)

### Community 490 - "Community 490"
Cohesion: 0.06
Nodes (20): Tests for web/services/settings_service.py  Tests cover: - set_setting functi, Test getting settings when none exist., Tests for create_or_update_setting function., Test creating/updating setting with dict., Tests for set_setting function., Test creating/updating with Setting object., Test successful setting update., Test that None is returned on failure. (+12 more)

### Community 491 - "Community 491"
Cohesion: 0.1
Nodes (31): _dominant_axis(), _emit_primitive(), _gen_bodies(), _gen_boolean_ops(), _gen_export(), _gen_header(), _gen_parts(), _gen_placements() (+23 more)

### Community 492 - "Community 492"
Cohesion: 0.15
Nodes (27): acquireStateLock(), extractPerformanceMetricsRowPhase(), formatRoadmapEvolutionEntry(), isLockProcessDead(), parseNamedArgs(), prunePass(), readModifyWriteStateMd(), readModifyWriteStateMdFull() (+19 more)

### Community 493 - "Community 493"
Cohesion: 0.06
Nodes (17): Full coverage tests for benchmarks/graders.py.  Targets uncovered paths: - ge, Cover _grade_results_inner callable fallback path., Falls back to calling LLM as callable when no invoke method., Batch grading uses HumanMessage when LLM has chat_messages., Cover error handling with progress_callback in _grade_results_inner., Cover get_evaluation_llm API key handling branches., Progress callback receives error status when grading fails., Cover grade_results wrapper with safe_close. (+9 more)

### Community 494 - "Community 494"
Cohesion: 0.06
Nodes (8): Behavioral tests for benchmarks/metrics/calculation module.  Tests pure logic, Quality has default weight 0.6, so it dominates the score., Tests for calculate_resource_metrics() function., Tests for calculate_metrics() function with temp files., Tests for calculate_combined_score() function., TestCalculateCombinedScore, TestCalculateMetrics, TestCalculateResourceMetrics

### Community 495 - "Community 495"
Cohesion: 0.06
Nodes (8): Extra coverage tests for config/llm_config.py — provider availability and contex, is_llamacpp_available now probes llama-server's HTTP endpoint., Each is_*_available catches both ImportError and Exception.     Test the Except, TestGetAvailableProviders, TestGetContextWindowForProvider, TestGetSelectedLlmProvider, TestIsLlamacppAvailable, TestProviderAvailabilityExceptionPaths

### Community 496 - "Community 496"
Cohesion: 0.09
Nodes (16): Test JavaScript URL configuration consistency This tests that the JavaScript UR, Check if two URLs match, accounting for parameter differences, Test that URLBuilder utility methods are defined, Test that JavaScript URL configuration matches backend routes, Test that URLs follow consistent patterns, Test that API URLs follow RESTful patterns, Test that settings API URLs are consistent, Test that metrics API URLs are consistent (+8 more)

### Community 497 - "Community 497"
Cohesion: 0.06
Nodes (11): Extended tests for text_cleaner.remove_surrogates.  Adds edge cases for surrog, Emoji and special symbol preservation., Special and boundary cases., Mixed script handling., Surrogate pair specific tests., Performance and large input tests., TestRemoveSurrogatesEmojiAndSymbols, TestRemoveSurrogatesLargeInput (+3 more)

### Community 498 - "Community 498"
Cohesion: 0.06
Nodes (11): Tests for rate limiting and notification endpoints in settings_routes.py., Tests for /api/rate-limiting/status endpoint., Tests for /api/rate-limiting/cleanup endpoint., Tests for /api/ollama-status endpoint in settings_routes., Tests for /api/notifications/test-url endpoint., Tests for /api/rate-limiting/engines/<engine_type>/reset endpoint., TestApiCleanupRateLimiting, TestApiGetRateLimitingStatus (+3 more)

### Community 499 - "Community 499"
Cohesion: 0.06
Nodes (14): Tests for research_service helper functions.  Tests cover: - _parse_research_, Tests for export_report_to_memory with mocked exporter registry., Tests for _parse_research_metadata helper., A plain dict input is returned unchanged (as a copy)., A valid JSON string is parsed into a dict., An invalid JSON string returns an empty dict., None input returns an empty dict., An integer input returns an empty dict. (+6 more)

### Community 500 - "Community 500"
Cohesion: 0.06
Nodes (6): High-value tests for web/warning_checks/hardware.py - Hardware Warnings., High context warning for local providers., Model mismatch warning for large models with high context., TestCheckHighContext, TestCheckModelMismatch, TestLocalProviders

### Community 501 - "Community 501"
Cohesion: 0.14
Nodes (14): _make_llm(), Tests for pure logic in the LLM rate limit wrapper.  Tests cover: - _check_if, Tests for RateLimitedLLMWrapper._get_rate_limit_key()., Falls back from model_name to model attribute., Falls back to _client.base_url when base_url absent., Build a simple namespace that acts as an LLM with given attributes., Build a RateLimitedLLMWrapper (rate limiting disabled by default)., Tests for RateLimitedLLMWrapper._check_if_local_model(). (+6 more)

### Community 502 - "Community 502"
Cohesion: 0.12
Nodes (2): initMobileNav(), MobileNavigation

### Community 503 - "Community 503"
Cohesion: 0.07
Nodes (11): Test context overflow detection for LLM calls., Test that raw Ollama metrics are properly captured., Test that context limit is properly read from research context., Test that prompt size is estimated correctly., Test suite for context overflow detection., Test that no overflow is detected for small prompts., Test that overflow fields are saved to database., Integration tests with actual Ollama (when available). (+3 more)

### Community 504 - "Community 504"
Cohesion: 0.08
Nodes (19): _make_exception(), Extended tests for rate_limiting/llm/detection.py — provider-specific detection., anthropic' in module + unrelated message -> False., Edge cases for extract_retry_after., Non-numeric Retry-After header (date string) is handled gracefully., retry after 30.5 seconds' with decimal -> 30.5., Multiple patterns in same message -> first match returned., No matching patterns -> returns 0. (+11 more)

### Community 505 - "Community 505"
Cohesion: 0.07
Nodes (16): Tests for web/auth/database_middleware.py  Tests cover: - ensure_user_databas, Should store password in session password store after temp auth., Tests for ensure_user_database function., Should retrieve password from session password store., Should skip when should_skip_database_middleware returns True., Should use dummy password for unencrypted database., Should set _db_initialized flag when database is opened., Should set g.username. (+8 more)

### Community 506 - "Community 506"
Cohesion: 0.07
Nodes (18): Edge case tests for calculate_duration() in web/models/database.py.  These tes, Tests for space-separated timestamp formats., Space-separated format with microseconds and timezone., Space-separated format without microseconds, with timezone., Space-separated with timezone falls back to replace(' ', 'T')., Tests for the dateutil.parser.parse fallback code paths., ISO format with explicit UTC offset., Weird completed_at format that fails fromisoformat but dateutil can parse. (+10 more)

### Community 507 - "Community 507"
Cohesion: 0.09
Nodes (18): create_evaluator(), evaluate_ocr_model(), OCRModelEvaluator, OCR Model Evaluation Module  This module provides functionality to evaluate OCR, Extract ground truth, image, question, and input messages from sample., Generate response from the model., A comprehensive OCR model evaluator that supports multiple models and provides, Save individual sample result to file. (+10 more)

### Community 508 - "Community 508"
Cohesion: 0.1
Nodes (29): _engine_to_bpy(), _gen_cameras(), _gen_keyframes(), _gen_lights(), _gen_materials(), _gen_modifier(), _gen_object_parenting(), _gen_objects() (+21 more)

### Community 509 - "Community 509"
Cohesion: 0.07
Nodes (16): Test DOM content sanitization., Normal text should pass through unchanged., Empty text should return empty., None text should return None., Long text should be truncated., Prompt injection pattern should be flagged., forget instructions' pattern should be flagged., disregard above' pattern should be flagged. (+8 more)

### Community 510 - "Community 510"
Cohesion: 0.11
Nodes (29): _col_to_index(), create_spreadsheet(), export_csv(), get_cell(), _get_sheet(), import_csv(), _index_to_col(), list_spreadsheets() (+21 more)

### Community 511 - "Community 511"
Cohesion: 0.12
Nodes (29): applyGenericTransform(), applyTransform(), clear_transform(), _format_number(), _get_object(), get_transform(), parse_transform_string(), Inkscape CLI - Transform operations module.  Handles translate, rotate, scale, (+21 more)

### Community 512 - "Community 512"
Cohesion: 0.1
Nodes (29): _augmented_path(), _build_env(), _find_pm2(), _get_pm2(), pm2_action(), pm2_describe(), pm2_flush(), pm2_jlist() (+21 more)

### Community 513 - "Community 513"
Cohesion: 0.09
Nodes (11): assertNoProjectDetectionSideEffects(), assertObserveSkipBeforeProjectDetection(), asyncTest(), cleanupTestDir(), createTestDir(), fromBashPath(), normalizeComparablePath(), runShellScript() (+3 more)

### Community 514 - "Community 514"
Cohesion: 0.1
Nodes (15): Tests for the check-url-security pre-commit hook.  Covers regressions for prev, A comment mentioning 'javascript:' + any unrelated .includes() used to pass., Files that actually import URLValidator still pass., Files that don't handle external URLs should pass., Write content to a temp file with a specific path and run the hook., Files whose names merely contain 'test'/'spec' as substrings must be scanned., attestation_service.js' contains substring 'test' but is not a test file., latest_products.js' contains substring 'test'. (+7 more)

### Community 515 - "Community 515"
Cohesion: 0.07
Nodes (15): Behavioral tests for web/utils/formatters module.  Tests convert_debug_to_mark, Preserves bullet points in content., Handles DETAILED FINDINGS with divider lines., Multiple lines of content are preserved., Query appears in fallback message for None input., None input returns informative message., Empty string returns informative message., Plain text without special markers is returned stripped. (+7 more)

### Community 516 - "Community 516"
Cohesion: 0.07
Nodes (15): Tests for web/auth/cleanup_middleware.py  Tests cover: - cleanup_completed_re, Should not delete records for active research., Should handle OperationalError gracefully., Tests for cleanup_completed_research function., Should handle PendingRollbackError gracefully., Should handle TimeoutError gracefully., Should handle generic exceptions gracefully., Should handle rollback failure gracefully. (+7 more)

### Community 517 - "Community 517"
Cohesion: 0.07
Nodes (19): base_engine(), _FakeWrapperAcceptsAll, _FakeWrapperWithApiKey, Tests for _create_full_search_wrapper in search_engine_factory.py.  The wrappe, Tests for API key extraction from settings snapshots., API key extraction from {"value": "key"} format in settings., API key extraction from plain string format in settings., Provide a mock base engine. (+11 more)

### Community 518 - "Community 518"
Cohesion: 0.21
Nodes (2): parseResults(), Source

### Community 519 - "Community 519"
Cohesion: 0.08
Nodes (27): apply_style(), create_style(), get_object_style(), list_style_properties(), list_styles(), modify_style(), LibreOffice CLI - Document styles module., Get the parsed style dict of an object. (+19 more)

### Community 520 - "Community 520"
Cohesion: 0.13
Nodes (2): PhaseRunner, PhaseRunnerError

### Community 521 - "Community 521"
Cohesion: 0.1
Nodes (26): _build_csl_json(), detect_engine(), _extract_arxiv_id(), _extract_doi(), _infer_item_type(), normalize_citation(), normalize_issn(), _parse_authors_list() (+18 more)

### Community 522 - "Community 522"
Cohesion: 0.14
Nodes (1): PDFUploadHandler

### Community 523 - "Community 523"
Cohesion: 0.07
Nodes (17): End-to-end tests for API settings in research workflows., Test end-to-end research workflows with various settings., Test that settings don't leak between API calls., Test scenarios with multiple LLM providers., Test research using multiple models for comparison., Test integration with various search engines through settings., Test performance-related settings., Test settings for concurrent research operations. (+9 more)

### Community 524 - "Community 524"
Cohesion: 0.07
Nodes (17): app(), mock_resources(), Tests for the link analytics feature., Test analytics with mock resources., Test analytics with time period filter., Create Flask app for testing., Test correct domain extraction from URLs., Test correct categorization of sources. (+9 more)

### Community 525 - "Community 525"
Cohesion: 0.09
Nodes (20): create_configured_connection(), Tests for SQLCipher thread safety.  These tests verify that SQLCipher connecti, Verify concurrent reads work from different connections., Verify concurrent writes are properly serialized., Tests for connection pooling behavior., Verify multiple simultaneous connections to same database., Verify connections can be safely reused across operations., Tests for background thread database access. (+12 more)

### Community 526 - "Community 526"
Cohesion: 0.08
Nodes (12): Deep coverage tests for llm_config.py targeting uncovered branches.  Focuses o, Registered object that is not BaseChatModel and not callable raises ValueError., If local_context_window_size returns None, defaults to 8192., Restricted cloud: if context_window_size returns None, defaults to 128000., llamacpp is in the local provider list., Model name with surrounding quotes/whitespace is cleaned., Provider is lowercased before validation., TestContextWindowEdgeCases (+4 more)

### Community 527 - "Community 527"
Cohesion: 0.11
Nodes (18): _mock_get_setting(), Extended tests for llm_config provider paths (LlamaCpp, Ollama, OpenAI)., Base settings dict shared across tests., Model not in Ollama model list — now handled by ChatOllama itself., Model creates ChatOllama (no pre-flight model check)., No pre-flight check means ChatOllama is always created directly., Tests for OpenAI provider optional parameters., api_base is passed through as openai_api_base. (+10 more)

### Community 528 - "Community 528"
Cohesion: 0.07
Nodes (14): Tests for settings and API key database models., Test that setting keys must be unique., Test handling of secret settings (though Setting model doesn't have is_secret)., Test system-wide settings that shouldn't be user-editable., Test UserSettings for user-specific preferences., Test suite for settings-related models., Test APIKey model for secure API key storage., Test organizing settings by category. (+6 more)

### Community 529 - "Community 529"
Cohesion: 0.07
Nodes (11): Deep coverage tests for loader_registry module.  Targets branches and code pat, Verify that get_loader_for_path returns None when the loader raises., Verify extensions that must exist regardless of optional loader flags., Deeper checks on loader kwargs not covered by existing tests., Exercise the branch where extension does NOT start with a dot., Exercise the branch that prepends a dot when missing., TestAlwaysPresentExtensions, TestGetLoaderClassForExtensionNoDot (+3 more)

### Community 530 - "Community 530"
Cohesion: 0.11
Nodes (13): Tests for the check-research-id-type pre-commit hook.  Covers regressions: -, Sanity check that real bad patterns are still caught., Filename containing 'test_' as a substring must not silently exempt., protest_handler.py contains substring 'test_' but is not a test file., All three test-file conventions must still be exempt., `foo_test.py` (Go-style suffix) — newly supported., Files under a /tests/ directory — newly supported., Comments and docstrings mentioning the bad patterns must not fire. (+5 more)

### Community 531 - "Community 531"
Cohesion: 0.08
Nodes (19): _make_exception(), Edge-case tests for rate_limiting/llm/detection.py — provider-specific detection, retry after 30 seconds' pattern (line 98)., Tests for OpenAI-specific module-based detection (line 52)., error.__class__.__module__ == 'openai' with RateLimitError type + 429., Tests for Anthropic-specific module-based detection (line 58-64)., anthropic' in module with rate_limit in message -> True., Anthropic auth error should NOT be detected as rate limit. (+11 more)

### Community 532 - "Community 532"
Cohesion: 0.11
Nodes (11): _check_code(), Tests for the check-env-vars pre-commit hook.  Ensures the hook enforces centr, Ensures normal code without env access is not flagged., Parse code and run the env var checker., Ensures os.environ usage is flagged in application code., Ensures standard system env vars are not flagged., Ensures settings/config/test files are exempt., TestAllowsExemptFiles (+3 more)

### Community 533 - "Community 533"
Cohesion: 0.07
Nodes (5): Tests for log string sanitization., Unit tests for sanitize_for_log., Unit tests for strip_control_chars., TestLogSanitizer, TestStripControlChars

### Community 534 - "Community 534"
Cohesion: 0.07
Nodes (17): Coverage tests for local_deep_research/utilities/llm_utils.py.  Focuses on pat, Should handle Ollama httpx _client that lacks close()., Verify that fetch_ollama_models calls safe_get, not requests.get., safe_get should be called; requests.get should NOT., When safe_get raises, should return [] gracefully., Non-200 response from safe_get should yield empty list., When the LLM object has its own close() method defined on the type., Should call llm.close() when the type defines close. (+9 more)

### Community 535 - "Community 535"
Cohesion: 0.08
Nodes (7): Get-StudioAnsi(), Setup for cli-anything-unrealinsights package., # NOTE: iTerm2.app itself is a hard dependency that cannot be expressed here., step(), substep(), Write-SetupVerboseDetail(), Write-StudioStdoutMirror()

### Community 536 - "Community 536"
Cohesion: 0.12
Nodes (24): ChannelMetadata, ChannelPlatform, check_desktop_manual_update(), compare_numbered_prefix_to_prerelease(), compare_parsed_versions(), compare_prerelease(), compare_prerelease_part(), compare_suffixes() (+16 more)

### Community 537 - "Community 537"
Cohesion: 0.11
Nodes (18): _collect_async_functions(), _consume(), _finalbody_has_tracker_exit(), _has_tracker_enter_call(), _llama_stub_raises_on_preset_cancel(), _load_registry_module(), _loop_has_cancel_event_check(), _make_stream() (+10 more)

### Community 538 - "Community 538"
Cohesion: 0.12
Nodes (27): create_task(), download_file(), download_thumbnail(), encode_file(), get_api_key(), load_config(), _make_auth_token(), poll_task() (+19 more)

### Community 539 - "Community 539"
Cohesion: 0.08
Nodes (27): count_measures(), count_notes(), detect_format(), get_instruments(), get_key_signature(), get_score_title(), get_time_signature(), key_int_to_name() (+19 more)

### Community 540 - "Community 540"
Cohesion: 0.1
Nodes (22): add_audio_source(), get_audio_source(), _get_audio_sources(), list_audio(), mute(), OBS Studio CLI - Audio management., Set audio sync offset in milliseconds., List all audio sources. (+14 more)

### Community 541 - "Community 541"
Cohesion: 0.11
Nodes (16): ConcreteQuestionGenerator, Tests for the BaseQuestionGenerator class.  Tests cover: - Initialization -, generate_questions returns a list., generate_questions returns list of strings., Concrete implementation for testing the base pattern., Tests for BaseQuestionGenerator initialization., Generator stores the model reference., Tests for _format_previous_questions helper. (+8 more)

### Community 542 - "Community 542"
Cohesion: 0.07
Nodes (16): Test peeking at auth without removing it., Test that auth expires after TTL., Test session password storage without encryption., Test that auth is stored in plain text internally., Test storing and retrieving a password., Test that encryption has been properly removed., Test that cryptography is not imported in the base class., Test that all stores use the same plain text format. (+8 more)

### Community 543 - "Community 543"
Cohesion: 0.07
Nodes (7): Coverage tests for benchmarks/benchmark_functions.py.  Focuses on logic paths, TestBrowsecompSearchModelConfig, TestSimpleqaEvaluationTemperature, TestSimpleqaOpenaiEndpointEvaluation, TestSimpleqaSearchModelConfig, TestSimpleqaSettingsOverride, TestXbenchDeepsearchDefaults

### Community 544 - "Community 544"
Cohesion: 0.07
Nodes (8): Coverage tests for benchmarks/graders.py.  Targets the 37 missing lines: - ge, TestExtractAnswerFromResponse, TestGetEvaluationLlm, TestGradeResults, TestGradeSingleResultBrowsecomp, TestGradeSingleResultError, TestGradeSingleResultSimpleqa, TestHumanEvaluation

### Community 545 - "Community 545"
Cohesion: 0.07
Nodes (8): Coverage tests for web/auth/decorators.py — untested branches., Non-API route triggers _safe_redirect_to_login., TestCurrentUser, TestGetCurrentDbSession, TestInjectCurrentUser, TestLoginRequiredAuthenticated, TestLoginRequiredNoDbConnection, TestLoginRequiredUnauthenticated

### Community 546 - "Community 546"
Cohesion: 0.12
Nodes (26): apply_filter_and_export(), batch_script_fu(), _build_export_cmd(), _build_layer_script(), create_and_export(), _filter_to_script_fu(), find_gimp(), get_version() (+18 more)

### Community 547 - "Community 547"
Cohesion: 0.28
Nodes (25): fail(), find_agent_root(), _last_entry(), _load_hook(), main(), ok(), Walk up from cwd until we find .agent/, Run the hook script with a JSON payload on stdin. Returns (returncode, last_entr (+17 more)

### Community 548 - "Community 548"
Cohesion: 0.1
Nodes (19): BenchmarkSimulator, CompositeBenchmarkSimulator, main(), optimize_parameters(), OptunaOptimizerSimulator, print_optimization_results(), Multi-benchmark optimization simulation.  This script demonstrates how to use, Simulate running multiple benchmarks with weights.          Args: (+11 more)

### Community 549 - "Community 549"
Cohesion: 0.12
Nodes (19): main(), optimize_for_efficiency(), optimize_for_quality(), optimize_for_speed(), print_optimization_results(), Simulated optimizer that demonstrates the API structure without running actual o, Simulate optimization process., Simulate quality-focused optimization. (+11 more)

### Community 550 - "Community 550"
Cohesion: 0.08
Nodes (25): clear_registries(), _is_ollama_running(), memory_retriever(), mock_search_system(), ollama_llm(), Test demonstrating programmatic access with Langchain Ollama LLM and in-memory v, Create a mock search system for testing., Test quick_summary using Ollama LLM and in-memory vector retriever. (+17 more)

### Community 551 - "Community 551"
Cohesion: 0.08
Nodes (14): Tests for benchmarks/metrics/reporting.py  Tests cover: - generate_report fun, Test that confidence is included when available., Test that error info is included when present., Tests for the generate_report function., Test that category performance is included., Test that a markdown report is generated., Test that config info is included when provided., Test that correct examples are included. (+6 more)

### Community 552 - "Community 552"
Cohesion: 0.12
Nodes (21): _get_fn(), Tests for _get_context_window_for_provider() in llm_config.py.  Covers the 3 b, Cloud providers with unrestricted=False use configurable limit., When unrestricted=False, defaults to 128000., Settings snapshot overrides cloud window size., String window size coerced to int., None value → fallback to 128000., Local providers (ollama, llamacpp, lmstudio) use smaller default. (+13 more)

### Community 553 - "Community 553"
Cohesion: 0.08
Nodes (13): Tests for rate limiting database models., Test rate limit estimate storage and updates., Test tracking rate limits for multiple search engines., Test suite for rate limiting models., Test updating rate limit estimates based on attempts., Test identifying time-based rate limit patterns., Test updating rate limit estimates., Test cleaning up old rate limit attempts. (+5 more)

### Community 554 - "Community 554"
Cohesion: 0.08
Nodes (13): Tests for research-related database models., Test progress log JSON field in ResearchHistory., Test ResearchTask model., Test SearchQuery and SearchResult models., Test ResearchStrategy model.          ResearchStrategy.research_id is a String, Test suite for research-related models., Test relationships between research models., Test JSON metadata fields across models. (+5 more)

### Community 555 - "Community 555"
Cohesion: 0.08
Nodes (16): Tests for ExporterRegistry., Test that get_exporter returns an exporter instance., Test that get_exporter returns None for unknown formats., Test is_format_supported for known formats., Test is_format_supported for unknown formats., Basic tests for ExporterRegistry functionality., Test that format names are case insensitive., Tests for singleton behavior of registered exporters. (+8 more)

### Community 556 - "Community 556"
Cohesion: 0.08
Nodes (15): Edge case tests for journal quality scoring — gaps not covered by test_scoring.p, Negative h-index is a data error — treated as no signal (None)., Very negative h-index also returns None., Negative h-index with DOAJ should still honour DOAJ fallback., Q5 is not a valid quartile — falls to h-index branch., Q0 is not valid — returns None when no other signal., Q1 with h_index=0 → STRONG (not elite, because 0 is falsy)., NFKC expands fi-ligature (U+FB01) to 'fi'. (+7 more)

### Community 557 - "Community 557"
Cohesion: 0.08
Nodes (6): Tests for _validate_topics() pure logic in topic_generator.  Tests cover: - L, Dedup reduces count, max_topics applied after., Short topics filtered before dedup counting., Tests for _validate_topics()., None values should be skipped (falsy check)., TestValidateTopics

### Community 558 - "Community 558"
Cohesion: 0.08
Nodes (18): app(), app_production_mode(), Cookie Security Tests  Tests for the dynamic cookie security behavior.  Secu, HTTP requests never get the Secure flag, regardless of source IP.      This is, HTTPS requests always get the Secure flag., A reverse proxy terminating HTTPS sets X-Forwarded-Proto: https.         ProxyF, TESTING mode disables Secure flag entirely., Summary of cookie security behavior for CI validation.      Expected behavior: (+10 more)

### Community 559 - "Community 559"
Cohesion: 0.12
Nodes (12): Tests for the check-journal-quality-readonly pre-commit hook.  Ensures the com, Write code to a temp file and check it., Ensures writable opens of the journal quality DB are caught., Ensures read-only opens are allowed., SQLite accepts case-insensitive URI values — the hook should         recognise, Ensures the designated writer module can open writable., Ensures non-connect references are not flagged., TestAllowsReadOnlyOpens (+4 more)

### Community 560 - "Community 560"
Cohesion: 0.08
Nodes (15): Tests for uncovered code paths in security/rate_limiter.py.  Targets: - get_c, Module-level limiter instance is created., Shared limit decorators are created., Uses first IP from X-Forwarded-For header., Uses X-Real-IP when no X-Forwarded-For., Falls back to remote address when no proxy headers., Returns username from g.current_user., Falls back to session username. (+7 more)

### Community 561 - "Community 561"
Cohesion: 0.08
Nodes (15): Regression-prevention fixtures for the SSRF hardening (PR #3873, #3882).  This, Lock in that legitimate URL patterns LDR fetches keep working., Lock in that the SSRF fix continues to block known attack     payloads. If any, Lock in deliberate behaviour changes from PR #3873 / #3882 so a     future reve, PR #3873 changed ``validate_url(None)`` from raising         ``TypeError`` to r, PR #3873 added ``url.strip()`` at the top so URLs pasted from         clipboard, Strip handles SURROUNDING whitespace; INTERIOR whitespace is         still an R, Helper strips userinfo, path, query, AND fragment — leaving         only ``sche (+7 more)

### Community 562 - "Community 562"
Cohesion: 0.08
Nodes (14): Tests for text_cleaner module., Should return None for None input., Should return empty string for empty input., Should return normal text unchanged., Should handle valid Unicode text., Should remove/replace surrogate characters., Should handle text with both valid and invalid characters., Should preserve newlines and whitespace. (+6 more)

### Community 563 - "Community 563"
Cohesion: 0.08
Nodes (14): Tests for web/auth/queue_middleware.py  Tests cover: - process_pending_queue_, Should return early when user has no open database connection., Tests for process_pending_queue_operations function., Should return early when session context returns None., Should return early when g.current_user is not set., Should process pending operations for user., Should handle exceptions gracefully., Should log when operations are started. (+6 more)

### Community 564 - "Community 564"
Cohesion: 0.09
Nodes (24): NetworkGraphExplainer, Scene, add_node(), create_scene(), _generate_uid(), get_scene_info(), list_profiles(), open_scene() (+16 more)

### Community 565 - "Community 565"
Cohesion: 0.19
Nodes (25): attemptReconnect(), configPaths(), detectFailureCode(), emitLogs(), envNumber(), extractMcpTarget(), extractMcpTargetFromRaw(), failureSummary() (+17 more)

### Community 566 - "Community 566"
Cohesion: 0.16
Nodes (23): buildChubArgs(), clearGeneratedEntries(), ensureDir(), ensureSafeGeneratedRoot(), getContextHubEntries(), getEntryOutputPath(), getPackageVersion(), main() (+15 more)

### Community 567 - "Community 567"
Cohesion: 0.08
Nodes (10): Tests for the backup status API endpoint logic., Total size should sum all backup file sizes., Tests that verify backup status response structure using real filesystem., When backup directory is empty, response should have count=0., A single backup file should be found and sized correctly., Tests for the shared human_size formatter., Multiple backups should sort newest first., Temporary .tmp files should not appear in backup listing. (+2 more)

### Community 568 - "Community 568"
Cohesion: 0.08
Nodes (10): Tests for save_raw_config and get_upload_limits in research_routes.py., Missing JSON body should be rejected., Invalid TOML should not expose exception details., Tests for /api/upload/limits endpoint., Config with module_path key should be rejected., Config with class_name key should be rejected., Blocked keys in nested dicts should also be caught., Tests for /api/save_raw_config endpoint. (+2 more)

### Community 569 - "Community 569"
Cohesion: 0.17
Nodes (20): _AutoModelLike, CfgA, CfgB, CfgBChild, _FakeLazyMapping, ModelA, ModelB, RegBase (+12 more)

### Community 570 - "Community 570"
Cohesion: 0.16
Nodes (22): buildAggregates(), deriveClaudeWorkerId(), deriveDmuxSessionState(), deriveWorkerHealth(), ensureInteger(), ensureOptionalString(), ensureString(), getFallbackSessionRecordingPath() (+14 more)

### Community 571 - "Community 571"
Cohesion: 0.09
Nodes (19): cleanup_completed_research(), Middleware to clean up completed research records. Runs in request context wher, Clean up completed research records for the current user.     Called as a befor, ensure_user_database(), Middleware to ensure database connections are available for authenticated users., Ensure the user's database is open for the current request.     This is called, Middleware optimization to skip unnecessary checks for static files and public r, Determine if the current request should skip queue processing checks. (+11 more)

### Community 572 - "Community 572"
Cohesion: 0.17
Nodes (20): addLogEntry(), cancelIndexing(), checkAndResumeIndexing(), deleteCollection(), deleteDocumentCompletely(), displayCollectionEmbeddingSettings(), filterDocuments(), getProviderLabel() (+12 more)

### Community 573 - "Community 573"
Cohesion: 0.17
Nodes (19): createNewFolder(), createSubscriptionCard(), deleteSubscriptionDirect(), filterSubscriptions(), formatNextUpdate(), getCSRFToken(), getFolderName(), loadFolders() (+11 more)

### Community 574 - "Community 574"
Cohesion: 0.08
Nodes (12): Comprehensive test for OpenAI API key configuration and usage.  This test spec, Test that API key is properly passed through research flow to OpenAI., Test OpenAI with custom API endpoint (e.g., Azure OpenAI)., Test error handling when OpenAI API key is invalid., Test different OpenAI model selections., Test OpenAI API key configuration and usage throughout the system., Test OpenAI streaming configuration., Test OpenAI retry and timeout configuration. (+4 more)

### Community 575 - "Community 575"
Cohesion: 0.08
Nodes (13): Test metrics API endpoints specifically., Test model-specific pricing endpoint., Test metrics API endpoints., Test metrics API error handling., Test metrics summary endpoint., Test enhanced metrics endpoint., Test pricing information endpoint., Test cost analytics endpoint. (+5 more)

### Community 576 - "Community 576"
Cohesion: 0.08
Nodes (7): Additional edge case tests for benchmarks/graders.py.  Focuses on extract_answ, Tests for citation removal from responses., Edge cases for BrowseComp extraction., Edge cases for SimpleQA extraction., TestBrowseCompEdgeCases, TestCitationStripping, TestSimpleQAEdgeCases

### Community 577 - "Community 577"
Cohesion: 0.08
Nodes (13): High-value tests for benchmarks/metrics/reporting.py.  Covers report generatio, Report includes per-category metrics., Tests for generate_report function., Report includes configuration info when provided., Basic report generates with minimal metrics., Report includes correct answer examples from results file., Report includes incorrect answer examples., Missing results file doesn't crash report generation. (+5 more)

### Community 578 - "Community 578"
Cohesion: 0.08
Nodes (12): Tests for authentication-related database models., Test string representation of User model., Test the database_path property generates consistent paths., Test that database_version defaults to 1., Test suite for the User model., Test usernames with special characters., Test various query operations on User model., Test creating a new user. (+4 more)

### Community 579 - "Community 579"
Cohesion: 0.08
Nodes (12): Tests for benchmark-related database models., Test BenchmarkConfig for saving and reusing configurations., Test BenchmarkProgress for real-time tracking., Test suite for benchmark-related models., Test relationships between benchmark models., Test unique constraints on benchmark models., Test error tracking in benchmark runs., Test calculating statistics from benchmark results. (+4 more)

### Community 580 - "Community 580"
Cohesion: 0.08
Nodes (13): Test search-specific cache functionality., Test different cache categories., Test suite for cache-related models., Test cache hit counting and access time updates., Test that identical queries produce the same hash., Test tracking cache entry sizes., Test storing and retrieving cache metadata., Test search cache with various filter parameters. (+5 more)

### Community 581 - "Community 581"
Cohesion: 0.08
Nodes (12): Tests for metrics tracking database models., Test ResearchRating model for user feedback., Test SearchCall model for tracking search engine calls., Test relationships between metrics models., Test suite for metrics tracking models., Test cost tracking across different models., Test tracking search engine performance metrics., Test aggregating user ratings. (+4 more)

### Community 582 - "Community 582"
Cohesion: 0.08
Nodes (13): Tests for hours_ago function., Test that hours_ago returns a float., Test that current time returns approximately zero., Test that past datetime returns positive hours., Test that future datetime returns negative hours., Test that naive datetime is treated as UTC., Test that passing naive datetime doesn't modify the original., Test calculation with non-UTC timezone datetime. (+5 more)

### Community 583 - "Community 583"
Cohesion: 0.08
Nodes (16): Tests for real-world LLM output patterns that extract_json encounters in product, Single JSON object in prose works because find/rfind grab         matching brac, Tests for LLM responses containing multiple code fences., When an LLM self-corrects by producing two ```json blocks,         _strip_code_, A ```python fence doesn't match ```json, so it falls through         to the bar, Tests for interaction between URLs in JSON values and the // comment removal reg, When JSON has a trailing comma (triggering artifact cleaning),         the // c, Valid JSON with // in string values parses on the direct parse step         and (+8 more)

### Community 584 - "Community 584"
Cohesion: 0.16
Nodes (12): _authenticated_client(), _create_test_app(), Coverage gap tests for settings_routes.py targeting remaining uncovered paths., Tests for GET /settings/api/data-location endpoint., Tests for POST /settings/api/notifications/test-url endpoint., Tests for GET /settings/api/available-models endpoint., force_refresh=true skips cache and fetches live., Tests for GET /settings/api/bulk endpoint. (+4 more)

### Community 585 - "Community 585"
Cohesion: 0.08
Nodes (14): Tests for the default search engine configurations.  Tests cover: - Default E, Elasticsearch config matches dedicated function., Tests for get_default_elasticsearch_config function., Function returns a dictionary., Config has required keys., Config has correct class name., Config has hosts in default params., Config has index name in default params. (+6 more)

### Community 586 - "Community 586"
Cohesion: 0.17
Nodes (21): _DummyLogger, _file(), Mirror of the _skips_ test: the mixed repo should still surface in     cached-gg, A partial/interrupted GGUF download has ``size_on_disk = None``. The     route m, One repo raising during classification must not poison the response     for ever, A repo whose only ``.gguf`` artifact is an mmproj vision adapter     must not be, Mirror of the cached-gguf skip: a safetensors repo with an     auxiliary mmproj, A vision-capable GGUF repo (main weight + mmproj adapter) is still     a GGUF re (+13 more)

### Community 587 - "Community 587"
Cohesion: 0.08
Nodes (20): unsloth/kernels/utils.py module-top binds the 4-bit dequantize     and gemm prim, unsloth/kernels/utils.py top-level: `get_ptr = bnb.functional.get_ptr`., unsloth-zoo monkey-patches `QuantState.from_dict = ...`. Both     the class AND, fix_4bit_weight_quant_state_from_module added in newer bnb;     unsloth uses get, unsloth/__init__ probes both Linear4bit AND Linear8bitLt., PagedAdamW32bit + 8bit optimisers subclass Optimizer2State., 4bit state-dict save/load uses these two helpers., ROCM_WARP_SIZE_64 added with AMD ROCm support; pre-ROCm bnb     builds don't hav (+12 more)

### Community 588 - "Community 588"
Cohesion: 0.1
Nodes (23): add_camera(), add_light(), get_camera(), get_light(), list_cameras(), list_lights(), _next_camera_id(), _next_light_id() (+15 more)

### Community 589 - "Community 589"
Cohesion: 0.14
Nodes (21): _diff_bindings(), _diff_cbuffer_vars(), _diff_dicts(), _diff_from_snapshots(), _diff_lists(), diff_pipeline(), diff_pipeline_from_snapshots(), _diff_stages() (+13 more)

### Community 590 - "Community 590"
Cohesion: 0.08
Nodes (15): mock_project_with_models(), Tests for cleanup module (simplified - core deletion only), Test batch cleanup with some failures, Test space freed calculation, Test listing archives (simplified), Test listing nonexistent archive directory, Test listing empty archive directory, Create mock project with model directories (+7 more)

### Community 591 - "Community 591"
Cohesion: 0.17
Nodes (19): askClaude(), branchSession(), buildPrompt(), compactSession(), estimateTokenCount(), exportSession(), getClawDir(), getSessionMetrics() (+11 more)

### Community 592 - "Community 592"
Cohesion: 0.2
Nodes (22): addFileCopyOperation(), addMatchingRuleOperations(), addRecursiveCopyOperations(), buildCopyFileOperation(), createLegacyCompatInstallPlan(), createLegacyInstallPlan(), createManifestInstallPlan(), createStatePreview() (+14 more)

### Community 593 - "Community 593"
Cohesion: 0.13
Nodes (15): applyPolicyExceptions(), buildExceptionAuditEntry(), buildExceptionSummary(), buildExpiredExceptionViolations(), buildSkillEvaluationScaffold(), evaluatePolicy(), extractAllowList(), extractDenyList() (+7 more)

### Community 594 - "Community 594"
Cohesion: 0.15
Nodes (18): createSearchChart(), createTimelineChart(), createUsageChart(), displayCallStackTraces(), displayContextOverflow(), displayPhaseBreakdown(), displayRequestsTable(), displayResearchDetails() (+10 more)

### Community 595 - "Community 595"
Cohesion: 0.15
Nodes (7): make_strategy(), High-value tests for EnhancedContextualFollowUpStrategy pure logic., Factory to create strategy with controlled research_context., TestBuildFullContext, TestInjectContextIntoDelegate, TestMetadataAssembly, TestSourceCombination

### Community 596 - "Community 596"
Cohesion: 0.1
Nodes (13): Extended tests for benchmarks/benchmark_functions.py.  Covers get_available_be, config.pop('name') mutates the caller's dicts (documenting the bug)., Comparison report is written via write_file_verified., Error in run_benchmark for one config propagates (no swallowing)., Tests for get_available_benchmarks., Return type is a list., Each benchmark dict has id, name, description, recommended_examples., All three benchmark types are present. (+5 more)

### Community 597 - "Community 597"
Cohesion: 0.13
Nodes (12): _gz_lines(), Tests for the shared helpers in data_sources/_openalex_common.py.  The partiti, If safe_get raises, the tmp file is still cleaned up., ``iter_partitions`` must pass ``consume_body=True`` to safe_get.          Body, Partition fetches must override the generic safe_get retry budget.          ``, Caller-supplied ``max_retries`` / ``backoff_times`` win.          Default tuni, Bad JSON lines are skipped, not fatal; first-10 warnings logged., Each partition yields (idx, total, records) once. (+4 more)

### Community 598 - "Community 598"
Cohesion: 0.13
Nodes (9): _make_usage(), Tests for get_context_overflow_truncation_summary helper.  The helper unifies, TestCounts, TestDivisionByZeroGuard, TestEmpty, TestNullTokensTruncated, TestPeriodFilter, TestResearchModeFilter (+1 more)

### Community 599 - "Community 599"
Cohesion: 0.12
Nodes (3): MobileNavAssertions, MobileNavTestRunner, TestResults

### Community 600 - "Community 600"
Cohesion: 0.09
Nodes (5): Binding to a specific LAN IP must follow the same rules as 0.0.0.0., TestIsExternalHost, TestLocalhostHost, TestSpecificNetworkIP, TestZeroHost

### Community 601 - "Community 601"
Cohesion: 0.19
Nodes (21): append_live_trajectory(), build_cache_key(), build_live_history_item(), bundle_root(), _clean_none_fields(), finalize_bundle(), find_cached_manifest(), find_latest_manifest() (+13 more)

### Community 602 - "Community 602"
Cohesion: 0.18
Nodes (21): build_command_cards(), build_trajectory(), concat_videos(), draw_global_header(), draw_preview_panel(), _draw_text_right(), draw_trace_panel(), _fonts() (+13 more)

### Community 603 - "Community 603"
Cohesion: 0.11
Nodes (22): find_ffmpeg(), find_melt(), get_melt_version(), MLT/melt backend — invoke melt for rendering MLT XML projects.  Shotcut and Kd, Render an MLT XML file to a video using melt.      Args:         mlt_path: Pa, Render an MLT XML file to a video using melt.      Args:         mlt_path: Pa, Render a color bars test video using melt's built-in producer.      This doesn, Render a color bars test video using melt's built-in producer.      This doesn (+14 more)

### Community 604 - "Community 604"
Cohesion: 0.09
Nodes (21): deep_merge(), find_by_name(), generate_id(), get_item(), OBS Studio CLI - JSON helpers and utilities., Generate the next unique ID for a list of items., Get an item by index with bounds checking., Ensure a unique name among existing items. (+13 more)

### Community 605 - "Community 605"
Cohesion: 0.14
Nodes (11): _build_package_tree(), _load_repl_skin(), Tests that SKILL.md is discoverable after pip install.  Simulates the installe, The REPL banner should display the skill path when present., Verify each real harness has SKILL.md in the correct package location., Create a minimal cli_anything/<software>/ layout with repl_skin + SKILL.md., Import ReplSkin from the given utils directory (simulating installed path)., ReplSkin should auto-detect skills/SKILL.md relative to its own location. (+3 more)

### Community 606 - "Community 606"
Cohesion: 0.2
Nodes (21): buildPlanMessage(), buildVerifyMessage(), checkDecisionCoveragePlan(), checkDecisionCoverageVerify(), decisionMentioned(), extractPlanSections(), extractYamlBlock(), isInsideRoot() (+13 more)

### Community 607 - "Community 607"
Cohesion: 0.15
Nodes (14): handleBatchedUpload(), handleDrop(), handleFiles(), handleFileSelect(), handleSingleUpload(), handleUploadFiles(), hideSelectedFiles(), showBatchedProgress() (+6 more)

### Community 608 - "Community 608"
Cohesion: 0.2
Nodes (20): areValuesEqual(), attachAutoSaveListeners(), formatValueForDisplay(), loadAvailableModels(), loadCurrentSettings(), loadOllamaNumCtx(), loadOllamaUrl(), onModelChange() (+12 more)

### Community 609 - "Community 609"
Cohesion: 0.13
Nodes (11): main(), Test login and authentication., Debug test suite for research API endpoints., Test CSRF token generation and usage., Test research API endpoints., Test a specific research endpoint., Test getting research status., Test authentication status. (+3 more)

### Community 610 - "Community 610"
Cohesion: 0.09
Nodes (10): Test suite for REST API endpoints using minimal queries. Tests programmatic acc, Test analyze documents endpoint validation., Test REST API endpoints with minimal queries., Test the health check endpoint., Test generate report endpoint validation., Test API error handling., Test CORS headers on API endpoints., Test the API documentation endpoint (requires auth). (+2 more)

### Community 611 - "Community 611"
Cohesion: 0.09
Nodes (6): Extra coverage tests for benchmarks/benchmark_functions.py.  Targets the 36 mi, TestCompareConfigurationsCustom, TestCompareConfigurationsDefaults, TestEvaluateBrowsecompNonOpenaiEndpoint, TestEvaluateXbenchNonOpenaiEndpoint, TestGetAvailableBenchmarks

### Community 612 - "Community 612"
Cohesion: 0.09
Nodes (11): Tests for benchmarks/comparison/evaluator.py covering missing lines.  Covers:, Duration > 3600 is converted to hours., Duration > 60 but < 3600 is converted to minutes., Duration <= 60 stays in seconds., When spider chart creation fails, a text-based fallback is saved., Points dominated by others are not on the Pareto frontier., When all points are equal, all are on the frontier., TestCalculateAverageMetrics (+3 more)

### Community 613 - "Community 613"
Cohesion: 0.09
Nodes (13): Tests for _get_min_kdf_iterations() in database/sqlcipher_utils.py  Tests cove, Tests for _get_min_kdf_iterations()., No test env vars → production iterations (100_000)., PYTEST_CURRENT_TEST set → test iterations (1)., LDR_TEST_MODE set → test iterations (1)., Both env vars set → still returns test iterations., Empty string for PYTEST_CURRENT_TEST is falsy → production mode., Empty string for LDR_TEST_MODE is falsy → production mode. (+5 more)

### Community 614 - "Community 614"
Cohesion: 0.19
Nodes (15): migrated_to_0008_engine(), Tests for migration 0009: default search.fetch.mode 'full' → 'summary_focus_quer, Running the upgrade a second time is a no-op (already at head)., If the row never existed, the migration is a clean no-op., Insert a setting matching production's JSON-text storage.      SQLAlchemy's JS, Database fully migrated through 0008 (the revision before 0009)., _read_setting(), _run_downgrade_to() (+7 more)

### Community 615 - "Community 615"
Cohesion: 0.09
Nodes (14): Tests for embeddings_config module.  These tests verify the get_embedding_func, Tests for provider availability functions., VALID_EMBEDDING_PROVIDERS should contain expected providers., Verify get_available_embedding_providers can be imported., Tests for get_embedding_function., Verify get_embedding_function can be imported., get_embedding_function should return a callable embed_documents method., get_embedding_function should pass all parameters to get_embeddings. (+6 more)

### Community 616 - "Community 616"
Cohesion: 0.14
Nodes (12): _count_line_errors(), Tests for the check-deprecated-settings-wrapper pre-commit hook.  Covers regre, Files that never mention the name must pass cleanly., Count lines of the form '    Line N: <message>'., Regression: each call site must produce exactly one error, not two., Comments and docstring lines must not be flagged., db_utils.py and the hook itself must remain exempt., _run_hook() (+4 more)

### Community 617 - "Community 617"
Cohesion: 0.09
Nodes (12): Tests for llm_utils module - Extended Edge Cases  Tests cover edge cases not c, Should pass auth headers to safe_get., Should send empty dict when auth_headers is None., Should skip models that don't have a name field., Tests for fetch_ollama_models using the actual safe_get function., Should return empty list when JSON parsing fails., Should call safe_get with localhost and private IP flags enabled., Should handle responses with content attribute (like AIMessage). (+4 more)

### Community 618 - "Community 618"
Cohesion: 0.09
Nodes (16): Edge-case tests for search_utilities — format_findings phase parsing and gracefu, Sub-query 2' should look up questions_by_iteration[0][1] (index 1)., Verify out-of-bounds iteration index is handled gracefully., Phase 'Follow-up Iteration 999.1' with missing iteration key → warning, no crash, Verify ValueError from int() on non-numeric phase is caught gracefully., Verify None search_results (instead of list) is handled gracefully., finding['search_results'] = None should not crash extract_links_from_search_resu, Follow-up Iteration abc.1' → int('abc') raises ValueError, caught gracefully. (+8 more)

### Community 619 - "Community 619"
Cohesion: 0.09
Nodes (14): Tests documenting critical behavioral semantics of thread_context.py.  These t, with search_context(...) clears any previously-set context in finally., Context is cleared even if an exception occurs inside the block., Tests documenting shallow copy behavior of get_search_context., get_search_context() returns a shallow copy — top-level keys         are indepe, Tests for @preserve_research_context decorator semantics., Context is captured when @preserve_research_context is applied,         NOT whe, Two functions decorated at different times carry their own         independent (+6 more)

### Community 620 - "Community 620"
Cohesion: 0.09
Nodes (4): Tests for server_config.py uncovered branches., TestHasLegacyCustomizations, TestLoadLegacyConfig, TestLoadServerConfig

### Community 621 - "Community 621"
Cohesion: 0.13
Nodes (13): _make_app(), Tests for web/auth/session_cleanup.py  Tests cover: - cleanup_stale_sessions(, Should not clear session when db_manager.has_encryption is False., Should clear session when there is no session_id (no way to recover)., Create a minimal Flask test app with a secret key., Should clear session when session_id exists but password store has no password., Should NOT clear session when password IS found in the session password store., Tests for cleanup_stale_sessions function. (+5 more)

### Community 622 - "Community 622"
Cohesion: 0.13
Nodes (13): _enc_kv_string(), _enc_kv_string_array(), _enc_kv_uint32(), _enc_string(), Skip unwanted arrays and uint32s without losing position., Cache invalidates on size change., One side empty: scorer punts to filename fallback., Minimal GGUF: header + KV body, no tensors. (+5 more)

### Community 623 - "Community 623"
Cohesion: 0.17
Nodes (21): detect_install_source(), _distribution_package_paths(), _fetch_latest_pypi_version(), get_latest_pypi_version(), get_studio_install_source_status(), get_studio_update_status(), _LatestVersionCacheEntry, LatestVersionResult (+13 more)

### Community 624 - "Community 624"
Cohesion: 0.13
Nodes (21): create_task(), download_file(), download_thumbnail(), list_task_records(), _load_task_record(), poll_task(), prepare_task(), query_task() (+13 more)

### Community 625 - "Community 625"
Cohesion: 0.17
Nodes (21): _get_surface(), _next_id(), FreeCAD CLI - Surface workbench module.  Provides surface creation and manipul, Create a loft-like surface through cross-section profiles.      Parameters, Extend an existing surface by *length* along *direction*.      Parameters, Return the next available integer ID for surfaces., Create a blend surface between two edges.      The blend surface smoothly conn, Return a unique name derived from *base* inside ``project["surfaces"]``. (+13 more)

### Community 626 - "Community 626"
Cohesion: 0.13
Nodes (21): add_heading(), add_list(), add_page_break(), add_paragraph(), add_table(), _ensure_writer(), get_content(), list_content() (+13 more)

### Community 627 - "Community 627"
Cohesion: 0.13
Nodes (21): batch_convert(), diff_scores(), export_score(), _filter_qt_noise(), find_musescore(), get_score_media(), get_score_meta(), get_score_parts() (+13 more)

### Community 628 - "Community 628"
Cohesion: 0.13
Nodes (16): _camel_to_kebab(), clear_cache(), coerce_arg_value(), from_dict(), from_json_schema(), load_registry(), Tool registry — loads the bundled safari-mcp tool schema.  The registry is gen, The full set of MCP tools from a particular safari-mcp version. (+8 more)

### Community 629 - "Community 629"
Cohesion: 0.13
Nodes (1): GSDTools

### Community 630 - "Community 630"
Cohesion: 0.12
Nodes (11): Logger, create_settings_summary(), get_settings_log_level(), GSDLogger, log_settings(), Centralized utility for logging settings and configuration. Controls when and h, Create a summary of settings for logging.      Args:         settings: Settin, Get the current settings logging level.      Returns:         Current log lev (+3 more)

### Community 631 - "Community 631"
Cohesion: 0.1
Nodes (12): Quick-win tests for re-export / compat modules at 0% coverage.  These modules, benchmarks/metrics.py — re-exports calculate_metrics, generate_report., benchmarks/models/__init__.py — re-exports ORM models., advanced_search_system/repositories/__init__.py — re-exports FindingsRepository., utilities/setup_utils.py — wrapper calling init_config_files., Mock the lazy import to verify setup_user_directories calls it., benchmarks/datasets.py — re-exports load_dataset etc., TestBenchmarkDatasets (+4 more)

### Community 632 - "Community 632"
Cohesion: 0.12
Nodes (16): _has_main_guard(), _parse_example(), Tests for HTTP API example scripts.  Validates that the example scripts under, Verify the advanced example defines expected helper classes/functions., The advanced example should define an LDRClient class., The advanced example should define the documented example functions., Read and parse an example file, failing if it doesn't exist.      Returns (pat, Check if an AST contains an ``if __name__ == '__main__':`` guard. (+8 more)

### Community 633 - "Community 633"
Cohesion: 0.1
Nodes (7): Coverage tests for benchmarks/comparison/evaluator.py.  Targets the 44 missing, TestCalculateAverageMetrics, TestCompareConfigurationsEmpty, TestCompareConfigurationsMixed, TestCompareConfigurationsSuccess, TestCreateComparisonVisualizationsNoResults, TestEvaluateSingleConfigurationError

### Community 634 - "Community 634"
Cohesion: 0.15
Nodes (9): Tests for the check-deprecated-db pre-commit hook.  Covers regressions: - Fil, Filename-based exemptions must still work., encrypted_db.py legitimately calls get_db_connection — the skip         list in, A correct get_user_db_session call no longer whitelists the whole file., Comments and docstrings mentioning deprecated APIs must not fire., _run_hook(), TestCommentSkip, TestExistingAllowlistStillApplies (+1 more)

### Community 635 - "Community 635"
Cohesion: 0.11
Nodes (19): create_test_documents(), memory_retriever(), ollama_llm_factory(), Integration tests for Ollama LLM with real text generation., Test quick_summary with real Ollama text generation., Test multiple queries to verify consistent operation., Test that factory parameters are properly passed through., Create a small set of test documents. (+11 more)

### Community 636 - "Community 636"
Cohesion: 0.14
Nodes (11): Tests for the check-deprecated-db pre-commit hook.  Ensures the hook correctly, Write code to a temp file and run the checker., Ensures get_db_connection() usage is flagged., Ensures db_manager.get_session() is flagged (leaks QueuePool FDs)., Ensures direct SQLite connection to shared DB is flagged., Ensures correct patterns are NOT flagged., TestAllowsSafePatterns, TestDetectsDeprecatedDbConnection (+3 more)

### Community 637 - "Community 637"
Cohesion: 0.2
Nodes (3): AuthHelper, generateRandomUsername(), Timer

### Community 638 - "Community 638"
Cohesion: 0.1
Nodes (5): High-value tests for utilities/llm_utils.py - LLM URL Resolution., Server URL multi-source fallback chain., Ollama base URL fallback chain., TestGetOllamaBaseUrl, TestGetServerUrl

### Community 639 - "Community 639"
Cohesion: 0.1
Nodes (8): Extra coverage tests for calculate_duration edge cases in database.py., Space-separated + microseconds → parsed, but naive datetime         may fail .a, Space-separated that fails strptime → replaces space with T., If standard parsing fails, dateutil.parser is tried., completed_at before created_at → negative seconds., created_at is ISO, completed_at is space-separated., TestCalculateDurationEdgeCases, TestCalculateDurationFormats

### Community 640 - "Community 640"
Cohesion: 0.12
Nodes (3): Config, OrderByConfig, Tool

### Community 641 - "Community 641"
Cohesion: 0.13
Nodes (2): Config, Tool

### Community 642 - "Community 642"
Cohesion: 0.1
Nodes (13): _extract_cuda_thresholds_ps1(), _extract_cuda_thresholds_sh(), Cross-platform parity tests between install.sh and install.ps1., Both scripts should produce the same ordered list of CUDA index suffixes., Both install scripts must support the UNSLOTH_PYTORCH_MIRROR env var., install.sh primary install paths must not use --torch-backend=auto.      The fal, The fallback branch should use --torch-backend=auto as recovery., install.sh must contain the get_torch_index_url function. (+5 more)

### Community 643 - "Community 643"
Cohesion: 0.14
Nodes (20): add_slide(), add_slide_element(), duplicate_slide(), _ensure_impress(), get_slide(), list_slides(), move_slide(), LibreOffice CLI - Impress (presentations) module. (+12 more)

### Community 644 - "Community 644"
Cohesion: 0.2
Nodes (20): aligned_view_name_for_facts(), analyze_item(), bbox_center(), bbox_diag(), bbox_facts(), bbox_size(), build_item_context(), _creator_line() (+12 more)

### Community 645 - "Community 645"
Cohesion: 0.2
Nodes (19): _angle_in_ccw_sweep(), _arc_bounds(), _arc_extrema_points(), ArcEntity, build_dxf_render_payload(), _build_path_record(), _circle_bounds(), CircleEntity (+11 more)

### Community 646 - "Community 646"
Cohesion: 0.1
Nodes (11): Tests for format_links() in advanced_search_system/findings/repository.py  Tes, Tests for format_links()., Single link is formatted with number 1., Multiple links are formatted with incrementing numbers., First link is numbered 1, not 0., Title and URL appear with URL on indented line., Empty list returns empty string., Special characters in title are preserved. (+3 more)

### Community 647 - "Community 647"
Cohesion: 0.1
Nodes (11): pytest-compatible API tests for REST API endpoints. Tests basic functionality a, Basic tests for REST API endpoints., Test that CORS headers are properly set., Test that error responses follow consistent format., Test that rate limiting headers are present if configured., Test the health check endpoint returns OK status., Test the API documentation endpoint returns proper structure., Test quick_summary endpoint validates required fields. (+3 more)

### Community 648 - "Community 648"
Cohesion: 0.1
Nodes (13): app(), client(), Test authentication decorators and middleware., Test the current_user helper function., Test that current user is injected into g., Create a minimal Flask app for testing decorators., Test login_required when database connection is missing., Create a test client. (+5 more)

### Community 649 - "Community 649"
Cohesion: 0.16
Nodes (7): _get_data_dir_fn(), _get_user_db_fn(), Tests for get_user_database_filename() and get_data_directory() in paths.py., Tests for get_user_database_filename()., Tests for get_data_directory()., TestGetDataDirectory, TestGetUserDatabaseFilename

### Community 650 - "Community 650"
Cohesion: 0.11
Nodes (11): mock_error_api_response(), mock_successful_api_response(), Search engine mock fixtures - Based on scottvr's patterns but updated for curren, Collection of search engine mock responses., Safely validate that a URL belongs to Wikipedia.      This addresses the secur, Provide SearchEngineMocks instance as a fixture., Create a mock successful API response., Create a mock error API response. (+3 more)

### Community 651 - "Community 651"
Cohesion: 0.1
Nodes (7): Tests for compute_retry_cooldown and MAX_TOTAL_RETRIES., Tests for the backoff schedule function., Verify the full schedule matches the PR documentation., Default cooldown only matters for attempt 1., Tests for the MAX_TOTAL_RETRIES constant., TestComputeRetryCooldown, TestMaxTotalRetries

### Community 652 - "Community 652"
Cohesion: 0.1
Nodes (10): Tests for the research scheduler API routes.  Tests cover: - Get scheduler st, Test manual run endpoint returns 401 when not authenticated., Test manual run endpoint triggers run successfully., Test manual run endpoint handles failure (returns False)., Tests for the scheduler API routes., Test manual run endpoint handles exceptions., Test status endpoint returns 401 when not authenticated., Test status endpoint returns status when authenticated. (+2 more)

### Community 653 - "Community 653"
Cohesion: 0.1
Nodes (11): Tests that repository integrity guardrails remain intact.  These tests verify, Binary extension patterns must not use .* wildcards.          A pattern like `, The shared whitelist file must exist., Whitelist must contain at least some patterns., Verify CODEOWNERS guardrail rules remain at the bottom., Guardrail CODEOWNERS entries must be the last rules in the file.          GitH, Guardrail rules must be restricted to @LearningCircuit only., Verify .file-whitelist.txt doesn't contain broad binary wildcards. (+3 more)

### Community 654 - "Community 654"
Cohesion: 0.14
Nodes (12): Tests for sensitive data logging changes in history_routes.  Verifies that PR, Read the history_routes.py source file directly from disk., Verify that sensitive data is not exposed through logging., logger.info should not be used for the details route access log., Request headers must not be logged as they may contain auth tokens., Request URL must not be logged as it may contain sensitive params., Full research query result objects should not be logged., Full list of user research entries should not be logged. (+4 more)

### Community 655 - "Community 655"
Cohesion: 0.16
Nodes (8): Tests for the check-silent-exceptions pre-commit hook.  Ensures the hook detec, Ensures catching specific exceptions (not Exception) is allowed., Ensures bare except:pass and except Exception:pass are caught., Ensures exceptions with logging or re-raise are not flagged., TestAllowsProperHandling, TestAllowsSpecificExceptions, TestDetectsSilentExceptions, _write_and_check()

### Community 656 - "Community 656"
Cohesion: 0.1
Nodes (11): Edge-case tests for _parse_number() and _parse_multiselect().  These cover bra, Edge cases for _parse_number()., 1e2 = 100.0 which is_integer() → returns int(100)., 1.5e2 = 150.0 which is_integer() is True → returns int(150)., Edge cases not covered by test_parse_multiselect.py., JSON that parses to a dict (not list) falls through to comma split., String of only commas → all items strip to empty → filtered out., None should pass through unchanged. (+3 more)

### Community 657 - "Community 657"
Cohesion: 0.1
Nodes (12): app(), Behavioral tests for notify_queue_processor().  The existing test_queue_middle, Full success path: notifies activity and processes request., When process_user_request returns 0, no debug log emitted., Minimal Flask app for request context., Exceptions in queue processing must not propagate., Tests for notify_queue_processor() before_request handler., Early return when should_skip_queue_checks() is True. (+4 more)

### Community 658 - "Community 658"
Cohesion: 0.1
Nodes (3): Tests for theme registry., TestModuleFunctions, TestThemeRegistry

### Community 659 - "Community 659"
Cohesion: 0.14
Nodes (12): _make_app(), Tests for get_client_ip() from security/rate_limiter.py  Tests cover: - X-For, Create a minimal Flask test app., Tests for get_client_ip function., Should return the IP when X-Forwarded-For contains a single IP., Should return the first IP when X-Forwarded-For has comma-separated IPs., Should strip leading/trailing whitespace from X-Forwarded-For IP., Should return X-Real-IP when X-Forwarded-For is absent. (+4 more)

### Community 660 - "Community 660"
Cohesion: 0.15
Nodes (19): convert_cell_to_python(), convert_notebook(), convert_notebook_to_script(), download_notebook(), _emit_shell_command(), github_blob_to_raw(), is_url(), main() (+11 more)

### Community 661 - "Community 661"
Cohesion: 0.17
Nodes (10): _build_packed_training_setup(), _DummyChild, _DummyModel, _DummyTrainer, _PaddingFreeCollator, test_enable_padding_free_metadata(), test_enable_sample_packing(), test_enable_sample_packing_trl_collator() (+2 more)

### Community 662 - "Community 662"
Cohesion: 0.11
Nodes (19): add_clip(), _guess_format(), import_audio(), list_clips(), move_clip(), Audacity CLI - Clip management module.  Handles importing audio files, adding, Remove a clip from a track by index., Trim a clip's start and/or end within its source. (+11 more)

### Community 663 - "Community 663"
Cohesion: 0.15
Nodes (19): export_headless(), find_freecad(), get_version(), _is_gui_wrapper_script(), _macro_command(), Backend module that wraps the real FreeCAD headless CLI (FreeCADCmd).  Provide, Run a subprocess and return a normalised result dict., Write *content* to a temporary ``.py`` file and return its path. (+11 more)

### Community 664 - "Community 664"
Cohesion: 0.13
Nodes (19): bootstrap(), create_window(), _ensure_app_and_connections(), list_connections(), list_tmux_tabs(), Tmux integration operations for iTerm2.  Exposes iTerm2's tmux -CC integration, Show or hide a tmux window (represented as an iTerm2 tab).      Args:, List all iTerm2 tabs that are backed by a tmux integration window.      Return (+11 more)

### Community 665 - "Community 665"
Cohesion: 0.16
Nodes (19): batch_export(), create_new_image(), export_animation(), export_file(), find_krita(), get_version(), Backend module that wraps the real Krita CLI.  Provides functions to locate th, Run a subprocess and return a normalised result dict. (+11 more)

### Community 666 - "Community 666"
Cohesion: 0.18
Nodes (19): add_sheet(), clear_cell(), _ensure_calc(), get_cell(), _get_sheet(), get_sheet_data(), list_sheets(), LibreOffice CLI - Calc (spreadsheet) module. (+11 more)

### Community 667 - "Community 667"
Cohesion: 0.15
Nodes (19): _find_vc(), get_command_help(), get_config(), get_runtime_guidance(), get_styles(), get_version(), has_subcommand(), VideoCaptioner CLI backend — subprocess wrapper for the videocaptioner command. (+11 more)

### Community 668 - "Community 668"
Cohesion: 0.19
Nodes (16): branchExists(), buildOrchestrationPlan(), buildSessionBannerCommand(), buildWorkerArtifacts(), canonicalizePath(), cleanupExisting(), commandSucceeds(), executePlan() (+8 more)

### Community 669 - "Community 669"
Cohesion: 0.15
Nodes (19): append_event(), cleanup_pid(), default_output_dir(), ensure_private_dir(), is_fatal_error(), listen_with_retry(), log(), main() (+11 more)

### Community 670 - "Community 670"
Cohesion: 0.2
Nodes (17): analyzeCanaryLeaks(), analyzeDnsActivity(), analyzeExecution(), analyzeFileSystemAccess(), analyzeNetworkActivity(), analyzeOutputPatterns(), analyzeProcessBehavior(), analyzeTaint() (+9 more)

### Community 671 - "Community 671"
Cohesion: 0.16
Nodes (9): assessRegistryRisks(), buildPackageProvenance(), checkTyposquatting(), fetchRegistryMeta(), hasPinnedGitCommit(), isPinnedNpmVersion(), levenshteinDistance(), summarizePackageProvenance() (+1 more)

### Community 672 - "Community 672"
Cohesion: 0.18
Nodes (15): buildSection(), cmdWriteProfileLogic(), detectManualEdit(), extractMarkdownSection(), extractSectionContent(), extractSkillFrontmatter(), generateArchitectureSection(), generateClaudeMd() (+7 more)

### Community 673 - "Community 673"
Cohesion: 0.11
Nodes (8): Comprehensive API test suite using Flask test client., Test authentication APIs., Test configuration APIs., Test health check APIs., Test API v1 endpoints., Test rate limiting functionality., Test data location API., TestComprehensiveAPIs

### Community 674 - "Community 674"
Cohesion: 0.11
Nodes (7): Tests for defaults module., Cover the 'return False' branch when files are missing., TestDefaultFiles, TestDefaultsDir, TestEnsureDefaultsExist, TestGetDefaultFilePath, TestListDefaultFiles

### Community 675 - "Community 675"
Cohesion: 0.12
Nodes (14): _collect_configured_engines(), Consistency tests between the engine registry and the security whitelist.  The, Every (module_path, class_name) pair from the registry must resolve to a real cl, Each registry class exists in its declared module., Collect all (source, module_path, class_name) triples from the engine registry., Every module_path in the engine registry must be in ALLOWED_MODULE_PATHS., All registry module_path values are present in the whitelist., Every class_name in the engine registry must be in ALLOWED_CLASS_NAMES. (+6 more)

### Community 676 - "Community 676"
Cohesion: 0.11
Nodes (10): Tests for environment variable priority over database values.  This module tes, Test that db value is used when check_env is False., Test that default is used when check_env=False and db value is None., Test that env vars are checked even when db value is None., Test that number env var is used when database value is None.          This is, Test that text env var is used when database value is None., Test that boolean env var is used when database value is None., Test that default is used when neither env nor db has value. (+2 more)

### Community 677 - "Community 677"
Cohesion: 0.11
Nodes (7): Tests for backup status warning checks., Tests for the backup-disabled warning., Tests for the no-backups-exist warning., Tests for the backup-healthy info message., TestCheckBackupDisabled, TestCheckBackupHealthy, TestCheckNoBackupsExist

### Community 678 - "Community 678"
Cohesion: 0.2
Nodes (18): _env(), _extract_template(), _render(), test_alternation_violation_raises_template_error(), test_assistant_role_renders_as_model_turn(), test_base_template_has_no_channel_thought_injection(), test_developer_role_treated_as_system(), test_multi_turn_strips_all_historical_model_turns() (+10 more)

### Community 679 - "Community 679"
Cohesion: 0.16
Nodes (18): _fetch_text(), _has_def(), Heuristic AST-equivalent grep for `class Name`, `def name`,     or `Name = ...`, vllm.lora.request.LoRARequest, vllm.lora.utils.get_adapter_absolute_path,     vl, vllm.config.LoRAConfig. Imported at module top of     unsloth_zoo.vllm_lora_work, unsloth-zoo's vllm_lora_worker_manager imports     {LoRAModel, LoRAModelManager,, vllm.lora.worker_manager.WorkerLoRAManager. unsloth-zoo subclasses     this; sig, vLLM removed `lora_local_path` -> `lora_path` -> `lora_dir`     progressively. u (+10 more)

### Community 680 - "Community 680"
Cohesion: 0.13
Nodes (18): add_object(), duplicate_object(), get_object(), list_objects(), _next_id(), Blender CLI - 3D object management module., Remove an object by index., Apply a transform to an object.      Args:         project: The scene dict (+10 more)

### Community 681 - "Community 681"
Cohesion: 0.11
Nodes (9): list_workflows(), load_workflow(), Workflow management — CRUD, activate/deactivate, tags, versions., Validate a workflow's structure.      Checks that the workflow is a dict of no, Load a ComfyUI workflow from a JSON file.      Args:         path: Path to th, Save a ComfyUI workflow to a JSON file.      Args:         workflow: Workflow, List all workflow JSON files in a directory.      Args:         directory: Di, save_workflow() (+1 more)

### Community 682 - "Community 682"
Cohesion: 0.22
Nodes (17): build_environment(), candidate_profile_roots(), _decode_pref_string(), ensure_local_api_enabled(), find_active_profile(), find_data_dir(), find_executable(), find_install_dir() (+9 more)

### Community 683 - "Community 683"
Cohesion: 0.18
Nodes (1): GSDEventStream

### Community 684 - "Community 684"
Cohesion: 0.22
Nodes (1): InitRunner

### Community 685 - "Community 685"
Cohesion: 0.16
Nodes (9): findPhaseDir(), normalizeScaffoldArgs(), phaseComplete(), phaseRemove(), phaseScaffold(), renameDecimalPhases(), renameIntegerPhases(), updatePerformanceMetricsSection() (+1 more)

### Community 686 - "Community 686"
Cohesion: 0.21
Nodes (14): createContextChart(), createLatencyChart(), createPhaseChart(), displayContextData(), displayContextOverflowSection(), displayModelStats(), displayTruncatedRequests(), formatNumber() (+6 more)

### Community 687 - "Community 687"
Cohesion: 0.11
Nodes (10): Test ALL research-related endpoints., Comprehensive API test suite using Flask test client., Test ALL authentication endpoints., Test ALL metrics endpoints., Test ALL benchmark endpoints., Test ALL history endpoints., Test miscellaneous endpoints not covered in other categories., Test ALL settings endpoints. (+2 more)

### Community 688 - "Community 688"
Cohesion: 0.11
Nodes (11): CRITICAL — DO NOT MODIFY OR DELETE THIS FILE  These tests verify that the rele, The verification step must use pip, not pdm.          CRITICAL — DO NOT CHANGE, The pip install must NOT use --no-deps.          CRITICAL — DO NOT ADD --no-de, The verification must run `pip check` to catch inconsistencies.          CRITI, Load the release-gate workflow YAML.      CRITICAL — DO NOT MODIFY: this fixtu, CRITICAL — DO NOT DELETE OR WEAKEN THESE TESTS.      They verify that the pip-, The pip-install-check job must exist in release-gate.yml.          CRITICAL —, The summary job must depend on pip-install-check so failures block releases. (+3 more)

### Community 689 - "Community 689"
Cohesion: 0.19
Nodes (6): escapeXml(), LayoutBugTests, main(), printSummary(), TestResults, writeResults()

### Community 690 - "Community 690"
Cohesion: 0.11
Nodes (11): app(), Tests for cleanup_db_session teardown behavior in apply_middleware().  Source:, Create a minimal Flask app with the teardown handler registered., Tests for the cleanup_db_session teardown handler., Session in g.db_session gets rollback() and close() called., When g has no db_session, teardown completes without error., If rollback() raises, close() is still called., If close() raises, the exception does not propagate. (+3 more)

### Community 691 - "Community 691"
Cohesion: 0.25
Nodes (15): _drive(), _mock_http_client(), Serialize a list of Responses-API event dicts as an SSE byte stream., _responses_sse(), test_responses_enable_thinking_false_maps_to_reasoning_none(), test_responses_reasoning_effort_included_when_requested(), test_responses_reasoning_effort_none_omits_summary(), test_responses_reasoning_effort_xhigh_passthrough() (+7 more)

### Community 692 - "Community 692"
Cohesion: 0.13
Nodes (15): Regression tests for `scripts/lockfile_supply_chain_audit.py`.  The auditor is f, May-11 wave IOCs must remain in NPM_IOC_STRINGS (baseline)., The auditor's BLOCKED_NPM_VERSIONS must mirror the scanner's     table verbatim, Inline Cargo.lock with `source = "git+https://example.com/..."`     must trip th, `UNSLOTH_LOCKFILE_AUDIT_SKIP=1` used to silently bypass the     audit. Per SF4 i, The malicious fixture combines a non-registry resolved URL, a     known IOC subs, In-process call to `audit_npm_lockfile()` returns the same     finding shape we, _run_auditor() (+7 more)

### Community 693 - "Community 693"
Cohesion: 0.12
Nodes (8): _convert_lora_to_linear(), convert_weights_back_to_dtype(), generate_responses(), PeftWeightCallback, SFTTrainer calls get_peft_model and prepare_model_for_kbit_training which conver, replace_module(), sample_responses(), TrainerCallback

### Community 694 - "Community 694"
Cohesion: 0.14
Nodes (17): EvalResult, evaluate(), _infer_via_adapter(), _infer_via_studio(), main(), print_summary(), evaluate_sustainability_model.py  Score a fine-tuned or base model on the 5 sust, Check for quantified, specific claims vs. generic prose. (+9 more)

### Community 695 - "Community 695"
Cohesion: 0.14
Nodes (17): async_find_session(), async_find_tab(), async_find_window(), async_get_app(), connection_error_help(), find_iterm2_app(), iTerm2 backend — wraps the iterm2 Python API.  This module provides the bridge, Find a window by ID or raise ValueError. (+9 more)

### Community 696 - "Community 696"
Cohesion: 0.11
Nodes (1): AgentHarnessPackagingTests

### Community 697 - "Community 697"
Cohesion: 0.16
Nodes (17): action_summary(), _action_to_dict(), _decode_flags(), find_action_by_event(), find_actions_by_name(), _flatten_actions(), get_drawcalls_only(), list_actions() (+9 more)

### Community 698 - "Community 698"
Cohesion: 0.13
Nodes (17): create_meeting(), delete_meeting(), _format_meeting(), _format_meeting_summary(), get_join_url(), get_meeting(), list_meetings(), Meeting management — CRUD operations via Zoom API.  Covers: - Create / update (+9 more)

### Community 699 - "Community 699"
Cohesion: 0.26
Nodes (17): buildReport(), countFiles(), detectTargetMode(), fileExists(), findPluginInstall(), getConsumerChecks(), getRepoChecks(), hasFileWithExtension() (+9 more)

### Community 700 - "Community 700"
Cohesion: 0.12
Nodes (16): compare_configurations(), evaluate_browsecomp(), evaluate_simpleqa(), evaluate_xbench_deepsearch(), get_available_benchmarks(), API functions for benchmarking.  This module provides functions for running be, Run BrowseComp benchmark evaluation.      Args:         num_examples: Number, Run xbench-DeepSearch benchmark evaluation.      Args:         num_examples: (+8 more)

### Community 701 - "Community 701"
Cohesion: 0.15
Nodes (14): extract_links_from_search_results(), format_findings(), format_links_to_markdown(), _format_quality_tag(), _format_quality_tag_html(), HTML-safe wrapper for :func:`_format_quality_tag`.      Callers that render se, Extracts links and titles from a list of search result dictionaries.      Each, Format findings into a detailed text output.      Args:         findings_list (+6 more)

### Community 702 - "Community 702"
Cohesion: 0.26
Nodes (15): applyTheme(), clearTheme(), cycleTheme(), getCurrentTheme(), getEffectiveTheme(), getStorageKey(), getUserId(), initializeTheme() (+7 more)

### Community 703 - "Community 703"
Cohesion: 0.12
Nodes (9): Test database initialization module, Test the schema checking function, Test that settings can be initialized, Test that initialization completes even with existing tables, Test the centralized database initialization, Test that core tables are created correctly, Test that news tables are created when requested, Test that initialization is idempotent (can be run multiple times) (+1 more)

### Community 704 - "Community 704"
Cohesion: 0.12
Nodes (1): TestDetermineCategory

### Community 705 - "Community 705"
Cohesion: 0.12
Nodes (6): Tests for search_config module., Tests for QUALITY_CHECK_DDG_URLS constant., Should be a boolean value., Tests for get_search function., TestGetSearch, TestQualityCheckConstant

### Community 706 - "Community 706"
Cohesion: 0.12
Nodes (9): Test milestone logging functionality, Test that get_research_status endpoint includes latest milestone.          The, Test that milestone logging works correctly across threads, Test milestone logging functionality, Test that _get_research_id extracts research_id from bound logger, Test that _get_research_id falls back to Flask g object, Test that _get_research_id returns None when no research_id is available, Test that milestone logging uses logger.bind() in research service (+1 more)

### Community 707 - "Community 707"
Cohesion: 0.12
Nodes (4): Tests for get_javascript_url_validator() in security/url_validator.py., Basic syntax check — the JS should be parseable., Tests for the JavaScript URL validator code generator., TestGetJavascriptUrlValidator

### Community 708 - "Community 708"
Cohesion: 0.21
Nodes (15): Static + behavioral checks for the multi-image GRPO chunking and zoo compatibili, _read_source(), _simulate_chunk_indices(), test_cum_imgs_slice_indices_use_item(), test_cum_rows_materialized_on_cpu(), test_guard_helper_skips_all_ones_num_images(), test_guard_introspection_failure_does_not_silent_no_op(), test_guard_only_raises_when_both_checks_fail() (+7 more)

### Community 709 - "Community 709"
Cohesion: 0.13
Nodes (12): _critical_or_high(), Regression tests for `scripts/scan_packages.py`.  The scanner's primary entry po, Once RE_MAY12_IOC is wired into check_py_file (per Fork 1's     plan), the malic, A pip download failure must NOT be silently swallowed into a     `0 findings, ex, SF1: a corrupted wheel (truncated bytes) used to be silently     skipped by `exc, Re-running `_build.py` must produce byte-identical archives.      The build help, test_archive_corruption_produces_critical_finding(), test_fixture_bytes_are_deterministic() (+4 more)

### Community 710 - "Community 710"
Cohesion: 0.12
Nodes (2): `def get_peft_model(...)` may live in mapping.py (older     layout) or mapping_f, test_get_peft_model_function()

### Community 711 - "Community 711"
Cohesion: 0.22
Nodes (6): animateProgress(), box(), demo(), SkillCreateOutput, sleep(), stripAnsi()

### Community 712 - "Community 712"
Cohesion: 0.26
Nodes (16): _apply_source_color(), build_assembly_compound(), _build_node_shape(), _clear_shape_colors(), _component_name(), _compound_from_nodes(), export_assembly_step(), export_assembly_step_from_payload() (+8 more)

### Community 713 - "Community 713"
Cohesion: 0.44
Nodes (15): _copy_dict(), _copy_list(), _normalize_card_reward(), _normalize_card_select(), _normalize_combat(), _normalize_combat_rewards(), _normalize_event(), _normalize_game_over() (+7 more)

### Community 714 - "Community 714"
Cohesion: 0.27
Nodes (15): coerceValue(), createDefaultFrontmatter(), extractContextRefs(), extractElement(), extractExecutionContext(), extractFrontmatter(), extractSection(), extractTaskType() (+7 more)

### Community 715 - "Community 715"
Cohesion: 0.29
Nodes (13): hashFile(), intelDiff(), intelDir(), intelFilePath(), intelQuery(), intelSnapshot(), intelStatus(), intelUpdate() (+5 more)

### Community 716 - "Community 716"
Cohesion: 0.18
Nodes (15): _get_api_rate_limit_string(), _get_api_user_key(), get_client_ip(), get_current_username(), _get_upload_user_key(), _get_user_api_rate_limit(), _is_api_rate_limit_exempt(), Rate limiting utility for HTTP endpoints. Provides a global limiter instance th (+7 more)

### Community 717 - "Community 717"
Cohesion: 0.19
Nodes (14): buildTree(), chat(), classifyFiles(), generate(), generateAreaDoc(), generateIndex(), main(), Ollama text generation and chat — streaming and non-streaming inference. (+6 more)

### Community 718 - "Community 718"
Cohesion: 0.12
Nodes (5): Tests for uncovered code paths in api/benchmark_functions.py.  Targets: - eva, TestCompareConfigurations, TestEvaluateBrowsecomp, TestEvaluateSimpleqa, TestEvaluateXbenchDeepsearch

### Community 719 - "Community 719"
Cohesion: 0.12
Nodes (9): Test session persists through page navigation., Test session integrity check endpoint., Test that session persists after login., Test that logout properly clears the session., Test auth check endpoint with persistent session., Test API access with persistent session., Test session persistence functionality., Test that session persists across multiple requests. (+1 more)

### Community 720 - "Community 720"
Cohesion: 0.12
Nodes (7): Tests for uncovered paths in local_deep_research.document_loaders.bytes_loader., TestExtractTextFromBytesEmptyDocuments, TestExtractTextFromBytesLoaderFails, TestExtractTextFromBytesUnsupported, TestLoadFromBytesLoaderInfoNone, TestLoadFromBytesSuccess, TestLoadFromBytesUnsupportedExtension

### Community 721 - "Community 721"
Cohesion: 0.12
Nodes (5): Tests for api_current_rate_limits and api_cost_calculation in metrics_routes.py., Tests for /api/rate-limiting/current endpoint., Tests for /api/cost-calculation endpoint., TestApiCostCalculation, TestApiCurrentRateLimits

### Community 722 - "Community 722"
Cohesion: 0.12
Nodes (9): Tests for urlparse ValueError handling in web routes (PR #2013).  PR #2013 cha, Test that urlparse ValueError is properly handled.      Python's urlparse can, urlparse should parse normal URLs without error., urlparse should handle empty string without ValueError., urlparse should handle URL without scheme., Test domain extraction logic from api_classification_progress.          This m, Test hostname extraction logic from library_routes.py.          This mirrors t, Test that domain classification errors are caught as Exception.          In me (+1 more)

### Community 723 - "Community 723"
Cohesion: 0.15
Nodes (1): Source

### Community 724 - "Community 724"
Cohesion: 0.17
Nodes (7): Tests that HfFileSystem().glob() is skipped when is_model or is_peft is False., Verify the actual loader.py source code has the is_model/is_peft guard., Check that both SUPPORTS_LLAMA32 checks in loader.py include is_model and is_pef, Verify HfFileSystem.glob is not called when is_model or is_peft is False., Simulate the both_exist detection block from loader.py.          This mirrors th, TestGlobSkippedWhenNotBothConfigs, TestLoaderSourceHasGuard

### Community 725 - "Community 725"
Cohesion: 0.27
Nodes (12): _Capture, _load_helpers(), Verify dpo_trainer_vision_process_row forwards prompt and images verbatim., test_gemma3_style_boi_token_prompt_not_corrupted(), test_list_images_forwarded_verbatim(), test_missing_images_key_passes_none_to_processor(), test_multi_image_prompt_unchanged_no_extra_placeholders(), test_numpy_ndarray_image_forwarded_verbatim() (+4 more)

### Community 726 - "Community 726"
Cohesion: 0.23
Nodes (15): _count_with_cancel_lock_blocks(), _find_class(), _find_function(), _load_registry_module(), TOCTOU atomicity guards for the cancel path.  Structural: cancel_inference, _can, test_cancel_after_register_signals_without_stash(), test_cancel_before_register_replays_atomically(), test_cancel_by_cancel_id_is_exclusive_to_single_run() (+7 more)

### Community 727 - "Community 727"
Cohesion: 0.17
Nodes (13): _CountingFakeQuantizer, _get_model(), Verify that the fake quantizers are actually called when the model is called., Test that all linear layers in the model are fake quantized according to the `qa, # TODO: there are bad interactions across tests right now, need to figure out, Dummy fake quantizer that counts the number of times it has been called., Return a 2-tuple of (model, tokenizer), where the model has been configured, Verify that the given linear contains fake quantizers according to the `qat_sche (+5 more)

### Community 728 - "Community 728"
Cohesion: 0.14
Nodes (15): add_effect(), get_effect_info(), list_available(), list_effects(), Audacity CLI - Effect registry and management module.  Provides a registry of, List available effects, optionally filtered by category., Get detailed info about an effect., Validate and fill defaults for effect parameters. (+7 more)

### Community 729 - "Community 729"
Cohesion: 0.14
Nodes (15): add_modifier(), get_modifier_info(), list_available(), list_modifiers(), Blender CLI - Modifier registry and management module., List available modifiers, optionally filtered by category., Get detailed info about a modifier type., Validate and fill defaults for modifier parameters. (+7 more)

### Community 730 - "Community 730"
Cohesion: 0.13
Nodes (15): _anchor_offset(), crop_canvas(), get_canvas_info(), GIMP CLI - Canvas operations module., Crop the canvas to a rectangle., Set the canvas color mode., Set the canvas DPI (dots per inch)., Resize the canvas (does not scale content, adds/removes space).      Args: (+7 more)

### Community 731 - "Community 731"
Cohesion: 0.14
Nodes (15): add_linear_gradient(), add_radial_gradient(), apply_gradient(), get_gradient(), list_gradients(), Inkscape CLI - Gradient management module.  Handles creating linear and radial, Apply a gradient to an object's fill or stroke.      Args:         target: "f, List all gradients in the document. (+7 more)

### Community 732 - "Community 732"
Cohesion: 0.16
Nodes (15): activity_artifact_roots(), _combined_output(), default_output_dir(), diff_snapshots(), Process execution and artifact tracking helpers., Return non-empty files that were created or updated., Run a command and discover artifacts under the supplied roots., Combine stdout and stderr for downstream parsers. (+7 more)

### Community 733 - "Community 733"
Cohesion: 0.17
Nodes (15): composite_on_background(), concat_segments(), extract_frames(), find_ffmpeg(), find_ffprobe(), probe(), ffmpeg backend — subprocess wrapper for video processing.  Openscreen's GUI us, Render a video segment with optional crop and speed change.      Args: (+7 more)

### Community 734 - "Community 734"
Cohesion: 0.29
Nodes (15): assertKnownModuleIds(), dedupeStrings(), expandComponentIdsToModuleIds(), getInstallComponent(), getManifestPaths(), intersectTargets(), listInstallComponents(), listInstallModules() (+7 more)

### Community 735 - "Community 735"
Cohesion: 0.36
Nodes (14): appendEvolutionRecord(), createVersion(), ensureSkillExists(), ensureSkillVersioning(), getCurrentVersion(), getEvolutionDir(), getEvolutionLog(), getEvolutionLogPath() (+6 more)

### Community 736 - "Community 736"
Cohesion: 0.18
Nodes (5): getBashPermissionCommand(), hasDynamicShellBehavior(), isReadOnlyDockerAllowEntry(), isScopedInterpreterScriptAllowEntry(), isScopedNetworkAllowEntry()

### Community 737 - "Community 737"
Cohesion: 0.16
Nodes (5): assertSafePhaseDirName(), computeNextSequentialPhaseId(), computePhaseDirectory(), scanSequentialMaxPhaseFromDirs(), scanSequentialMaxPhaseFromMilestone()

### Community 738 - "Community 738"
Cohesion: 0.21
Nodes (9): bulkDeleteBlobs(), bulkDeleteDocuments(), createToastContainer(), deleteCollection(), deleteDocument(), formatBytes(), getRequest(), postRequest() (+1 more)

### Community 739 - "Community 739"
Cohesion: 0.19
Nodes (8): _fetcher_cm(), _model_returning(), Unit tests for ``advanced_search_system.tools.fetch.build_fetch_tool``.  Pins, An empty overall_query should not produce a stale 'Overall research question:' l, A model whose ``invoke`` returns an object with ``.content == text``., test_summary_focus_query_includes_overall_query_in_prompt(), test_summary_focus_query_with_empty_overall_query_falls_back_to_focus_only(), test_summary_focus_tool_calls_model_with_focus_only_prompt()

### Community 740 - "Community 740"
Cohesion: 0.13
Nodes (6): Comprehensive API Tests for Local Deep Research.  This test suite checks all A, Test suite for all API endpoints., Test authentication APIs., Test configuration APIs., Test health check APIs., TestAllAPIs

### Community 741 - "Community 741"
Cohesion: 0.13
Nodes (5): Tests for news/utils/headline_generator.py  Tests cover: - Headline generatio, Tests for the internal _generate_with_llm function., Tests for the generate_headline function., TestGenerateHeadline, TestGenerateWithLLM

### Community 742 - "Community 742"
Cohesion: 0.16
Nodes (1): TestFailureTracker

### Community 743 - "Community 743"
Cohesion: 0.13
Nodes (9): app(), Tests for handle_websocket_requests middleware and DiskSpoolingRequest.  Sourc, Create a test app with middleware registered., Tests for the handle_websocket_requests before_request hook., Non-socket.io paths are unaffected by the middleware., socket.io path without werkzeug.socket returns None (pass-through).          T, socket.io path with werkzeug.socket set goes through normally., If werkzeug.socket check raises, middleware returns ("", 200). (+1 more)

### Community 744 - "Community 744"
Cohesion: 0.3
Nodes (14): _atomic_write_text(), build_info_source(), _env_version_conflicts(), _exact_git_tag(), _git_worktree_is_dirty(), _github_tag(), is_valid_version(), main() (+6 more)

### Community 745 - "Community 745"
Cohesion: 0.19
Nodes (14): create_provider(), delete_provider(), _ensure_schema(), get_connection(), get_provider(), list_providers(), Delete a provider by ID. Returns True if a row was deleted., Fetch a single provider by ID. (+6 more)

### Community 746 - "Community 746"
Cohesion: 0.14
Nodes (7): CLI smoke tests for the NotebookLM harness scaffold., Resolve installed CLI command; fall back to python -m for local dev., _resolve_cli(), TestCommandRouting, TestModuleExecution, TestRootHelp, TestSubcommandHelp

### Community 747 - "Community 747"
Cohesion: 0.24
Nodes (13): buildSessionSnapshot(), collectSessionSnapshot(), listTmuxPanes(), listWorkerDirectories(), loadWorkerSnapshots(), parseBullets(), parseSection(), parseWorkerHandoff() (+5 more)

### Community 748 - "Community 748"
Cohesion: 0.23
Nodes (11): detectFromLockFile(), detectFromPackageJson(), escapeRegex(), getCommandPattern(), getConfigPath(), getExecCommand(), getPackageManager(), getRunCommand() (+3 more)

### Community 749 - "Community 749"
Cohesion: 0.2
Nodes (11): build_selector_index(), canonicalize_selector(), display_selector(), edge_adjacent_face_selectors(), lookup_selector(), _relations(), SelectorIndex, _table_rows() (+3 more)

### Community 750 - "Community 750"
Cohesion: 0.18
Nodes (5): dispatchAlert(), formatWebhookPayload(), Alert operations for RMS API., renderTerminalAlert(), sendWebhookAlert()

### Community 751 - "Community 751"
Cohesion: 0.14
Nodes (0): 

### Community 752 - "Community 752"
Cohesion: 0.2
Nodes (13): _clean_llm_json_artifacts(), _extract_by_brackets(), extract_json(), get_llm_response_text(), Centralized utilities for extracting and parsing JSON from LLM responses.  Pro, Remove <think>...</think> tags from text.      Duplicated from search_utilitie, Remove markdown code fences from text.      Uses split-based extraction (not s, Extract substring between outermost matching brackets.      Uses find()/rfind( (+5 more)

### Community 753 - "Community 753"
Cohesion: 0.22
Nodes (8): createSafeAlertElement(), escapeHtml(), hasDOMPurify(), safeCreateElement(), safeSetInnerHTML(), sanitizeHtml(), sanitizeUserInput(), showSafeAlert()

### Community 754 - "Community 754"
Cohesion: 0.14
Nodes (13): Test export formats (PDF, LaTeX, Markdown) for research reports  ⚠️ IMPORTANT:, Test PDF export (generated client-side via JavaScript), Test exporting research report as Markdown, Test exporting research report as LaTeX, Test that export fails gracefully for non-existent research, Test exporting research report as Quarto, Test exporting research report as RIS (for Zotero), test_export_empty_research() (+5 more)

### Community 755 - "Community 755"
Cohesion: 0.14
Nodes (8): High-value tests for benchmarks/metrics/visualization.py.  Covers matplotlib u, Tests for plot_optimization_history., Returns None when MATPLOTLIB_AVAILABLE is False., Returns a matplotlib Figure with valid inputs., Saves figure to disk when output_file is provided., Custom title is set on the axes., Works with a single trial value., TestPlotOptimizationHistory

### Community 756 - "Community 756"
Cohesion: 0.19
Nodes (13): _distinct_titles_query(), Regression test for issue #3544.  When a research session is deleted, ``Resear, Mirror the production predatory_blocked DISTINCT query., After deleting one research session, its journal must disappear     from the da, A paper that appears in two research sessions must remain visible     after one, In-memory SQLite engine with FK enforcement enabled.      FK enforcement is re, Create a (ResearchHistory, ResearchResource, Paper, PaperAppearance) chain., Mirror the production query in api_user_research_journals. (+5 more)

### Community 757 - "Community 757"
Cohesion: 0.21
Nodes (7): Import-guard tests for loader_registry module.  Covers the ImportError branche, Reload loader_registry while raising ImportError for a specific symbol.      O, Restore loader_registry to its natural import state after each test.      The, When each optional loader import fails, its flag goes False and the     corresp, _reload_with_blocked_symbol(), restore_module(), TestOptionalLoaderImportErrors

### Community 758 - "Community 758"
Cohesion: 0.14
Nodes (13): add_numbers(), echo(), fail_on_demand(), get_info(), Simple echo MCP server for integration testing.  This is a minimal MCP server, A tool that can be made to fail for error handling tests.          Args:, Run the echo MCP server using STDIO transport., Echo back the provided message.          Args:             message: The messa (+5 more)

### Community 759 - "Community 759"
Cohesion: 0.14
Nodes (5): Tests for structured metadata extraction., Tests for extract_metadata()., Tests for metadata_to_text()., TestExtractMetadata, TestMetadataToText

### Community 760 - "Community 760"
Cohesion: 0.14
Nodes (8): Test API v1 authentication guard., An empty string username should still be rejected., A request with g.current_user set passes the auth guard., A request with a valid session username passes the auth guard., The /api/v1/health endpoint does not use @api_access_control., Test that /api/v1/ endpoints require authentication., Requests with no username (no g.current_user, no session) get 401., TestApiV1Auth

### Community 761 - "Community 761"
Cohesion: 0.22
Nodes (6): Tests for the check-ldr-db pre-commit hook.  Ensures the hook detects any refe, Ensures references to the deprecated shared DB are caught., Ensures comments and safe code are not flagged., TestAllowsSafePatterns, TestDetectsLdrDbUsage, _write_and_check()

### Community 762 - "Community 762"
Cohesion: 0.14
Nodes (8): Coverage tests for security/__init__.py targeting ~11 missing statements.  Unc, Tests for conditional imports in security __init__., All items in __all__ are importable., PathValidator is available when werkzeug is installed., FileUploadValidator available when pdfplumber is installed., safe_get is properly exported., Module whitelist utilities are exported., TestSecurityImports

### Community 763 - "Community 763"
Cohesion: 0.14
Nodes (3): Tests for _parse_multiselect() in settings/manager.py.  Covers list passthroug, Tests for _parse_multiselect()., TestParseMultiselect

### Community 764 - "Community 764"
Cohesion: 0.14
Nodes (9): Deep coverage tests for utilities/db_utils.py.  Targets uncovered paths: - ge, Cover the Flask session username lookup path (lines 72-76)., When g.db_session is missing, falls back to flask_session username., When flask_session has username but db_manager returns None, falls through., When flask_session has no username, falls through to None., Cover get_settings_manager with request context username extraction., When no args given and in request context, extracts username from session., TestGetDbSessionFlaskSessionUsername (+1 more)

### Community 765 - "Community 765"
Cohesion: 0.23
Nodes (13): _git_show(), main(), _normalize_py(), _normalize_yaml_run_strings(), Walk the parsed YAML object; for any multi-line string (i.e. a     ``run: |`` sc, Print a path-keyed summary of the first structural / scalar diff., Remove every string-literal docstring (Module / FunctionDef /     AsyncFunctionD, Strip pure-comment lines and inline trailing comments from a shell     snippet, (+5 more)

### Community 766 - "Community 766"
Cohesion: 0.14
Nodes (0): 

### Community 767 - "Community 767"
Cohesion: 0.24
Nodes (4): Guards PR #5246's redaction from being lost alongside the truncation block., _run(), TestNativePathLeaseRedactionStillWorks, TestNoTruncation

### Community 768 - "Community 768"
Cohesion: 0.14
Nodes (13): add_keyframe(), list_keyframes(), Blender CLI - Animation and keyframe management module., Remove keyframe(s) from an object.      Args:         project: The scene dict, Set the animation frame range.      Args:         project: The scene dict, Set the animation FPS (frames per second).      Args:         project: The sc, Set the current frame.      Args:         project: The scene dict         fr, List keyframes for an object.      Args:         project: The scene dict (+5 more)

### Community 769 - "Community 769"
Cohesion: 0.19
Nodes (13): find_godot_binary(), get_version(), is_available(), Godot Engine backend — subprocess wrapper for the Godot binary.  Godot runs as, Return Godot version info., Check if Godot binary is reachable., Check if a directory is a valid Godot project (has project.godot)., Search PATH and common locations for a Godot 4 binary.      Returns: (+5 more)

### Community 770 - "Community 770"
Cohesion: 0.16
Nodes (13): get_preference(), get_theme(), get_tmux_preferences(), _parse_value(), Global preferences management for iTerm2.  Read and write any of iTerm2's glob, Set a tmux-specific preference by human-readable name.      Args:         set, Parse a string value into an appropriate Python type.      Converts "true"/"fa, Get current iTerm2 theme information.      Uses app.async_get_theme() which re (+5 more)

### Community 771 - "Community 771"
Cohesion: 0.16
Nodes (13): get_last_prompt(), list_prompts(), _prompt_to_dict(), Shell prompt and command detection for iTerm2.  Requires Shell Integration to, Wait for the current command to finish executing.      Monitors for a COMMAND_, Convert an iterm2.Prompt object to a plain dict.      Returns a dict with all, Watch for N prompt events and return them.      Collects up to `count` events, Get info about the last shell prompt in a session.      Requires Shell Integra (+5 more)

### Community 772 - "Community 772"
Cohesion: 0.27
Nodes (13): chat_completion(), chat_completion_stream(), count_tokens(), format_message(), get_api_key(), get_config_dir(), list_models(), load_config() (+5 more)

### Community 773 - "Community 773"
Cohesion: 0.16
Nodes (13): append_note(), create_note(), delete_note(), list_files(), Obsidian vault operations — list, read, create, update, delete, append., Read a note's content., Create a new note in the vault., Update an existing note's content (overwrites). (+5 more)

### Community 774 - "Community 774"
Cohesion: 0.19
Nodes (13): api_delete(), api_get(), api_post(), api_put(), _headers(), is_available(), Obsidian Local REST API wrapper — the single module that makes network requests., Perform a DELETE request. (+5 more)

### Community 775 - "Community 775"
Cohesion: 0.18
Nodes (13): get_texture(), list_textures(), pick_pixel(), Texture inspection and export.  List all textures in a capture, inspect indivi, Save a texture to disk.      Parameters     ----------     controller : Repl, Save all render target outputs at a specific event.      Moves the replay to *, Serialise TextureDescription to a plain dict., Return all textures in the capture. (+5 more)

### Community 776 - "Community 776"
Cohesion: 0.34
Nodes (13): api_delete(), api_get(), api_post(), api_put(), get_api_token(), get_config_dir(), _handle_response(), load_config() (+5 more)

### Community 777 - "Community 777"
Cohesion: 0.16
Nodes (13): calculate_model_score(), compare_models(), get_best_model(), get_model_history(), rank_models(), Model management and ranking, Get the best model based on a metric, Calculate composite score for a model      Args:         run: Run dict with m (+5 more)

### Community 778 - "Community 778"
Cohesion: 0.33
Nodes (13): cleanupAliases(), deleteAlias(), getAliasesForSession(), getAliasesPath(), getDefaultAliases(), listAliases(), loadAliases(), renameAlias() (+5 more)

### Community 779 - "Community 779"
Cohesion: 0.33
Nodes (13): assertValidProvenance(), classifySkillPath(), getProvenancePath(), getSkillRoots(), isIsoTimestamp(), isWithinRoot(), normalizeSkillDir(), readProvenance() (+5 more)

### Community 780 - "Community 780"
Cohesion: 0.23
Nodes (9): runCatalogValidator(), runSourceViaTempFile(), runTests(), runValidatorWithDir(), runValidatorWithDirs(), stripShebang(), test(), writeInstallComponentsManifest() (+1 more)

### Community 781 - "Community 781"
Cohesion: 0.26
Nodes (10): legacyAssetProbes(), loadLegacyCoreConfig(), missingLegacyCoreMessage(), probeLegacySdkAsset(), resolveGsdToolsPath(), resolveLegacyInstallDir(), resolveLegacySkillsDir(), resolveLegacyTemplatesDir() (+2 more)

### Community 782 - "Community 782"
Cohesion: 0.31
Nodes (10): deriveStatusFromCheckbox(), extractCheckboxStates(), extractTerminalStatusLabels(), getModelAlias(), initManager(), initNewProject(), initProgress(), listPhasePlanAndSummaryCounts() (+2 more)

### Community 783 - "Community 783"
Cohesion: 0.28
Nodes (9): countPhasePlansAndSummaries(), extractCurrentMilestone(), extractNextMilestoneSection(), getMilestoneInfo(), parseMilestoneFromState(), roadmapAnalyze(), roadmapGetPhase(), searchPhaseInContent() (+1 more)

### Community 784 - "Community 784"
Cohesion: 0.28
Nodes (11): build(), buildLayer(), buildLayerTree(), buildSketchFile(), buildWorkstreamInventory(), loadTokens(), preprocessLayers(), resolveRefs() (+3 more)

### Community 785 - "Community 785"
Cohesion: 0.19
Nodes (12): get_context_overflow_truncation_summary(), get_period_days(), get_research_mode_condition(), get_time_filter_condition(), Common query utilities for metrics module., Convert a period string to number of days.      Returns None for 'all' (no tim, Get SQLAlchemy condition for research mode filtering.      Args:         rese, Get SQLAlchemy condition for time filtering.      Args:         period: Time (+4 more)

### Community 786 - "Community 786"
Cohesion: 0.15
Nodes (3): human_size(), Shared formatting utilities., Convert bytes to human-readable size string.      Args:         size_bytes: S

### Community 787 - "Community 787"
Cohesion: 0.24
Nodes (1): FollowUpResearch

### Community 788 - "Community 788"
Cohesion: 0.15
Nodes (7): Basic API tests - only test endpoints that should respond quickly. Focus on ver, Test basic API functionality., Test health check endpoint., Test API documentation endpoint., Test error handling for malformed requests., Test that unauthenticated requests are rejected., TestBasicAPI

### Community 789 - "Community 789"
Cohesion: 0.15
Nodes (7): Test logout functionality., Test auth check endpoint., Test accessing home page when authenticated., Test API access when authenticated., Simple authentication tests., Test API access without authentication., testSimpleAuth()

### Community 790 - "Community 790"
Cohesion: 0.15
Nodes (5): Tests for index_local_library and view_document_chunks in rag_routes.py., Tests for /api/rag/document/<id>/chunks endpoint., Tests for /api/rag/index-local SSE endpoint., TestIndexLocalLibrary, TestViewDocumentChunks

### Community 791 - "Community 791"
Cohesion: 0.28
Nodes (2): main(), ResponsiveUITester

### Community 792 - "Community 792"
Cohesion: 0.21
Nodes (2): escapeXml(), TestResults

### Community 793 - "Community 793"
Cohesion: 0.15
Nodes (4): Tests for _extract_domain() in metrics_routes.py.  Covers URL parsing, www. st, Tests for _extract_domain()., None input should be handled defensively like other invalid URLs., TestExtractDomain

### Community 794 - "Community 794"
Cohesion: 0.23
Nodes (10): _collect_install_script_entries(), diff_new_install_scripts(), _fetch_registry_scripts(), Finding, _load_lockfile(), main(), Return {hook: command} for any of preinstall / install /     postinstall publish, Convert a v2/v3 `packages` key into a bare package name.      `node_modules/foo` (+2 more)

### Community 795 - "Community 795"
Cohesion: 0.22
Nodes (12): Regression tests for scripts/lint_workflow_triggers.py.  Guards against future r, A cache key declared in both a PR-triggered workflow and the     publish workflo, The live `.github/workflows/` tree must pass the lint., Synthetic PR_TARGET trigger must produce rc=1 with a named finding., `workflow_run` requires an explicit allow-comment in the YAML., With the allow-comment, workflow_run is permitted., _run(), test_lint_allows_justified_workflow_run() (+4 more)

### Community 796 - "Community 796"
Cohesion: 0.21
Nodes (12): compare_aime_results(), download_and_combine_aime_datasets(), evaluate_model_aime(), extract_aime_answer(), get_num_tokens(), load_aime_dataset(), AIME Dataset Evaluation Module  This module provides functions to evaluate langu, Extract numerical answer from AIME response (+4 more)

### Community 797 - "Community 797"
Cohesion: 0.15
Nodes (11): activate_tab(), create_tab(), get_tab_info(), list_tabs(), Tab-level operations for iTerm2.  All functions are async coroutines intended, List all tabs, optionally filtered to a specific window., Get detailed info about a specific tab., Create a new tab in a window.      Args:         window_id: Target window (No (+3 more)

### Community 798 - "Community 798"
Cohesion: 0.18
Nodes (11): import_clip(), list_clips(), _next_clip_id(), Kdenlive CLI - Media bin management module., Generate next unique clip ID., Ensure unique clip name in bin., Import a clip into the project bin., Remove a clip from the bin by ID. (+3 more)

### Community 799 - "Community 799"
Cohesion: 0.23
Nodes (12): add_scene(), duplicate_scene(), get_active_scene(), _get_scenes(), list_scenes(), OBS Studio CLI - Scene management., Add a new scene to the project., Remove a scene by index. (+4 more)

### Community 800 - "Community 800"
Cohesion: 0.33
Nodes (11): annotateError(), annotateWarning(), emitAnnotations(), emptySupplyChainReport(), escapeAnnotation(), getInput(), isAtOrAboveSeverity(), run() (+3 more)

### Community 801 - "Community 801"
Cohesion: 0.3
Nodes (10): detectCanaryLeaks(), detectDnsLookups(), detectFileWrites(), detectNetworkActivity(), detectProcessSpawns(), detectSensitiveFileAccess(), detectSuspiciousOutput(), executeAllHooks() (+2 more)

### Community 802 - "Community 802"
Cohesion: 0.36
Nodes (11): buildPackageDedupeKey(), extractFromMcpConfig(), extractFromNpxArgs(), extractFromServerConfig(), extractPackages(), isRecord(), isUrlLikeSpec(), looksLikeNpmPackage() (+3 more)

### Community 803 - "Community 803"
Cohesion: 0.18
Nodes (2): createTestConfig(), startTestServer()

### Community 804 - "Community 804"
Cohesion: 0.32
Nodes (10): emptyUsage(), extractResult(), extractUsage(), isResultMessage(), isSuccessResult(), processQueryStream(), resolveModel(), runPhaseStepSession() (+2 more)

### Community 805 - "Community 805"
Cohesion: 0.2
Nodes (3): auditOpen(), auditOpenArtifacts(), formatAuditReport()

### Community 806 - "Community 806"
Cohesion: 0.35
Nodes (11): dispatchFailure(), dispatchSuccess(), fail(), formatPick(), formatSuccess(), mapFallbackDispatchError(), mapNativeDispatchError(), planQueryDispatch() (+3 more)

### Community 807 - "Community 807"
Cohesion: 0.26
Nodes (11): _backfill_model_indexes(), downgrade(), _index_exists(), Backfill model-declared indexes that were never emitted by the encrypted-DB cre, Create any model-declared index that's missing in this database., Drop only the canonical url_hash index this migration introduced.      The def, Keep the smallest-id row per url_hash; drop the rest., Drop child rows referencing url_hash values that no longer exist. (+3 more)

### Community 808 - "Community 808"
Cohesion: 0.17
Nodes (11): _close_base_llm(), fetch_ollama_models(), get_model_identifier(), get_ollama_base_url(), get_server_url(), Get Ollama base URL from settings with normalization.      Checks both embeddi, Get server URL from settings with fallback logic.      Checks multiple sources, Fetch available models from Ollama API.      Centralized function to avoid dup (+3 more)

### Community 809 - "Community 809"
Cohesion: 0.26
Nodes (6): handleCreateCollection(), hideCreateCollectionModal(), loadCollections(), renderCollections(), showError(), showSuccess()

### Community 810 - "Community 810"
Cohesion: 0.24
Nodes (8): checkAndDisplayWarnings(), clearAllWarnings(), displayWarnings(), initializeWarnings(), initResearchForm(), patchFormSubmitHandler(), saveResearchSettings(), setupWarningListeners()

### Community 811 - "Community 811"
Cohesion: 0.32
Nodes (9): addConsoleLog(), addLogEntryToPanel(), createLogEntryElement(), downloadLogs(), fetchLogsForResearch(), initializeLogPanel(), loadLogsForResearch(), toggleAutoscroll() (+1 more)

### Community 812 - "Community 812"
Cohesion: 0.23
Nodes (11): _build_batch_prompt(), filter_previews_for_relevance(), _invoke_text(), LLM-based relevance filter using plain text output.  Filters search previews b, Build the relevance prompt for a single batch of previews.      Indices in the, Invoke the LLM on a single batch and return the parsed local indices.      Emp, Filter search previews for relevance via plain-text LLM output.      Args:, Invoke the LLM with a plain text prompt and parse out integer indices.      Re (+3 more)

### Community 813 - "Community 813"
Cohesion: 0.17
Nodes (5): Simple REST API tests with ultra-minimal queries and longer timeouts. Focus on, Simple REST API tests., Test basic non-research endpoints., Test error handling for malformed requests., TestRestAPISimple

### Community 814 - "Community 814"
Cohesion: 0.17
Nodes (7): Test authentication without CSRF to verify CSRF protection., Test login behavior when CSRF protection is disabled., Test that login requires CSRF token when enabled., Test that API endpoints work without CSRF for authenticated users., Test that authentication properly requires CSRF tokens., Test that POST API endpoints properly handle CSRF., TestWithoutCSRF

### Community 815 - "Community 815"
Cohesion: 0.17
Nodes (7): Tests for HTTP header management., Test setting default headers., Test merging headers with precedence., Test parsing response headers., Test content type detection., Test Accept header content negotiation., TestHeaderManagement

### Community 816 - "Community 816"
Cohesion: 0.17
Nodes (7): Tests for response caching logic., Test determining if response is cacheable., Test parsing Cache-Control header., Test calculating cache expiry time., Test generating cache key., Test checking if cache should be revalidated., TestResponseCaching

### Community 817 - "Community 817"
Cohesion: 0.17
Nodes (7): Tests for parsing HTTP responses., Test parsing JSON response., Test parsing paginated response., Test extracting links from response headers., Test handling empty response., Test parsing error response., TestResponseParsing

### Community 818 - "Community 818"
Cohesion: 0.17
Nodes (7): Tests for API authentication patterns., Test Basic authentication header generation., Test Bearer token header generation., Test API key authentication., Test HMAC signature generation., Test OAuth token refresh check., TestAuthentication

### Community 819 - "Community 819"
Cohesion: 0.17
Nodes (7): Tests for URL building and manipulation., Test joining URL parts., Test adding query parameters to URL., Test parsing URL components., Test URL template expansion., Test encoding special characters in URL., TestURLBuilding

### Community 820 - "Community 820"
Cohesion: 0.17
Nodes (7): Tests for request validation., Test validating required parameters., Test validating parameter types., Test validating parameter value range., Test sanitizing request parameters., Test validating content length., TestRequestValidation

### Community 821 - "Community 821"
Cohesion: 0.17
Nodes (7): Tests for log filtering patterns., Test filtering logs by message pattern., Test rate-limited log filtering., Test sampling filter for high-volume logs., Test deduplication filter for repeated messages., Test filtering by context fields., TestLogFiltering

### Community 822 - "Community 822"
Cohesion: 0.17
Nodes (7): Tests for log parsing patterns., Test parsing structured log line., Test parsing JSON log., Test extracting error details from log., Test grouping logs by request ID., Test extracting timing information from logs., TestLogParsing

### Community 823 - "Community 823"
Cohesion: 0.17
Nodes (7): Tests for log level filtering., Test log level filtering logic., Test parsing log level from string., Test converting level to name., Test determining log level from environment., Test module-specific log levels., TestLogLevelFiltering

### Community 824 - "Community 824"
Cohesion: 0.17
Nodes (7): Tests for structured logging patterns., Test creating structured log record., Test adding common fields to log records., Test flattening nested context for logging., Test serializing log values., Test masking sensitive values in logs., TestStructuredLogging

### Community 825 - "Community 825"
Cohesion: 0.17
Nodes (7): Tests for log context management., Test log context as a stack., Test binding context to logger., Test unbinding context from logger., Test clearing all context., Test context inheritance for child loggers., TestLogContext

### Community 826 - "Community 826"
Cohesion: 0.17
Nodes (7): Tests for log rotation patterns., Test size-based rotation decision., Test time-based rotation decision., Test generating rotated log filename., Test calculating old files to delete., Test determining if log should be compressed., TestLogRotation

### Community 827 - "Community 827"
Cohesion: 0.17
Nodes (7): Tests for utc_now function., Test that utc_now returns a datetime object., Test that returned datetime is timezone-aware., Test that timezone is UTC., Test that returned time is current (within reasonable tolerance)., Test that successive calls return increasing times., TestUtcNow

### Community 828 - "Community 828"
Cohesion: 0.17
Nodes (7): Test CSRF hardening configuration against the real app., api blueprint (browser-facing) should require CSRF tokens., benchmark blueprint (browser-facing) should require CSRF tokens., research blueprint (browser-facing) should require CSRF tokens., Verify CSRF exemptions are narrowly scoped., api_v1 blueprint should be CSRF-exempt (programmatic REST API)., TestCsrfHardening

### Community 829 - "Community 829"
Cohesion: 0.2
Nodes (9): Coverage tests for security/__init__.py ImportError fallback branches.  The mi, Reload security package with a submodule blocked via sys.modules[...]=None., Ensure security module is fully restored after each test., When path_validator import fails, PathValidator is None., When file_upload_validator import fails, FileUploadValidator is None., _reload_security_with_blocked(), _restore_security_module(), TestFileUploadValidatorImportFallback (+1 more)

### Community 830 - "Community 830"
Cohesion: 0.17
Nodes (6): Tests for _filter_setting_columns() in settings/manager.py.  This function has, Tests for _filter_setting_columns()., Known Setting column names should be preserved., Keys not matching any Setting column should be removed., Filtering is by key name, not value — None values should pass., TestFilterSettingColumns

### Community 831 - "Community 831"
Cohesion: 0.17
Nodes (7): Tests for the exception fallback path in text_cleaner.remove_surrogates (lines 3, Cover the except branch (lines 32-37) in remove_surrogates., Exercise the except branch by replacing the function with one that         alwa, Replace remove_surrogates with a version that forces the except path., Test the fallback encoding behavior with actual surrogate chars., Verify the logger.warning call in the except block., TestRemoveSurrogatesFallback

### Community 832 - "Community 832"
Cohesion: 0.33
Nodes (1): MobileAllPagesTest

### Community 833 - "Community 833"
Cohesion: 0.21
Nodes (1): Source

### Community 834 - "Community 834"
Cohesion: 0.3
Nodes (1): Source

### Community 835 - "Community 835"
Cohesion: 0.23
Nodes (11): _exec_search_roots_block(), _load(), Resilience checks for Studio install-root inference under hostile filesystem con, studio_root() must remain callable even when the venv inference     encounters a, _kill_orphaned_servers must catch (ImportError, OSError, ValueError)     on the, Extract _find_llama_server_binary's env-mode search_roots block     and execute, test_infer_studio_home_swallows_permission_error(), test_kill_orphan_catches_oserror_from_studio_root() (+3 more)

### Community 836 - "Community 836"
Cohesion: 0.17
Nodes (2): fp16_model_tokenizer(), Load model in FP16 for TorchAO quantization

### Community 837 - "Community 837"
Cohesion: 0.18
Nodes (11): add_track(), get_track(), list_tracks(), Audacity CLI - Track management module.  Handles adding, removing, renaming, a, List all tracks with summary info., Add a new track to the project., Remove a track by index., Get a track by index. (+3 more)

### Community 838 - "Community 838"
Cohesion: 0.23
Nodes (11): apply_effect(), convert_format(), find_sox(), generate_tone(), get_version(), SoX backend — invoke SoX for audio processing and format conversion.  SoX (Sou, Convert audio format using SoX., Find the SoX executable. (+3 more)

### Community 839 - "Community 839"
Cohesion: 0.23
Nodes (11): build_command(), _decode_output(), has_upstream_cli(), Backend adapter for the external dify-workflow CLI., Decode subprocess bytes predictably across Windows locales., Resolve the upstream dify-workflow executable or module., Build the final subprocess command., Return whether the upstream CLI or module is available. (+3 more)

### Community 840 - "Community 840"
Cohesion: 0.24
Nodes (11): export_svg_to_eps(), export_svg_to_pdf(), export_svg_to_png(), find_inkscape(), get_version(), Inkscape backend — invoke Inkscape CLI for SVG export.  Requires: inkscape (sy, Export SVG to EPS using Inkscape., Find the Inkscape executable. (+3 more)

### Community 841 - "Community 841"
Cohesion: 0.17
Nodes (11): list_arrangements(), Arrangement operations for iTerm2.  Arrangements are saved snapshots of window, Save all current windows as a named arrangement.      Replaces any existing ar, Restore a saved arrangement.      Args:         name: Name of the arrangement, List all saved arrangement names., Save a single window as a named arrangement.      Args:         window_id: Th, Restore a saved arrangement into an existing window.      Args:         windo, restore_arrangement() (+3 more)

### Community 842 - "Community 842"
Cohesion: 0.24
Nodes (11): build_command(), command_supports_json(), NotebookLM backend adapter.  This module wraps an installed `notebooklm` CLI f, Resolve the notebooklm command from PATH., Return whether the wrapped notebooklm command supports --json., Build a notebooklm command with explicit notebook context., Redact local auth file paths from stderr/stdout., Run notebooklm and optionally parse JSON output. (+3 more)

### Community 843 - "Community 843"
Cohesion: 0.24
Nodes (11): _activity_options(), _append_if_supported(), _build_unified_frame_args(), capture_frame(), Frame capture orchestration., Run a Frame Debugger capture., Choose a frame capture activity that matches the installed Nsight version., Return known options for a parsed ngfx activity. (+3 more)

### Community 844 - "Community 844"
Cohesion: 0.18
Nodes (11): _command_string(), _dedupe(), _extract_version_from_path(), _extract_version_from_text(), Shared helpers for Nsight Graphics backend internals., Render a command for display., Deduplicate while preserving order., Extract a version string from CLI output or display text. (+3 more)

### Community 845 - "Community 845"
Cohesion: 0.17
Nodes (11): api_delete(), api_get(), api_post(), api_post_stream(), is_available(), Ollama REST API wrapper — the single module that makes network requests.  Olla, Perform a POST request with streaming NDJSON response.      Used for generate,, Perform a GET request against the Ollama API.      Args:         base_url: Ol (+3 more)

### Community 846 - "Community 846"
Cohesion: 0.24
Nodes (11): describe_process(), _format_bytes(), _format_uptime(), get_metrics(), list_processes(), Process commands — list, describe, and metrics for PM2 processes., List all PM2 processes.      Args:         as_json: If True, return raw list, Format bytes into human-readable string. (+3 more)

### Community 847 - "Community 847"
Cohesion: 0.18
Nodes (11): archive_model(), batch_cleanup(), delete_model(), list_archives(), Cleanup and archive functionality, Delete a model and its associated files      Args:         project: Project d, Restore an archived model      Args:         project: Project dict         r, Batch delete models (archiving not supported in simplified version)      Args: (+3 more)

### Community 848 - "Community 848"
Cohesion: 0.18
Nodes (11): add_batch_registrants(), add_registrant(), list_past_participants(), list_registrants(), Participant management — add, remove, list registrants for meetings.  Zoom dis, Cancel a registrant's registration.      Args:         meeting_id: Zoom meeti, List participants who actually attended a past meeting.      Note: meeting_id, Register a participant for a meeting.      The meeting must have registration (+3 more)

### Community 849 - "Community 849"
Cohesion: 0.17
Nodes (11): delete_recording(), delete_recording_file(), download_recording(), get_meeting_recordings(), list_recordings(), Recording management — list, download, and delete cloud recordings.  Handles:, Download a recording file.      Args:         download_url: The download URL, Delete all recordings for a meeting.      Args:         meeting_id: Zoom meet (+3 more)

### Community 850 - "Community 850"
Cohesion: 0.29
Nodes (10): collectDangerousInvisibleMatches(), collectMatches(), isAllowedEmojiLikeSymbol(), isDangerousInvisibleCodePoint(), isTextFile(), lineAndColumn(), listFiles(), sanitizeText() (+2 more)

### Community 851 - "Community 851"
Cohesion: 0.4
Nodes (10): buildFindingRules(), buildPolicyRules(), normalizeUri(), policyRuleId(), precisionForFinding(), renderFindingResult(), renderPolicyResults(), renderSarifReport() (+2 more)

### Community 852 - "Community 852"
Cohesion: 0.33
Nodes (9): composeStatusline(), formatGsdState(), getConfigValue(), parseStateMd(), readGsdConfig(), readGsdState(), readLastSlashCommand(), renderProgressBar() (+1 more)

### Community 853 - "Community 853"
Cohesion: 0.36
Nodes (10): atomicWriteConfig(), configEnsureSection(), configNewProject(), configSet(), configSetModelProfile(), getValueAtPath(), isValidConfigKey(), parseConfigValue() (+2 more)

### Community 854 - "Community 854"
Cohesion: 0.29
Nodes (8): escapeRegex(), existingProgressExceedsDerived(), normalizeProgressNumbers(), shouldPreserveExistingProgress(), stateExtractField(), stateReplaceField(), stateReplaceFieldWithFallback(), toFiniteNumber()

### Community 855 - "Community 855"
Cohesion: 0.25
Nodes (10): main(), Parse arguments and run the benchmark., Main function to parse arguments and run benchmarks., Create a configuration for using Gemini via OpenRouter.      Args:         ap, Create a configuration for using Gemini Flash via OpenRouter.      Args:, Run benchmarks with Gemini via OpenRouter.      Args:         args: Command l, Run benchmarks with Gemini Flash via OpenRouter.      Args:         examples:, run_benchmark() (+2 more)

### Community 856 - "Community 856"
Cohesion: 0.18
Nodes (10): create_or_update_setting(), get_all_settings(), invalidate_settings_caches(), Set a setting value      Args:         key: Setting key         value: Setti, Get all settings, optionally filtered by type      Returns:         Dict[str,, Create or update a setting      Args:         setting: Setting dictionary or, Invalidate all settings-related caches after a settings mutation.      Call th, Validate a setting value based on its type and constraints      Args: (+2 more)

### Community 857 - "Community 857"
Cohesion: 0.29
Nodes (6): checkAndResumeIndexing(), initSemanticSearch(), loadIndexingStatus(), semanticSearchHistory(), startPolling(), triggerIndexing()

### Community 858 - "Community 858"
Cohesion: 0.4
Nodes (10): clearHybridState(), filterDocuments(), getActiveSearchCollectionId(), handleSearchInput(), postFilterSemanticResults(), removeHybridLoading(), renderMergedLibraryResults(), runHybridSearch() (+2 more)

### Community 859 - "Community 859"
Cohesion: 0.18
Nodes (10): Test ResearchLog ORM queries., Test SearchCache ORM operations., Create a test database in memory., Test ResearchHistory ORM queries work correctly., Test ResearchResource ORM operations., test_db(), test_research_history_orm_queries(), test_research_log_orm_queries() (+2 more)

### Community 860 - "Community 860"
Cohesion: 0.18
Nodes (3): Fuzz tests for utility functions using Hypothesis.  These tests verify that te, Fuzz tests for search utility functions., TestSearchUtilitiesFuzzing

### Community 861 - "Community 861"
Cohesion: 0.27
Nodes (10): _arxiv_previews(), ollama_llm(), _ollama_model(), _ollama_reachable(), _ollama_url(), Live end-to-end check of the LLM relevance filter against real arXiv results., Run arXiv → relevance filter → Ollama end-to-end and report decisions., Real ChatOllama bound to the configured endpoint, or skip the test. (+2 more)

### Community 862 - "Community 862"
Cohesion: 0.18
Nodes (5): Edge-case tests for sanitize_for_log() max_length boundary behavior.  The main, Tests for max_length <= 3 branch in sanitize_for_log()., max_length=3 with long input: max_length > 3 is False, so no ellipsis., max_length=4 is > 3, so ellipsis branch applies., TestSanitizeForLogMaxLengthBoundary

### Community 863 - "Community 863"
Cohesion: 0.31
Nodes (7): log(), logError(), logInfo(), logSuccess(), logWarning(), takeScreenshot(), waitForTextOnPage()

### Community 864 - "Community 864"
Cohesion: 0.24
Nodes (2): BrowserTester, runAllTests()

### Community 865 - "Community 865"
Cohesion: 0.2
Nodes (10): _compute_fingerprint(), decrypt_api_key(), get_public_key_fingerprint(), get_public_key_pem(), init_key_pair(), SHA256 of the PEM bytes, truncated for log compactness., Generate an RSA-2048 key pair. Called once at server startup., Short SHA256 of the current public key PEM; None before init. (+2 more)

### Community 866 - "Community 866"
Cohesion: 0.24
Nodes (10): _cache_key(), is_mmproj_by_metadata(), pairing_score(), _parse_gguf_header(), Advance past one GGUF value. ``f.seek(.., 1)`` past EOF is legal     on a regula, True/False from ``general.type``; None means fall back to filename., Pairing confidence: 100 = base_model URL match, 80 = basename + org,     60 = ba, Return ``general.*`` strings from a GGUF header, or ``None`` if     the file is (+2 more)

### Community 867 - "Community 867"
Cohesion: 0.2
Nodes (3): _find_class(), Wiring tests for the per-run cancel_id field.  A chat-thread-scoped session_id i, test_chat_completion_request_has_cancel_id_field()

### Community 868 - "Community 868"
Cohesion: 0.38
Nodes (10): buildSessionHeader(), buildSummaryBlock(), buildSummarySection(), escapeRegExp(), extractHeaderField(), extractSessionSummary(), getSessionMetadata(), main() (+2 more)

### Community 869 - "Community 869"
Cohesion: 0.35
Nodes (9): assertValidInstallState(), createFallbackValidator(), createInstallState(), formatValidationErrors(), getValidator(), readInstallState(), readJson(), validateInstallState() (+1 more)

### Community 870 - "Community 870"
Cohesion: 0.38
Nodes (10): assert_bbox_coordinate(), assert_bbox_span(), assert_close(), assert_selector_count(), axis_index(), bbox_coordinate(), bbox_span(), _coerce_bbox() (+2 more)

### Community 871 - "Community 871"
Cohesion: 0.22
Nodes (3): asyncTest(), runTests(), test()

### Community 872 - "Community 872"
Cohesion: 0.33
Nodes (1): GSDTransport

### Community 873 - "Community 873"
Cohesion: 0.4
Nodes (9): createRunner(), createRunnerWithSdkPrompts(), makeDeps(), makeErrorResult(), makeEventStream(), makeProjectInfo(), makeSuccessResult(), makeTools() (+1 more)

### Community 874 - "Community 874"
Cohesion: 0.33
Nodes (4): extractBlock(), extractSteps(), PromptFactory, stripYamlFrontmatter()

### Community 875 - "Community 875"
Cohesion: 0.31
Nodes (7): makeConfig(), makeDeps(), makePhaseOp(), makePlanIndex(), makePlanInfo(), makePlanResult(), makeUsage()

### Community 876 - "Community 876"
Cohesion: 0.2
Nodes (1): QueryHotpathMethods

### Community 877 - "Community 877"
Cohesion: 0.4
Nodes (8): countRoadmapPhases(), inspectWorkstream(), listWorkstreamInventories(), planningRoot(), readStateProjection(), readSubdirectories(), workstreamsRoot(), wsPlanningPaths()

### Community 878 - "Community 878"
Cohesion: 0.36
Nodes (9): _column_exists(), downgrade(), _index_exists(), Journal quality system — unified schema migration.  Single migration for the j, # NOTE: no ``journal_quality`` column by design. Quality is, Reverse the 0006 schema changes.      DATA LOSS WARNING: this drops the ``pape, _table_exists(), _unique_constraint_exists() (+1 more)

### Community 879 - "Community 879"
Cohesion: 0.24
Nodes (3): getCsrfToken(), performSemanticSearch(), searchAllCollections()

### Community 880 - "Community 880"
Cohesion: 0.31
Nodes (9): _expected_name_lower(), _make_engine(), Data-preservation guarantees for the journals-table rebuild.  Adding ``name_lo, Alembic's batch rebuild must not leave ``_alembic_tmp_journals``., Mirror the migration's backfill expression so the test locks in     NFKC + lowe, Insert ``n`` journal rows with a mix of ASCII and Unicode names., _seed(), test_all_rows_survive_the_chain_with_correct_backfill() (+1 more)

### Community 881 - "Community 881"
Cohesion: 0.33
Nodes (4): AdvancedSearchSystem, Test script to demonstrate the duplicate links issue and our fix for issue #301., Strategy, test_bug_and_fix()

### Community 882 - "Community 882"
Cohesion: 0.2
Nodes (6): Tests for batch request patterns., Test chunking requests into batches., Test building a batch request., Test parsing batch response., Test aggregating batch errors., TestBatchRequests

### Community 883 - "Community 883"
Cohesion: 0.2
Nodes (6): Tests for generate_subscription_id function., Test that generate_subscription_id returns a string., Test that result is a valid UUID4 format., Test that subscription IDs are unique., Test that subscription and card IDs are independent., TestGenerateSubscriptionId

### Community 884 - "Community 884"
Cohesion: 0.2
Nodes (6): High-value edge case tests for research_scheduler module.  Covers: - Route bl, Scheduler blueprint is importable., Blueprint has the expected name., Blueprint has registered URL rules., Test research_scheduler route blueprint., TestSchedulerRouteBlueprint

### Community 885 - "Community 885"
Cohesion: 0.33
Nodes (9): _ok(), Redirect-handling tests for ``safe_get``.  ``safe_requests.py`` already follow, Validator's verdict on the redirect target trumps its earlier pass.      The r, _redirect(), test_legitimate_redirect_is_followed(), test_redirect_to_aws_metadata_is_blocked(), test_redirect_to_private_ip_is_blocked(), test_second_hop_blocked_when_validator_rejects_redirect_target() (+1 more)

### Community 886 - "Community 886"
Cohesion: 0.2
Nodes (3): High-value tests for utilities/search_utilities.py pure logic., TestFormatFindings, TestLanguageCodeMap

### Community 887 - "Community 887"
Cohesion: 0.24
Nodes (3): _missing_flash_attn_import(), test_runtime_flash_attn_falls_back_to_pypi(), test_runtime_flash_attn_prefers_prebuilt_wheel()

### Community 888 - "Community 888"
Cohesion: 0.27
Nodes (7): direct_wheel_url(), flash_attn_package_version(), flash_attn_wheel_url(), has_blackwell_gpu(), linux_wheel_platform_tag(), probe_torch_wheel_env(), Return True if any visible NVIDIA GPU has compute capability >= 10.0     (Blackw

### Community 889 - "Community 889"
Cohesion: 0.22
Nodes (8): clear_all_lru_caches(), clear_memory(), clear_specific_lru_cache(), monitor_cache_sizes(), Clear all LRU caches in loaded modules., Comprehensive memory clearing for persistent memory leaks.      Args:         va, Clear cache for a specific function., Monitor LRU cache sizes across modules.

### Community 890 - "Community 890"
Cohesion: 0.31
Nodes (7): annotated_context(), _check_diff(), _check_grads(), prep_triton_kernel_traits(), run_backwards(), sparse_to_dense(), test_llama4_ref()

### Community 891 - "Community 891"
Cohesion: 0.29
Nodes (9): find_blender(), get_version(), Blender backend — invoke Blender headless for rendering.  Requires: blender (s, Find the Blender executable. Raises RuntimeError if not found., Get the installed Blender version string., Run a bpy script using Blender headless.      Args:         script_path: Path, Write a bpy script to a temp file and render with Blender headless.      Args:, render_scene_headless() (+1 more)

### Community 892 - "Community 892"
Cohesion: 0.2
Nodes (9): api_delete(), api_get(), api_get_raw(), api_post(), ComfyUI API backend — wraps ComfyUI REST API HTTP calls.  This module handles, Perform a GET request and return raw bytes (for image downloads).      Args:, Perform a GET request against the ComfyUI API.      Args:         base_url: C, Perform a POST request against the ComfyUI API.      Args:         base_url: (+1 more)

### Community 893 - "Community 893"
Cohesion: 0.2
Nodes (9): Dialog and panel operations for iTerm2.  Covers modal alerts, text-input dialo, Show a macOS Save File panel and return the chosen save path.      Args:, Show a modal alert dialog with optional buttons.      Args:         title: Bo, Show a modal alert with a text input field.      Args:         title: Bold ti, Show a macOS Open File panel and return the chosen path(s).      Args:, show_alert(), show_open_panel(), show_save_panel() (+1 more)

### Community 894 - "Community 894"
Cohesion: 0.29
Nodes (9): convert(), convert_odf_to(), find_libreoffice(), get_version(), LibreOffice backend — invoke LibreOffice headless for format conversions.  Thi, Convert an ODF file to another format via LibreOffice headless.      This is t, Find the LibreOffice executable.      Returns the absolute path to the libreof, Get the installed LibreOffice version string. (+1 more)

### Community 895 - "Community 895"
Cohesion: 0.2
Nodes (9): add_instrument(), list_instruments(), Instrument management — list, add, remove, reorder.  For listing, uses mscore, Remove an instrument from a .mscz score.      Args:         path: Path to inp, Reorder instruments in a .mscz score.      Args:         path: Path to input, List instruments in a score.      Tries mscore --score-meta first, falls back, Add an instrument to a .mscz score via MSCX XML manipulation.      Args:, remove_instrument() (+1 more)

### Community 896 - "Community 896"
Cohesion: 0.22
Nodes (9): Transposition logic — by key, by interval, diatonic., Transpose a score by a chromatic interval.      Specify either semitones or in, Transpose a score diatonically by a number of steps.      Args:         steps, Convert a semitone count to the mscore transposeInterval index.      Args:, Transpose a score to a target key.      Args:         input_path: Path to inp, semitones_to_interval_index(), transpose_by_interval(), transpose_by_key() (+1 more)

### Community 897 - "Community 897"
Cohesion: 0.27
Nodes (9): autofix(), Fix, _iter_params(), Workflow auto-fixer — detect and repair common workflow issues.  Inspired by n, Recursively iterate parameter key-value pairs.      Returns (dotted_key, strin, A single fix that can be applied to a workflow., Set a nested value using dot/bracket notation.      Handles keys like 'a.b', ', Detect and optionally fix common workflow issues.      Returns (possibly modif (+1 more)

### Community 898 - "Community 898"
Cohesion: 0.29
Nodes (9): get_installation_report(), list_installations(), main(), parseArgs(), printHuman(), Return all detected Nsight Graphics installations., Return the current Nsight Graphics installation report., showHelp() (+1 more)

### Community 899 - "Community 899"
Cohesion: 0.24
Nodes (9): _extract_long_option(), parse_option_help(), parse_unified_help(), Parsing helpers for Nsight Graphics CLI output., Map a requested activity name onto the current Nsight installation., Extract the primary long option token from a help line., Parse `ngfx --help-all` output into structured metadata., Extract long options from arbitrary CLI help output. (+1 more)

### Community 900 - "Community 900"
Cohesion: 0.4
Nodes (9): analyzeForGovernanceEvents(), detectApprovalRequired(), detectSecrets(), detectSensitivePath(), emitGovernanceEvent(), fingerprintCommand(), generateEventId(), run() (+1 more)

### Community 901 - "Community 901"
Cohesion: 0.36
Nodes (8): detectProjectType(), getComposerDeps(), getElixirDeps(), getGoDeps(), getPackageJsonDeps(), getPythonDeps(), getRustDeps(), hasFileWithExtension()

### Community 902 - "Community 902"
Cohesion: 0.38
Nodes (9): build_cad_token(), normalize_cad_path(), normalize_selector_list(), parse_cad_tokens(), parse_selector(), ParsedSelector, ParsedToken, _selector_type_for_kind() (+1 more)

### Community 903 - "Community 903"
Cohesion: 0.42
Nodes (8): calculateScore(), computeScore(), confidenceWeight(), isTemplateInventoryFinding(), mapToScoreCategory(), roundedCategoryScore(), scoreToGrade(), summarizeFindings()

### Community 904 - "Community 904"
Cohesion: 0.33
Nodes (4): CLITransport, formatTime(), truncate(), usd()

### Community 905 - "Community 905"
Cohesion: 0.36
Nodes (1): PlanningRuntime

### Community 906 - "Community 906"
Cohesion: 0.36
Nodes (1): QueryNativeDirectAdapter

### Community 907 - "Community 907"
Cohesion: 0.28
Nodes (1): QuerySubprocessAdapter

### Community 908 - "Community 908"
Cohesion: 0.33
Nodes (5): setupMinimalStateProject(), setupPhasesFixture(), withFreshPhaseProjects(), withFreshPhasesProjects(), withFreshRoadmapProjects()

### Community 909 - "Community 909"
Cohesion: 0.42
Nodes (8): checkAgentsInstalled(), detectDocTooling(), detectMonorepoWorkspaces(), detectProjectType(), docsInit(), hasGsdMarker(), pathExistsInternal(), scanExistingDocs()

### Community 910 - "Community 910"
Cohesion: 0.42
Nodes (7): frontmatterMerge(), frontmatterSet(), needsQuoting(), parseSimpleValue(), reconstructFrontmatter(), serializeArray(), spliceFrontmatter()

### Community 911 - "Community 911"
Cohesion: 0.31
Nodes (5): fallbackDispatchErrorFromSignal(), fallbackFailureError(), nativeDispatchErrorFromSignal(), nativeFailureError(), nativeTimeoutError()

### Community 912 - "Community 912"
Cohesion: 0.25
Nodes (2): syncRootStateMirror(), workstreamSet()

### Community 913 - "Community 913"
Cohesion: 0.31
Nodes (8): main(), Run BrowseComp benchmark., Run configuration comparison., Run benchmark examples., Run SimpleQA benchmark., run_browsecomp_example(), run_comparison_example(), run_simpleqa_example()

### Community 914 - "Community 914"
Cohesion: 0.22
Nodes (8): example_1_simple(), example_2_client(), example_3_context_manager(), example_4_batch_research(), Simplest possible usage - one line research., Using the client for multiple operations., Using context manager for automatic cleanup., Running multiple research queries efficiently.

### Community 915 - "Community 915"
Cohesion: 0.31
Nodes (8): compare_strategies(), demonstrate_focused_iteration_strategy(), demonstrate_source_based_strategy(), main(), Direct comparison of both strategies on the same topic., Source-based strategy:     - Focuses on gathering and synthesizing information, Run all demonstrations., Focused-iteration strategy:     - Iteratively refines the research based on pre

### Community 916 - "Community 916"
Cohesion: 0.33
Nodes (8): main(), optimize_for_quality(), optimize_for_speed(), optimize_parameters(), print_optimization_results(), Example of multi-benchmark optimization using weighted benchmarks.  This scrip, Print optimization results in a nicely formatted way., Run the multi-benchmark optimization examples.

### Community 917 - "Community 917"
Cohesion: 0.31
Nodes (8): _callable_name(), check_datetime_columns(), main(), Main entry point for the pre-commit hook., Return the callable's short name regardless of ``X`` or ``sa.X`` form., Return list of ('call', Call) or ('name', str) entries for all     type-like no, Check a Python file for DateTime columns that should use UtcDateTime.      Ret, _resolve_type_arg()

### Community 918 - "Community 918"
Cohesion: 0.25
Nodes (8): cleanup_idle_connections(), _count_open_fds(), Automatic cleanup of idle database connections.  Periodically closes database, Start APScheduler job for periodic connection cleanup.      Args:         ses, # WHY: After days of idle operation in Docker, the app crashed with, Count open file descriptors for the current process., Close db connections for users with no active sessions and no active research., start_connection_cleanup_scheduler()

### Community 919 - "Community 919"
Cohesion: 0.22
Nodes (5): Test browser-specific endpoints., Test the browser endpoint /api/start_research., Test research status endpoint., Test that endpoint requires authentication., TestBrowserEndpoint

### Community 920 - "Community 920"
Cohesion: 0.25
Nodes (8): check_file_for_raw_sql(), Files that touch the DB should reach for the ORM, not raw SQL.      Walk the s, Check a single file for raw SQL usage., Test that models are imported from the consolidated location., Test that no raw SQL is used in src directory (except allowed patterns)., test_models_imported_from_correct_location(), test_no_raw_sql_in_src(), test_orm_imports_used()

### Community 921 - "Community 921"
Cohesion: 0.33
Nodes (7): _fake_disk_usage(), Disk-space pre-check in `download_journal_data`., Write the current PID into the sentinel so the downloader's     PID-based liven, _stamp_live_sentinel(), test_disk_space_above_threshold_proceeds_past_check(), test_disk_space_below_threshold_refuses_download(), test_disk_usage_os_error_does_not_block_download()

### Community 922 - "Community 922"
Cohesion: 0.36
Nodes (1): MobileDiagnosticTool

### Community 923 - "Community 923"
Cohesion: 0.28
Nodes (5): _build_prompt_text(), is_external_host(), True when `host` is reachable from beyond loopback., Return the resolved server-side tool policy.      Args:         host: The bind a, resolve_tool_policy()

### Community 924 - "Community 924"
Cohesion: 0.28
Nodes (8): _parse_argparse_add_argument_default(), _parse_function_param_defaults(), Return {param_name: default_value} for a named function in *source*.      Only h, Return the 'default' kwarg value for add_argument(option_name, ...) in *source*., run_server() parameter default for 'host' must be 127.0.0.1, not 0.0.0.0.      B, argparse --host add_argument default must be 127.0.0.1.      When run.py is invo, test_argparse_default_host_is_loopback(), test_run_server_default_host_is_loopback()

### Community 925 - "Community 925"
Cohesion: 0.33
Nodes (4): (Re-)import install_python_stack with a controlled env and return _PYTORCH_WHL_B, UNSLOTH_PYTORCH_MIRROR controls _PYTORCH_WHL_BASE in install_python_stack., _reload_whl_base(), TestPyTorchMirrorEnvVar

### Community 926 - "Community 926"
Cohesion: 0.22
Nodes (1): TestToolPolicy

### Community 927 - "Community 927"
Cohesion: 0.39
Nodes (8): _build_gpu_metrics(), get_backend_visible_gpu_info(), get_physical_gpu_count(), get_primary_gpu_utilization(), get_visible_gpu_utilization(), _parse_smi_value(), Return physical GPU count via nvidia-smi, or None on failure., _visible_ordinal_map()

### Community 928 - "Community 928"
Cohesion: 0.36
Nodes (6): _find_method(), _return_tuple_arity(), test_export_methods_return_three_element_tuples(), test_export_methods_return_three_tuple_annotation(), test_gpu_save_method_bound_for_hub_only(), test_local_save_assigns_output_path()

### Community 929 - "Community 929"
Cohesion: 0.25
Nodes (2): _find_func(), test_run_mlx_training_passes_token_to_from_pretrained()

### Community 930 - "Community 930"
Cohesion: 0.31
Nodes (8): check_package_installed(), detect_package_manager(), Require a Python package to be installed, exit if not found, Check if a package is installed using the system package manager, Require a package to be installed, exit if not found, Detect the available package manager, require_package(), require_python_package()

### Community 931 - "Community 931"
Cohesion: 0.31
Nodes (8): _format_prompt(), _load_config(), main(), train_sustainability_model.py  LoRA fine-tune from YAML config. Requires Unsloth, Convert instruction/chat/dpo record to a single 'text' field., Merge model_variables.yaml defaults with the given config file., _require_approval(), train()

### Community 932 - "Community 932"
Cohesion: 0.22
Nodes (7): get_selection(), Audacity CLI - Selection management module.  Manages the current selection ran, Set the selection range., Select the entire project duration (from 0 to max track end)., Get the current selection range., select_all(), set_selection()

### Community 933 - "Community 933"
Cohesion: 0.25
Nodes (7): add_guide(), _next_guide_id(), Kdenlive CLI - Guide/marker management module., Generate next unique guide ID., Add a guide/marker at a position (in seconds)., Remove a guide by ID., remove_guide()

### Community 934 - "Community 934"
Cohesion: 0.39
Nodes (7): buildStyle(), createGroup(), createLabeledRectangle(), createOval(), createRectangle(), createText(), fontName()

### Community 935 - "Community 935"
Cohesion: 0.42
Nodes (8): main(), parseArgs(), printDecisions(), printSessionDetail(), printSessionList(), printSkillRuns(), printWorkers(), showHelp()

### Community 936 - "Community 936"
Cohesion: 0.39
Nodes (7): configDiffers(), findSubSections(), log(), main(), removeSectionFromText(), removeServerFromText(), warn()

### Community 937 - "Community 937"
Cohesion: 0.39
Nodes (7): evaluate(), findFileIssues(), getStagedFileContent(), getStagedFiles(), run(), runLinter(), validateCommitMessage()

### Community 938 - "Community 938"
Cohesion: 0.36
Nodes (8): buildAgentCatalog(), compressToCatalog(), compressToSummary(), extractSummary(), lazyLoadAgent(), loadAgent(), loadAgents(), parseFrontmatter()

### Community 939 - "Community 939"
Cohesion: 0.39
Nodes (8): appendSkillObservation(), createObservationId(), createSkillObservation(), ensureString(), getSkillObservationsPath(), getSkillTelemetryRoot(), readSkillObservations(), resolveProjectRoot()

### Community 940 - "Community 940"
Cohesion: 0.31
Nodes (4): cleanupTempDir(), createTempDir(), runTests(), test()

### Community 941 - "Community 941"
Cohesion: 0.25
Nodes (2): runTests(), test()

### Community 942 - "Community 942"
Cohesion: 0.25
Nodes (0): 

### Community 943 - "Community 943"
Cohesion: 0.25
Nodes (0): 

### Community 944 - "Community 944"
Cohesion: 0.39
Nodes (2): hashRequest(), PlanningJournal

### Community 945 - "Community 945"
Cohesion: 0.32
Nodes (1): QueryRuntimeBridge

### Community 946 - "Community 946"
Cohesion: 0.5
Nodes (7): checkCompletion(), checkMilestoneCompletion(), checkPhaseCompletion(), countFailLines(), deriveUatStatus(), deriveVerificationStatus(), readFileSafe()

### Community 947 - "Community 947"
Cohesion: 0.39
Nodes (5): extractFrontmatter(), extractFrontmatterLeading(), frontmatterGet(), parseFrontmatterYamlLines(), splitInlineArray()

### Community 948 - "Community 948"
Cohesion: 0.43
Nodes (7): coerceFmArray(), extractOneLinerFromBody(), getArchivedPhaseDirs(), historyDigest(), parseDecisions(), readSubdirectories(), summaryExtract()

### Community 949 - "Community 949"
Cohesion: 0.43
Nodes (7): auditUat(), buildUatCheckpoint(), categorizeItem(), parseUatItems(), parseVerificationFrontmatterItems(), parseVerificationItems(), uatRenderCheckpoint()

### Community 950 - "Community 950"
Cohesion: 0.29
Nodes (7): column_exists(), downgrade(), Add progress tracking columns to task_metadata  This migration adds columns th, Check if a column exists in a table., Add progress tracking columns to task_metadata if they don't exist., Remove progress tracking columns from task_metadata., upgrade()

### Community 951 - "Community 951"
Cohesion: 0.32
Nodes (7): downgrade(), _index_exists(), Add performance indexes to research_tasks and research_history  This migration, Add performance indexes to research_tasks and research_history., Remove performance indexes from research_tasks and research_history., Check if an index exists on a table.      Creates a fresh inspector each call, upgrade()

### Community 952 - "Community 952"
Cohesion: 0.32
Nodes (7): column_exists(), downgrade(), Add document_id column to research_resources  This migration adds the document, Check if a column exists in a table., Add document_id column to research_resources if it doesn't exist., Remove document_id column from research_resources., upgrade()

### Community 953 - "Community 953"
Cohesion: 0.32
Nodes (7): generate_topics(), _generate_with_llm(), Topic generation utilities for news items. Uses LLM to extract relevant topics/, Validate and clean topics., Generate relevant topics/tags from news content.      Args:         query: Th, Generate topics using LLM., _validate_topics()

### Community 954 - "Community 954"
Cohesion: 0.29
Nodes (7): find_route(), get_all_routes(), get_routes_by_blueprint(), Route Registry - Central documentation of all application routes This file prov, Get a flat list of all routes across blueprints, Get routes for a specific blueprint, Find routes matching a path pattern

### Community 955 - "Community 955"
Cohesion: 0.25
Nodes (1): FormValidator

### Community 956 - "Community 956"
Cohesion: 0.25
Nodes (5): Test using manually created session from browser.  This test is skipped by def, Test authentication using browser session cookie., Test using manually provided session cookie.          To use this test:, Test API operations with manual session., TestManualBrowserAuth

### Community 957 - "Community 957"
Cohesion: 0.32
Nodes (7): modify_llm_creation(), patch_db_setting(), Test script to validate custom context window size setting.  This script tests, Test custom context window size for different providers., Patch the settings retrieval to override certain settings.     This simulates w, Simulate creating an LLM with a custom context window size setting.      Args:, test_custom_context_size()

### Community 958 - "Community 958"
Cohesion: 0.32
Nodes (6): _fake_disk_usage(), Exception text must not leak into the downloader's return message.  CodeQL ale, On the happy path, success message is count+elapsed only., Ensure str(exc) from build_db failure never reaches the caller., test_build_db_exception_text_does_not_leak_into_message(), test_healthy_success_message_has_no_exception_artifacts()

### Community 959 - "Community 959"
Cohesion: 0.25
Nodes (5): Tests for text_cleaner exception/fallback path (lines 32-39).  The exception b, Cover the exception branch that falls back to encode/decode with ignore., When the primary encode().decode() chain raises, fallback is used., The ignore-errors fallback produces valid UTF-8., TestRemoveSurrogatesExceptionFallback

### Community 960 - "Community 960"
Cohesion: 0.68
Nodes (7): delay(), log(), loginUser(), modifySettings(), registerUser(), testSettingsPersistence(), verifySettingsPersistence()

### Community 961 - "Community 961"
Cohesion: 0.39
Nodes (1): ComprehensiveMobileTest

### Community 962 - "Community 962"
Cohesion: 0.39
Nodes (1): MobileFixesTest

### Community 963 - "Community 963"
Cohesion: 0.39
Nodes (1): MobileUITester

### Community 964 - "Community 964"
Cohesion: 0.25
Nodes (3): HTML-safe variant of the quality-tag helper.  The plaintext ``_format_quality_, Unicode stars are safe and must survive escaping., test_html_variant_star_characters_are_preserved()

### Community 965 - "Community 965"
Cohesion: 0.25
Nodes (7): Tests for the daemon-thread excepthook.  Covers: - _install_thread_excepthook, After installing the hook, an uncaught exception on a daemon thread     must be, If the outer structure of _perform_post_login_tasks itself raises     (for exam, Positive path: when the body succeeds, the wrapper forwards to     it exactly o, test_install_thread_excepthook_logs_uncaught_exception(), test_perform_post_login_tasks_body_runs_when_no_outer_error(), test_perform_post_login_tasks_catches_outer_exceptions()

### Community 966 - "Community 966"
Cohesion: 0.32
Nodes (3): createAuthTokenInfoDropdown(), createHeaderEditorModal(), renderToolInterface()

### Community 967 - "Community 967"
Cohesion: 0.29
Nodes (4): Toolset, ToolsetConfig, ToolsetManifest, IsValidName()

### Community 968 - "Community 968"
Cohesion: 0.25
Nodes (3): MockDataset, Test basic RawTextDataLoader functionality., test_raw_text_loader()

### Community 969 - "Community 969"
Cohesion: 0.32
Nodes (7): _find_typer_option_default(), Tests that the 'unsloth studio' CLI defaults to 127.0.0.1.  Uses AST parsing to, Return the default value of a typer.Option(...) parameter in *func_name*.      M, `unsloth studio` (studio_default) --host typer Option default must be 127.0.0.1., `unsloth studio run` --host typer Option default must be 127.0.0.1., test_studio_default_host_is_loopback(), test_studio_run_host_is_loopback()

### Community 970 - "Community 970"
Cohesion: 0.29
Nodes (4): _collect_assignments(), Tests for the llama-server wall-clock cap (t_max_predict_ms).  The UI always sen, Return list of (node, stack_of_enclosing_ifs) for each match., test_t_max_predict_ms_set_unconditionally_at_three_sites()

### Community 971 - "Community 971"
Cohesion: 0.25
Nodes (7): add_label(), list_labels(), Audacity CLI - Label/marker management module.  Labels mark timestamps or time, Add a label to the project., Remove a label by index., List all labels in the project., remove_label()

### Community 972 - "Community 972"
Cohesion: 0.32
Nodes (7): download_image(), download_prompt_images(), list_output_images(), Image output management — download and list generated images.  Covers: - List, Download all output images for a completed prompt to a directory.      Args:, List all output images for a completed prompt.      Args:         base_url: C, Download a single output image from ComfyUI.      Args:         base_url: Com

### Community 973 - "Community 973"
Cohesion: 0.32
Nodes (7): export_diagram(), find_drawio(), get_drawio_version(), Draw.io backend — invoke draw.io desktop CLI for diagram export.  The draw.io, Find the draw.io CLI executable. Raises RuntimeError if not found., Get the installed draw.io version string., Export a .drawio file to PNG, PDF, SVG, or VSDX.      Args:         drawio_pa

### Community 974 - "Community 974"
Cohesion: 0.29
Nodes (7): build_contents_param(), check_connectivity(), get_client(), exa_backend.py — Exa API client wrapper.  Initialises the exa-py SDK client fr, Return an authenticated Exa client.      Raises:         RuntimeError: if EXA, Verify the API key is valid by running a minimal search.      Returns a dict w, Translate CLI content/freshness flags into an exa-py `contents` dict.      Arg

### Community 975 - "Community 975"
Cohesion: 0.25
Nodes (7): Godot script execution — run GDScript files in headless mode., Check if a GDScript file has valid syntax using Godot's parser.      Args:, Execute a GDScript file in headless mode.      The script must extend SceneTre, Run inline GDScript code by writing a temporary .gd file.      The code is wra, run_inline(), run_script(), validate_script()

### Community 976 - "Community 976"
Cohesion: 0.25
Nodes (7): download_weights(), get_weight_info(), list_downloaded_weights(), Model weight management utilities, Get weight directory and environment info, Download model weights using unimol_tools weighthub      Args:         model_, List all downloaded weights

### Community 977 - "Community 977"
Cohesion: 0.57
Nodes (7): add_item_to_collection(), create_collection(), move_item_to_collection(), _require_offline(), _require_user_library(), _session_library_id(), _user_library_id()

### Community 978 - "Community 978"
Cohesion: 0.46
Nodes (7): main(), parseArgs(), printComponents(), printModules(), printPlan(), printProfiles(), showHelp()

### Community 979 - "Community 979"
Cohesion: 0.54
Nodes (7): blockMessage(), checkEdit(), checkWrite(), matchesProtectedFile(), normalizePath(), parseInput(), run()

### Community 980 - "Community 980"
Cohesion: 0.25
Nodes (0): 

### Community 981 - "Community 981"
Cohesion: 0.43
Nodes (6): appendJsonl(), cleanupTempDir(), createSkill(), createTempDir(), runTests(), test()

### Community 982 - "Community 982"
Cohesion: 0.29
Nodes (2): runTests(), test()

### Community 983 - "Community 983"
Cohesion: 0.25
Nodes (0): 

### Community 984 - "Community 984"
Cohesion: 0.29
Nodes (2): runTests(), test()

### Community 985 - "Community 985"
Cohesion: 0.48
Nodes (6): buildConfigContext(), calculateResistanceScore(), createBatches(), evaluateBatch(), parseToolResponse(), runInjectionTests()

### Community 986 - "Community 986"
Cohesion: 0.29
Nodes (0): 

### Community 987 - "Community 987"
Cohesion: 0.29
Nodes (0): 

### Community 988 - "Community 988"
Cohesion: 0.48
Nodes (5): collectWatchDirectories(), createPathWatchers(), isRecursiveWatchUnsupported(), performInitialScan(), startWatcher()

### Community 989 - "Community 989"
Cohesion: 0.43
Nodes (3): failureClassification(), GSDToolsError, timeoutClassification()

### Community 990 - "Community 990"
Cohesion: 0.43
Nodes (4): isRuntimeTierName(), normalizeRuntimeTierEntry(), resolveModel(), resolveRuntimeTier()

### Community 991 - "Community 991"
Cohesion: 0.52
Nodes (6): extractCanonicalPlanId(), extractObjective(), findPhase(), getPhaseFileStats(), phasePlanIndex(), searchPhaseInDir()

### Community 992 - "Community 992"
Cohesion: 0.52
Nodes (6): buildScanSessionsProjects(), formatBytes(), getProjectName(), getScanSessionsRoot(), readSessionIndex(), scanProjectDir()

### Community 993 - "Community 993"
Cohesion: 0.62
Nodes (6): expandFirstDottedToken(), explainQueryCommandNoMatch(), matchRegisteredPrefix(), normalizeQueryCommand(), resolveQueryCommand(), resolveQueryTokens()

### Community 994 - "Community 994"
Cohesion: 0.52
Nodes (6): assertAliasCanonicalsHaveHandlers(), assertMutationCommandsRegistered(), assertNoDuplicateRegisteredCommands(), assertRawOutputPolicyCommandsRegistered(), collectRegistryAssemblyInvariantReport(), toSortedList()

### Community 995 - "Community 995"
Cohesion: 0.29
Nodes (6): add_resource(), delete_resource(), get_resources_for_research(), Retrieve resources associated with a specific research project      Args:, Add a new resource to the research_resources table      Args:         researc, Delete a resource from the database      Args:         resource_id (int): The

### Community 996 - "Community 996"
Cohesion: 0.43
Nodes (5): getResearchIdFromUrl(), initSaveToCollection(), loadCollections(), renderCollections(), showCollectionModal()

### Community 997 - "Community 997"
Cohesion: 0.43
Nodes (5): areConfirmationsEnabled(), confirmAndRun(), hideDeleteModal(), initDeleteConfirmModal(), showDeleteConfirmation()

### Community 998 - "Community 998"
Cohesion: 0.29
Nodes (1): BaseApiTest

### Community 999 - "Community 999"
Cohesion: 0.29
Nodes (6): Test that all models can be imported from the consolidated location., Test that benchmark model relationships are properly defined., Test that research models have the expected columns after consolidation., test_all_models_importable(), test_benchmark_models_relationships(), test_research_models_have_correct_columns()

### Community 1000 - "Community 1000"
Cohesion: 0.29
Nodes (3): Test that pool configuration constants have expected values.  These tests ensu, Verify shared pool configuration constants., TestPoolConfigConstants

### Community 1001 - "Community 1001"
Cohesion: 0.29
Nodes (4): End-to-end CSRF flow test for browser-facing API endpoints.  Verifies the full, Test the complete CSRF flow from login through API usage., Test complete browser-like flow: register → get CSRF token → API call., TestCSRFEndToEndFlow

### Community 1002 - "Community 1002"
Cohesion: 0.57
Nodes (6): checkServerRunning(), generateReport(), getAllTestFiles(), log(), runAllTests(), runTest()

### Community 1003 - "Community 1003"
Cohesion: 0.62
Nodes (6): checkServerRunning(), ensureScreenshotsDir(), generateReport(), log(), runAllTests(), runTest()

### Community 1004 - "Community 1004"
Cohesion: 0.71
Nodes (6): configureExportSettings(), createResearchAndWait(), delay(), log(), testExportFunctionality(), waitForSelectorWithTimeout()

### Community 1005 - "Community 1005"
Cohesion: 0.71
Nodes (6): captureMetricsDashboard(), ensureAuthenticated(), log(), startResearch(), testMetricsVerification(), waitForResearchProgress()

### Community 1006 - "Community 1006"
Cohesion: 0.33
Nodes (6): _flag_name(), is_managed_flag(), True if ``flag`` is a Studio-managed llama-server flag., Return the flag name for a token, or None if it isn't a flag.      Peels ``--key, Validate user-supplied llama-server args.      Returns the args as a flat list r, validate_extra_args()

### Community 1007 - "Community 1007"
Cohesion: 0.48
Nodes (5): can_resume_run(), get_resume_checkpoint_path(), has_resume_state(), _is_under_outputs(), normalize_resume_output_dir()

### Community 1008 - "Community 1008"
Cohesion: 0.33
Nodes (6): clear_unsloth_compiled_cache(), get_existing_cache_dirs(), Return known compiled-cache directories that currently exist on disk., Add all existing compiled-cache directories to sys.path and PYTHONPATH.      Thi, Remove compiled files from the cache directory (idempotent).      Args:, register_compiled_cache_on_path()

### Community 1009 - "Community 1009"
Cohesion: 0.43
Nodes (4): _import_helpers(), test_impl_is_separately_exposed(), test_patch_trl_rl_trainers_swallows_garbage_input(), test_patch_trl_rl_trainers_swallows_unknown_trainer_name()

### Community 1010 - "Community 1010"
Cohesion: 0.33
Nodes (6): _module_calls(), Tests that ``unsloth run`` is registered as a top-level alias for ``unsloth stud, `app.command("run", ...)` must be invoked with studio_run as its target., The alias must wire up to the studio.run function, not redefine it., test_studio_run_imported_for_alias(), test_top_level_run_alias_registered()

### Community 1011 - "Community 1011"
Cohesion: 0.52
Nodes (6): _make_seq_info(), test_run_attention_flash_varlen_receives_window_and_softcap(), test_run_attention_sdpa_passes_sliding_window(), test_run_attention_xformers_passes_sliding_window(), test_sdpa_packed_attention_mask_sliding_window(), test_xformers_block_mask_sliding_window()

### Community 1012 - "Community 1012"
Cohesion: 0.29
Nodes (4): `sentence_transformers.util.{import_from_string, load_dir_path}` —     used by u, Transformer / Pooling / Normalize must be reachable through     `sentence_transf, test_st_models_re_exports(), test_st_util_helpers()

### Community 1013 - "Community 1013"
Cohesion: 0.33
Nodes (6): fetch_text(), first_match(), has_def(), Fetch a file from GitHub raw. None on 404 (the path was renamed     or removed i, Heuristic AST-equivalent grep for `class Name`, `def name`,     or `Name = ...`, Try a list of candidate paths; return (path, src) for the first     one that exi

### Community 1014 - "Community 1014"
Cohesion: 0.29
Nodes (1): Tag operations for RMS API.

### Community 1015 - "Community 1015"
Cohesion: 0.29
Nodes (1): Company operations for RMS API.

### Community 1016 - "Community 1016"
Cohesion: 0.29
Nodes (3): File operations for RMS API., Upload a file. Uses multipart form data., upload_file()

### Community 1017 - "Community 1017"
Cohesion: 0.29
Nodes (1): Device hotspot operations for RMS API.

### Community 1018 - "Community 1018"
Cohesion: 0.29
Nodes (1): SMTP configuration operations for RMS API.

### Community 1019 - "Community 1019"
Cohesion: 0.38
Nodes (3): Assert-InTarget(), Get-RelativePath(), Write-ManagedFile()

### Community 1020 - "Community 1020"
Cohesion: 0.57
Nodes (6): emitHookResult(), getPluginRoot(), main(), readStdinRaw(), writeLegacySpawnOutput(), writeStderr()

### Community 1021 - "Community 1021"
Cohesion: 0.48
Nodes (5): detectPatterns(), generateReport(), groupFailures(), inspect(), normalizeFailureReason()

### Community 1022 - "Community 1022"
Cohesion: 0.33
Nodes (2): runTests(), test()

### Community 1023 - "Community 1023"
Cohesion: 0.33
Nodes (2): runTests(), test()

### Community 1024 - "Community 1024"
Cohesion: 0.33
Nodes (2): runTests(), test()

### Community 1025 - "Community 1025"
Cohesion: 0.33
Nodes (2): runTests(), test()

### Community 1026 - "Community 1026"
Cohesion: 0.38
Nodes (3): resolvePowerShellCommand(), runTests(), test()

### Community 1027 - "Community 1027"
Cohesion: 0.33
Nodes (2): runTests(), test()

### Community 1028 - "Community 1028"
Cohesion: 0.33
Nodes (2): runTests(), test()

### Community 1029 - "Community 1029"
Cohesion: 0.4
Nodes (2): makeBaseline(), makeScore()

### Community 1030 - "Community 1030"
Cohesion: 0.33
Nodes (0): 

### Community 1031 - "Community 1031"
Cohesion: 0.6
Nodes (5): buildBannerOutput(), main(), readCache(), recordFailureWarning(), shouldSuppressFailureWarning()

### Community 1032 - "Community 1032"
Cohesion: 0.33
Nodes (1): BufferStream

### Community 1033 - "Community 1033"
Cohesion: 0.33
Nodes (0): 

### Community 1034 - "Community 1034"
Cohesion: 0.53
Nodes (4): errorMessage(), isTimeoutMessage(), parseTimeoutMs(), toFailureSignal()

### Community 1035 - "Community 1035"
Cohesion: 0.47
Nodes (1): QueryNativeHotpathAdapter

### Community 1036 - "Community 1036"
Cohesion: 0.47
Nodes (3): failureToolsError(), timeoutToolsError(), toToolsErrorFromUnknown()

### Community 1037 - "Community 1037"
Cohesion: 0.33
Nodes (1): WSTransport

### Community 1038 - "Community 1038"
Cohesion: 0.47
Nodes (3): buildGoldenParityExceptions(), isMutationCanonicalCmd(), READ_HANDLER_ONLY_REASON()

### Community 1039 - "Community 1039"
Cohesion: 0.6
Nodes (5): checkCommit(), commit(), commitToSubrepo(), execGit(), sanitizeCommitMessage()

### Community 1040 - "Community 1040"
Cohesion: 0.6
Nodes (5): checkPhaseReady(), dependenciesMet(), hasUiSpecFile(), inferNextStep(), roadmapPhaseLineHasUiIndicators()

### Community 1041 - "Community 1041"
Cohesion: 0.33
Nodes (0): 

### Community 1042 - "Community 1042"
Cohesion: 0.33
Nodes (5): downgrade(), Initial schema - baseline migration  This migration creates all tables from th, Create all tables from models.      Uses SQLAlchemy's metadata.create_all() to, ⚠️  DESTRUCTIVE OPERATION - Drop all tables.      WARNING: This will permanent, upgrade()

### Community 1043 - "Community 1043"
Cohesion: 0.33
Nodes (5): downgrade(), Migrate legacy app.* settings to correct scoped keys  One-time data migration, No-op: the old app.* keys were stale legacy artifacts with no consumers., Delete deprecated settings and re-scope app.* keys., upgrade()

### Community 1044 - "Community 1044"
Cohesion: 0.47
Nodes (5): downgrade(), Retarget ResearchStrategy.research_id FK to research_history.id.  Background, Restore the prior (broken) schema for chain consistency.      Note: the prior, _table_row_count(), upgrade()

### Community 1045 - "Community 1045"
Cohesion: 0.4
Nodes (5): generate_headline(), _generate_with_llm(), Headline generation utilities for news items. Uses LLM to generate concise, mea, Generate a concise headline from a query and optional findings.      Args:, Generate headline using LLM.

### Community 1046 - "Community 1046"
Cohesion: 0.53
Nodes (4): createSemanticResultCard(), highlightTerms(), isSafeExternalUrl(), renderSnippet()

### Community 1047 - "Community 1047"
Cohesion: 0.4
Nodes (5): get_default_elasticsearch_config(), get_default_search_engine_configs(), Default search engine configurations. This file can be used to initialize the s, Returns a dictionary of default search engine configurations.      Returns:, Returns the default Elasticsearch search engine configuration.      Returns:

### Community 1048 - "Community 1048"
Cohesion: 0.47
Nodes (3): executeCurl(), makeAuthenticatedRequest(), tryParseJSON()

### Community 1049 - "Community 1049"
Cohesion: 0.33
Nodes (2): Tests for domain_classifier lazy import __getattr__., TestDomainClassifierLazyImports

### Community 1050 - "Community 1050"
Cohesion: 0.47
Nodes (5): check_server_running(), main(), Check if the server is running on localhost:5000, Run the appropriate health check script, run_health_check()

### Community 1051 - "Community 1051"
Cohesion: 0.33
Nodes (5): Test research API validation  These tests require a running server instance an, Test validation of required fields, Test that research API requires authentication, test_research_requires_authentication(), test_research_without_required_fields()

### Community 1052 - "Community 1052"
Cohesion: 0.67
Nodes (4): createResearch(), log(), registerAndLogin(), testMetricsDashboard()

### Community 1053 - "Community 1053"
Cohesion: 0.8
Nodes (5): captureMetricsDashboard(), configureSettingsForTest(), log(), startAndCompleteResearch(), testMetricsFullFlow()

### Community 1054 - "Community 1054"
Cohesion: 0.8
Nodes (5): createAndWaitForResearch(), delay(), log(), registerAndLogin(), testResearchDetails()

### Community 1055 - "Community 1055"
Cohesion: 0.6
Nodes (5): _extract_cache_keys(), _load_workflow(), main(), _normalise_on(), _trigger_set()

### Community 1056 - "Community 1056"
Cohesion: 0.33
Nodes (0): 

### Community 1057 - "Community 1057"
Cohesion: 0.4
Nodes (2): test_resolution_matrix(), TestGetModelName

### Community 1058 - "Community 1058"
Cohesion: 0.53
Nodes (5): Regression guard: descender-prone text spans in Studio must not pair `leading-no, _read(), test_model_selector_trigger_label_uses_leading_tight(), test_no_truncate_plus_leading_none_in_changed_files(), test_sidebar_account_block_uses_leading_tight()

### Community 1059 - "Community 1059"
Cohesion: 0.33
Nodes (4): add_to_comparison(), print_model_comparison(), Add model results to the comparison tracker, Print a comparison of all models evaluated so far

### Community 1060 - "Community 1060"
Cohesion: 0.33
Nodes (4): get_model_info(), list_models(), Get the model info for a specific model.      properties: list[str] = See https:, Retrieve model information from the Hugging Face Hub.      properties: list[str]

### Community 1061 - "Community 1061"
Cohesion: 0.33
Nodes (1): Higher-level breakpoint helpers built on LLDBSession.

### Community 1062 - "Community 1062"
Cohesion: 0.33
Nodes (1): Execution management — list, get, delete, retry.  Note: n8n Public API v1.1.1

### Community 1063 - "Community 1063"
Cohesion: 0.33
Nodes (5): get_scaffold(), list_patterns(), Workflow scaffolds — ready-to-use workflow templates based on proven patterns., List available scaffold patterns., Get a scaffold workflow for a pattern. Returns a deep copy.

### Community 1064 - "Community 1064"
Cohesion: 0.33
Nodes (5): attach(), launch_detached(), Launch and attach helpers., Launch a target under Nsight and exit immediately., Attach an activity to a running PID.

### Community 1065 - "Community 1065"
Cohesion: 0.33
Nodes (5): get_active(), open_note(), Obsidian active note operations — get and open., Open a note in Obsidian., Get the currently active (open) note in Obsidian.

### Community 1066 - "Community 1066"
Cohesion: 0.33
Nodes (5): fetch_counters(), list_counters(), GPU performance counters: enumerate, fetch, and describe counters., Enumerate all available GPU counters and their descriptions., Fetch counter results for specified counters (or SamplesPassed by default).

### Community 1067 - "Community 1067"
Cohesion: 0.33
Nodes (1): Device operations for RMS API.

### Community 1068 - "Community 1068"
Cohesion: 0.33
Nodes (1): Remote access operations for RMS API.

### Community 1069 - "Community 1069"
Cohesion: 0.73
Nodes (5): bibliography_item(), citation_item(), export_item(), _require_local_api(), _resolve_item()

### Community 1070 - "Community 1070"
Cohesion: 0.33
Nodes (0): 

### Community 1071 - "Community 1071"
Cohesion: 0.33
Nodes (0): 

### Community 1072 - "Community 1072"
Cohesion: 0.6
Nodes (5): loadPlanConfig(), main(), parseArgs(), printDryRun(), usage()

### Community 1073 - "Community 1073"
Cohesion: 0.33
Nodes (0): 

### Community 1074 - "Community 1074"
Cohesion: 0.6
Nodes (5): extractSummary(), findPowerShell(), notifyMacOS(), notifyWindows(), run()

### Community 1075 - "Community 1075"
Cohesion: 0.6
Nodes (5): getLeadingCommandWord(), isOptionToken(), normalizeCommandWord(), readToken(), shouldSkipOptionValue()

### Community 1076 - "Community 1076"
Cohesion: 0.6
Nodes (5): getDisabledHookIds(), getHookProfile(), isHookEnabled(), normalizeId(), parseProfiles()

### Community 1077 - "Community 1077"
Cohesion: 0.4
Nodes (2): getRunnerFromPackageManager(), resolveFormatterBin()

### Community 1078 - "Community 1078"
Cohesion: 0.6
Nodes (5): applyInstallPlan(), buildMergedSettings(), findHooksSourcePath(), mergeHookEntries(), readJsonObject()

### Community 1079 - "Community 1079"
Cohesion: 0.53
Nodes (4): hydrateSessionFromPath(), isSessionFileTarget(), parseClaudeTarget(), resolveSessionRecord()

### Community 1080 - "Community 1080"
Cohesion: 0.53
Nodes (4): _display_path(), export_part_glb_from_scene(), export_part_glb_from_step(), export_shape_glb()

### Community 1081 - "Community 1081"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 1082 - "Community 1082"
Cohesion: 0.33
Nodes (0): 

### Community 1083 - "Community 1083"
Cohesion: 0.47
Nodes (4): createCounterContext(), getCounterFilePath(), runTests(), test()

### Community 1084 - "Community 1084"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 1085 - "Community 1085"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 1086 - "Community 1086"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 1087 - "Community 1087"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 1088 - "Community 1088"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 1089 - "Community 1089"
Cohesion: 0.4
Nodes (2): cleanupTmpDirs(), runTests()

### Community 1090 - "Community 1090"
Cohesion: 0.33
Nodes (0): 

### Community 1091 - "Community 1091"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 1092 - "Community 1092"
Cohesion: 0.4
Nodes (2): main(), runTest()

### Community 1093 - "Community 1093"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 1094 - "Community 1094"
Cohesion: 0.4
Nodes (2): runTests(), test()

### Community 1095 - "Community 1095"
Cohesion: 0.47
Nodes (3): findPython(), main(), runTest()

### Community 1096 - "Community 1096"
Cohesion: 0.53
Nodes (4): combineGraphs(), extractDotBlocks(), main(), renderToSvg()

### Community 1097 - "Community 1097"
Cohesion: 0.6
Nodes (3): formatScoreDelta(), renderBaselineJobSummary(), statusForBaselineGate()

### Community 1098 - "Community 1098"
Cohesion: 0.4
Nodes (0): 

### Community 1099 - "Community 1099"
Cohesion: 0.6
Nodes (3): basePolicy(), buildPolicyPack(), generatePolicyPack()

### Community 1100 - "Community 1100"
Cohesion: 0.5
Nodes (2): makeBaselineComparison(), makeReport()

### Community 1101 - "Community 1101"
Cohesion: 0.4
Nodes (0): 

### Community 1102 - "Community 1102"
Cohesion: 0.4
Nodes (0): 

### Community 1103 - "Community 1103"
Cohesion: 0.4
Nodes (0): 

### Community 1104 - "Community 1104"
Cohesion: 0.7
Nodes (4): build(), renameAtomicWithRetry(), sleepSync(), validateSyntax()

### Community 1105 - "Community 1105"
Cohesion: 0.4
Nodes (0): 

### Community 1106 - "Community 1106"
Cohesion: 0.5
Nodes (1): ContextEngine

### Community 1107 - "Community 1107"
Cohesion: 0.5
Nodes (2): buildExecutorPrompt(), parseAgentRole()

### Community 1108 - "Community 1108"
Cohesion: 0.4
Nodes (1): FakeToolsError

### Community 1109 - "Community 1109"
Cohesion: 0.4
Nodes (0): 

### Community 1110 - "Community 1110"
Cohesion: 0.8
Nodes (4): pointerPath(), readActiveWorkstream(), workstreamDir(), writeActiveWorkstream()

### Community 1111 - "Community 1111"
Cohesion: 0.7
Nodes (4): decisionsParse(), extractDecisionsBlock(), parseDecisions(), stripFencedCode()

### Community 1112 - "Community 1112"
Cohesion: 0.4
Nodes (0): 

### Community 1113 - "Community 1113"
Cohesion: 0.6
Nodes (3): runExtractMessages(), streamExtractMessages(), truncateContent()

### Community 1114 - "Community 1114"
Cohesion: 0.7
Nodes (4): hasUnresolvedVerificationFails(), readConsecutiveCallCount(), routeNextAction(), verificationPassed()

### Community 1115 - "Community 1115"
Cohesion: 0.6
Nodes (3): toPosixPath(), validateWorkspaceName(), workspacePlanningPaths()

### Community 1116 - "Community 1116"
Cohesion: 0.4
Nodes (4): Test decryption of BrowseComp dataset., Test loading of SimpleQA dataset for comparison., test_browsecomp_decryption(), test_simpleqa_loading()

### Community 1117 - "Community 1117"
Cohesion: 0.5
Nodes (4): main(), Set up LLM configuration for benchmarks and optimization.      Args:, Run multi-benchmark optimization with custom LLM., setup_llm_config()

### Community 1118 - "Community 1118"
Cohesion: 0.5
Nodes (4): main(), print_optimization_results(), Print optimization results in a nicely formatted way., Run multi-benchmark optimization examples.

### Community 1119 - "Community 1119"
Cohesion: 0.4
Nodes (3): downgrade(), Switch default search.fetch.mode from 'full' to 'summary_focus_query'.  Backgr, Revert previously-migrated rows back to 'full'.      Only rows whose value is

### Community 1120 - "Community 1120"
Cohesion: 0.5
Nodes (2): createFavoriteStarElement(), updateStarState()

### Community 1121 - "Community 1121"
Cohesion: 0.7
Nodes (4): isProduction(), isProductionEnvironment(), processArgs(), sanitize()

### Community 1122 - "Community 1122"
Cohesion: 0.6
Nodes (3): addKeyboardHints(), initializeKeyboardShortcuts(), matchesShortcut()

### Community 1123 - "Community 1123"
Cohesion: 0.4
Nodes (0): 

### Community 1124 - "Community 1124"
Cohesion: 0.5
Nodes (2): areObjectsEqual(), areValuesEqual()

### Community 1125 - "Community 1125"
Cohesion: 0.5
Nodes (2): filterByImpact(), getCriticalViolations()

### Community 1126 - "Community 1126"
Cohesion: 0.5
Nodes (4): add_research_mode_column(), migrate_all_user_databases(), Add research_mode column to tables if it doesn't exist., Migrate all user databases to add research_mode column.

### Community 1127 - "Community 1127"
Cohesion: 0.6
Nodes (4): main(), Run search engines API test., run_all_tests(), run_search_engines_test()

### Community 1128 - "Community 1128"
Cohesion: 0.4
Nodes (0): 

### Community 1129 - "Community 1129"
Cohesion: 0.9
Nodes (4): createAndCompleteResearch(), delay(), log(), testFollowUpResearch()

### Community 1130 - "Community 1130"
Cohesion: 0.9
Nodes (4): createResearch(), delay(), log(), testHistoryPage()

### Community 1131 - "Community 1131"
Cohesion: 0.9
Nodes (4): delay(), log(), startResearch(), testCancellation()

### Community 1132 - "Community 1132"
Cohesion: 0.6
Nodes (4): handleToolClick(), loadTools(), renderToolDetails(), renderToolList()

### Community 1133 - "Community 1133"
Cohesion: 0.4
Nodes (0): 

### Community 1134 - "Community 1134"
Cohesion: 0.4
Nodes (0): 

### Community 1135 - "Community 1135"
Cohesion: 0.6
Nodes (3): _find_geteuid_guard(), test_gpu_init_has_geteuid_guard(), test_ldconfig_calls_only_inside_geteuid_guard()

### Community 1136 - "Community 1136"
Cohesion: 0.4
Nodes (1): Thread helpers for listing, selecting, and backtrace operations.

### Community 1137 - "Community 1137"
Cohesion: 0.5
Nodes (4): ensure_lldb_importable(), _install_hint(), LLDB backend helpers: import and environment discovery for lldb Python bindings., Ensure ``lldb`` Python module can be imported.      Strategy:     1) Try regu

### Community 1138 - "Community 1138"
Cohesion: 0.5
Nodes (4): ExpressionResult, n8n expression validator — check expression syntax offline.  Based on n8n expr, Validate an n8n expression string., validate_expression()

### Community 1139 - "Community 1139"
Cohesion: 0.4
Nodes (1): Device configuration operations for RMS API.

### Community 1140 - "Community 1140"
Cohesion: 0.4
Nodes (1): Credit operations for RMS API.

### Community 1141 - "Community 1141"
Cohesion: 0.4
Nodes (0): 

### Community 1142 - "Community 1142"
Cohesion: 0.5
Nodes (2): Get-RelativePathSafe(), Test-PublicRouteAllowed()

### Community 1143 - "Community 1143"
Cohesion: 0.4
Nodes (0): 

### Community 1144 - "Community 1144"
Cohesion: 0.7
Nodes (4): main(), resolveCommand(), runCommand(), showHelp()

### Community 1145 - "Community 1145"
Cohesion: 0.8
Nodes (4): getHelpText(), main(), printHumanPlan(), showHelp()

### Community 1146 - "Community 1146"
Cohesion: 0.7
Nodes (4): main(), parseArgs(), printHuman(), showHelp()

### Community 1147 - "Community 1147"
Cohesion: 0.7
Nodes (4): main(), parseArgs(), printHuman(), showHelp()

### Community 1148 - "Community 1148"
Cohesion: 0.7
Nodes (4): inspectSkillLoopTarget(), main(), parseArgs(), usage()

### Community 1149 - "Community 1149"
Cohesion: 0.7
Nodes (4): main(), parseArgs(), requireValue(), showHelp()

### Community 1150 - "Community 1150"
Cohesion: 0.7
Nodes (4): main(), parseArgs(), printHuman(), showHelp()

### Community 1151 - "Community 1151"
Cohesion: 0.7
Nodes (4): isNonEmptyString(), isNonEmptyStringArray(), validateHookEntry(), validateHooks()

### Community 1152 - "Community 1152"
Cohesion: 0.8
Nodes (4): normalizeRelativePath(), readJson(), validateInstallManifests(), validateSchema()

### Community 1153 - "Community 1153"
Cohesion: 0.7
Nodes (4): exec(), log(), maybeRunQualityGate(), run()

### Community 1154 - "Community 1154"
Cohesion: 0.5
Nodes (2): buildSourceTarget(), isPlanFileTarget()

### Community 1155 - "Community 1155"
Cohesion: 0.6
Nodes (3): _display_path(), export_part_stl_from_scene(), export_shape_stl()

### Community 1156 - "Community 1156"
Cohesion: 0.5
Nodes (2): discoverTestFiles(), walkFiles()

### Community 1157 - "Community 1157"
Cohesion: 0.5
Nodes (2): runTests(), test()

### Community 1158 - "Community 1158"
Cohesion: 0.5
Nodes (2): runTests(), test()

### Community 1159 - "Community 1159"
Cohesion: 0.5
Nodes (2): runTests(), test()

### Community 1160 - "Community 1160"
Cohesion: 0.5
Nodes (2): runTests(), test()

### Community 1161 - "Community 1161"
Cohesion: 0.67
Nodes (2): ConvertTo-HashtableRecursive(), Read-SettingsAsHashtable()

### Community 1162 - "Community 1162"
Cohesion: 0.67
Nodes (2): ConvertTo-HashtableRecursive(), Read-SettingsAsHashtable()

### Community 1163 - "Community 1163"
Cohesion: 0.83
Nodes (3): formatExceptionDays(), renderPolicyJobSummary(), statusForPolicyEvaluation()

### Community 1164 - "Community 1164"
Cohesion: 0.67
Nodes (2): evidenceFingerprint(), fingerprintFinding()

### Community 1165 - "Community 1165"
Cohesion: 0.83
Nodes (3): makeComparison(), makeFinding(), makeGateResult()

### Community 1166 - "Community 1166"
Cohesion: 0.67
Nodes (2): isAtOrAboveSeverity(), severityIndex()

### Community 1167 - "Community 1167"
Cohesion: 0.67
Nodes (2): makeExpiredSession(), makeSession()

### Community 1168 - "Community 1168"
Cohesion: 0.5
Nodes (0): 

### Community 1169 - "Community 1169"
Cohesion: 0.5
Nodes (0): 

### Community 1170 - "Community 1170"
Cohesion: 0.5
Nodes (0): 

### Community 1171 - "Community 1171"
Cohesion: 0.5
Nodes (0): 

### Community 1172 - "Community 1172"
Cohesion: 0.5
Nodes (0): 

### Community 1173 - "Community 1173"
Cohesion: 0.83
Nodes (3): buildStateDocumentCjs(), extractFunctionFromSource(), main()

### Community 1174 - "Community 1174"
Cohesion: 0.5
Nodes (0): 

### Community 1175 - "Community 1175"
Cohesion: 0.67
Nodes (2): countOtherMilestones(), extractCurrentMilestone()

### Community 1176 - "Community 1176"
Cohesion: 0.5
Nodes (0): 

### Community 1177 - "Community 1177"
Cohesion: 0.5
Nodes (0): 

### Community 1178 - "Community 1178"
Cohesion: 0.5
Nodes (0): 

### Community 1179 - "Community 1179"
Cohesion: 0.5
Nodes (1): QueryCommandExecutor

### Community 1180 - "Community 1180"
Cohesion: 0.5
Nodes (1): QueryExecutionPolicy

### Community 1181 - "Community 1181"
Cohesion: 0.5
Nodes (0): 

### Community 1182 - "Community 1182"
Cohesion: 0.5
Nodes (0): 

### Community 1183 - "Community 1183"
Cohesion: 0.83
Nodes (3): agentClassifyFailure(), classifyAgentFailure(), parseRetryAfter()

### Community 1184 - "Community 1184"
Cohesion: 1.0
Nodes (3): boolSyncSafe(), checkShipReady(), runSyncSafe()

### Community 1185 - "Community 1185"
Cohesion: 0.83
Nodes (3): checkVerificationStatus(), findColIndex(), parseTableRows()

### Community 1186 - "Community 1186"
Cohesion: 0.67
Nodes (2): sha256(), writeManifest()

### Community 1187 - "Community 1187"
Cohesion: 0.5
Nodes (0): 

### Community 1188 - "Community 1188"
Cohesion: 0.67
Nodes (2): archiveDirectories(), listDirectories()

### Community 1189 - "Community 1189"
Cohesion: 0.83
Nodes (3): phaseListArtifacts(), phaseListPlans(), resolvePhaseDir()

### Community 1190 - "Community 1190"
Cohesion: 0.5
Nodes (0): 

### Community 1191 - "Community 1191"
Cohesion: 0.83
Nodes (3): dottedCommandToCjsArgv(), execBridge(), runFallbackBridge()

### Community 1192 - "Community 1192"
Cohesion: 0.5
Nodes (0): 

### Community 1193 - "Community 1193"
Cohesion: 0.83
Nodes (3): buildRegistry(), createRegistry(), decorateRegistryMutations()

### Community 1194 - "Community 1194"
Cohesion: 0.83
Nodes (3): normalizeReqList(), requirementsExtractFromPlans(), resolvePhaseDir()

### Community 1195 - "Community 1195"
Cohesion: 0.67
Nodes (3): main(), Update LLM configuration in the database.      Args:         model_name: LLM, update_llm_configuration()

### Community 1196 - "Community 1196"
Cohesion: 0.5
Nodes (3): plot_optimization_history(), Visualization utilities for optimization results.  This module provides functi, Plot the optimization history.      Args:         trial_values: List of objec

### Community 1197 - "Community 1197"
Cohesion: 0.5
Nodes (3): is_private_ip(), Network utility functions for IP address classification.  This module provides, Check if hostname is a private/local IP address.      Recognizes:     - Local

### Community 1198 - "Community 1198"
Cohesion: 0.5
Nodes (3): Shared helpers for deterministic resource cleanup., Close a resource, logging a warning on failure. Never raises.      Args:, safe_close()

### Community 1199 - "Community 1199"
Cohesion: 0.5
Nodes (3): Setup utilities (legacy wrapper)., Set up directories and ensure config files exist., setup_user_directories()

### Community 1200 - "Community 1200"
Cohesion: 0.5
Nodes (3): Type conversion utilities.  This module provides type conversion functions tha, Convert a value to boolean, handling string representations.      This is a st, to_bool()

### Community 1201 - "Community 1201"
Cohesion: 0.5
Nodes (3): process_pending_queue_operations(), Middleware to process pending queue operations when user has active session., Process pending queue operations for the current user.     This runs in request

### Community 1202 - "Community 1202"
Cohesion: 0.83
Nodes (3): handleCreateCollection(), showCreateResults(), showError()

### Community 1203 - "Community 1203"
Cohesion: 0.5
Nodes (3): Simple test for URL utility functions without pytest., Test the normalize_url function., test_url_normalization()

### Community 1204 - "Community 1204"
Cohesion: 0.5
Nodes (0): 

### Community 1205 - "Community 1205"
Cohesion: 0.5
Nodes (0): 

### Community 1206 - "Community 1206"
Cohesion: 0.83
Nodes (3): ensureScreenshotsDir(), takeScreenshot(), testResearchSubmitDebug()

### Community 1207 - "Community 1207"
Cohesion: 0.83
Nodes (3): selectModel(), selectProvider(), setupDefaultModel()

### Community 1208 - "Community 1208"
Cohesion: 0.83
Nodes (3): log(), runCoreTests(), runTest()

### Community 1209 - "Community 1209"
Cohesion: 0.83
Nodes (3): delay(), log(), testExportDropdown()

### Community 1210 - "Community 1210"
Cohesion: 0.83
Nodes (3): main(), runSuite(), runTest()

### Community 1211 - "Community 1211"
Cohesion: 0.5
Nodes (0): 

### Community 1212 - "Community 1212"
Cohesion: 0.5
Nodes (0): 

### Community 1213 - "Community 1213"
Cohesion: 0.83
Nodes (3): displayResults(), handleRunTool(), parseArrayParameter()

### Community 1214 - "Community 1214"
Cohesion: 0.83
Nodes (3): main(), metadata_path(), patch_file()

### Community 1215 - "Community 1215"
Cohesion: 0.83
Nodes (3): _base_load_request(), test_blank_chat_template_override_normalizes_to_none(), test_nonblank_chat_template_override_is_preserved_verbatim()

### Community 1216 - "Community 1216"
Cohesion: 0.83
Nodes (3): _assert_safe_ggml_calls(), _function_calls(), test_ggml_conversion_paths_do_not_use_shell()

### Community 1217 - "Community 1217"
Cohesion: 0.5
Nodes (0): 

### Community 1218 - "Community 1218"
Cohesion: 0.5
Nodes (3): main(), cli-anything-intelwatch - CLI harness for Intelwatch., CLI-Anything harness for Intelwatch.          Zero friction. Full context. Com

### Community 1219 - "Community 1219"
Cohesion: 0.5
Nodes (3): capture_cpp(), Generate C++ Capture orchestration., Run Generate C++ Capture.

### Community 1220 - "Community 1220"
Cohesion: 0.5
Nodes (3): embed(), Ollama embeddings — generate vector embeddings from text., Generate embeddings for input text.      Args:         base_url: Ollama serve

### Community 1221 - "Community 1221"
Cohesion: 0.5
Nodes (1): Device location operations for RMS API.

### Community 1222 - "Community 1222"
Cohesion: 0.5
Nodes (3): process_subtitle(), Subtitle processing — optimize and translate subtitle files., Optimize and/or translate a subtitle file.      Args:         input_path: Sub

### Community 1223 - "Community 1223"
Cohesion: 0.5
Nodes (3): Video synthesis — burn subtitles into video with customizable styles., Burn subtitles into a video file.      Args:         video_path: Input video, synthesize()

### Community 1224 - "Community 1224"
Cohesion: 0.5
Nodes (3): Transcription — speech to subtitles via ASR engines., Transcribe audio/video to subtitles.      Args:         input_path: Audio or, transcribe()

### Community 1225 - "Community 1225"
Cohesion: 0.5
Nodes (0): 

### Community 1226 - "Community 1226"
Cohesion: 0.67
Nodes (2): Get-Fingerprint(), Get-RelativePathSafe()

### Community 1227 - "Community 1227"
Cohesion: 0.5
Nodes (0): 

### Community 1228 - "Community 1228"
Cohesion: 0.83
Nodes (3): main(), parseArgs(), usage()

### Community 1229 - "Community 1229"
Cohesion: 0.5
Nodes (0): 

### Community 1230 - "Community 1230"
Cohesion: 0.5
Nodes (0): 

### Community 1231 - "Community 1231"
Cohesion: 0.67
Nodes (2): Get-Heading(), Update-Content()

### Community 1232 - "Community 1232"
Cohesion: 0.67
Nodes (2): Get-AutoAgents(), Test-PathAny()

### Community 1233 - "Community 1233"
Cohesion: 0.83
Nodes (3): getLogPath(), isBackendProject(), run()

### Community 1234 - "Community 1234"
Cohesion: 0.83
Nodes (3): dedupeRecentSessions(), main(), writeSessionStartPayload()

### Community 1235 - "Community 1235"
Cohesion: 0.83
Nodes (3): createProposalId(), proposeSkillAmendment(), summarizePatchPreview()

### Community 1236 - "Community 1236"
Cohesion: 1.0
Nodes (3): applyMigrations(), ensureMigrationTable(), getAppliedMigrations()

### Community 1237 - "Community 1237"
Cohesion: 0.67
Nodes (3): main(), pick(), 使用 secrets 模块（直接读 os.urandom）确保真随机

### Community 1238 - "Community 1238"
Cohesion: 0.67
Nodes (2): getTypedText(), MyAnimation()

### Community 1239 - "Community 1239"
Cohesion: 0.67
Nodes (2): escapeRegExp(), getTomlSection()

### Community 1240 - "Community 1240"
Cohesion: 0.5
Nodes (0): 

### Community 1241 - "Community 1241"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1242 - "Community 1242"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1243 - "Community 1243"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1244 - "Community 1244"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1245 - "Community 1245"
Cohesion: 0.5
Nodes (0): 

### Community 1246 - "Community 1246"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1247 - "Community 1247"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1248 - "Community 1248"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1249 - "Community 1249"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1250 - "Community 1250"
Cohesion: 0.5
Nodes (0): 

### Community 1251 - "Community 1251"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1252 - "Community 1252"
Cohesion: 0.5
Nodes (0): 

### Community 1253 - "Community 1253"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1254 - "Community 1254"
Cohesion: 0.5
Nodes (0): 

### Community 1255 - "Community 1255"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1256 - "Community 1256"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1257 - "Community 1257"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1258 - "Community 1258"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1259 - "Community 1259"
Cohesion: 0.67
Nodes (2): runTests(), test()

### Community 1260 - "Community 1260"
Cohesion: 0.67
Nodes (1): Smoke-test queries across the loaded FalkorDB graphs.  Confirms:   1. All 8 name

### Community 1261 - "Community 1261"
Cohesion: 0.67
Nodes (1): Minimal example: build context, show what would be sent, then (optionally) call

### Community 1262 - "Community 1262"
Cohesion: 0.67
Nodes (1): AgenticStack

### Community 1263 - "Community 1263"
Cohesion: 1.0
Nodes (2): isPromptPostureFile(), normalizePath()

### Community 1264 - "Community 1264"
Cohesion: 0.67
Nodes (0): 

### Community 1265 - "Community 1265"
Cohesion: 0.67
Nodes (0): 

### Community 1266 - "Community 1266"
Cohesion: 0.67
Nodes (0): 

### Community 1267 - "Community 1267"
Cohesion: 0.67
Nodes (0): 

### Community 1268 - "Community 1268"
Cohesion: 0.67
Nodes (0): 

### Community 1269 - "Community 1269"
Cohesion: 0.67
Nodes (0): 

### Community 1270 - "Community 1270"
Cohesion: 0.67
Nodes (0): 

### Community 1271 - "Community 1271"
Cohesion: 0.67
Nodes (0): 

### Community 1272 - "Community 1272"
Cohesion: 0.67
Nodes (0): 

### Community 1273 - "Community 1273"
Cohesion: 0.67
Nodes (0): 

### Community 1274 - "Community 1274"
Cohesion: 0.67
Nodes (0): 

### Community 1275 - "Community 1275"
Cohesion: 0.67
Nodes (0): 

### Community 1276 - "Community 1276"
Cohesion: 0.67
Nodes (0): 

### Community 1277 - "Community 1277"
Cohesion: 0.67
Nodes (0): 

### Community 1278 - "Community 1278"
Cohesion: 0.67
Nodes (0): 

### Community 1279 - "Community 1279"
Cohesion: 0.67
Nodes (0): 

### Community 1280 - "Community 1280"
Cohesion: 0.67
Nodes (0): 

### Community 1281 - "Community 1281"
Cohesion: 0.67
Nodes (0): 

### Community 1282 - "Community 1282"
Cohesion: 0.67
Nodes (0): 

### Community 1283 - "Community 1283"
Cohesion: 0.67
Nodes (0): 

### Community 1284 - "Community 1284"
Cohesion: 1.0
Nodes (2): isGitSubcommand(), tokenize()

### Community 1285 - "Community 1285"
Cohesion: 0.67
Nodes (0): 

### Community 1286 - "Community 1286"
Cohesion: 0.67
Nodes (0): 

### Community 1287 - "Community 1287"
Cohesion: 1.0
Nodes (2): resolveAtReferences(), sanitizePrompt()

### Community 1288 - "Community 1288"
Cohesion: 1.0
Nodes (2): formatQueryRawOutput(), safeStringify()

### Community 1289 - "Community 1289"
Cohesion: 0.67
Nodes (0): 

### Community 1290 - "Community 1290"
Cohesion: 1.0
Nodes (2): checkAutoMode(), resolveSource()

### Community 1291 - "Community 1291"
Cohesion: 0.67
Nodes (0): 

### Community 1292 - "Community 1292"
Cohesion: 1.0
Nodes (2): checkGates(), readFileSafe()

### Community 1293 - "Community 1293"
Cohesion: 0.67
Nodes (0): 

### Community 1294 - "Community 1294"
Cohesion: 0.67
Nodes (0): 

### Community 1295 - "Community 1295"
Cohesion: 1.0
Nodes (2): checkConfigGates(), workflowBool()

### Community 1296 - "Community 1296"
Cohesion: 1.0
Nodes (2): detectCustomFiles(), walkDir()

### Community 1297 - "Community 1297"
Cohesion: 1.0
Nodes (2): detectPhaseType(), roadmapHeadingForPhase()

### Community 1298 - "Community 1298"
Cohesion: 0.67
Nodes (0): 

### Community 1299 - "Community 1299"
Cohesion: 0.67
Nodes (0): 

### Community 1300 - "Community 1300"
Cohesion: 1.0
Nodes (2): buildMutationEvent(), resolveFamily()

### Community 1301 - "Community 1301"
Cohesion: 0.67
Nodes (0): 

### Community 1302 - "Community 1302"
Cohesion: 0.67
Nodes (0): 

### Community 1303 - "Community 1303"
Cohesion: 1.0
Nodes (2): queryFallbackToCjsEnabled(), runQueryCliCommand()

### Community 1304 - "Community 1304"
Cohesion: 0.67
Nodes (0): 

### Community 1305 - "Community 1305"
Cohesion: 0.67
Nodes (0): 

### Community 1306 - "Community 1306"
Cohesion: 1.0
Nodes (2): formatFallbackOutput(), runCjsFallbackDispatch()

### Community 1307 - "Community 1307"
Cohesion: 1.0
Nodes (2): classifyFallbackOutput(), parseCliQueryJsonOutput()

### Community 1308 - "Community 1308"
Cohesion: 0.67
Nodes (0): 

### Community 1309 - "Community 1309"
Cohesion: 0.67
Nodes (0): 

### Community 1310 - "Community 1310"
Cohesion: 0.67
Nodes (0): 

### Community 1311 - "Community 1311"
Cohesion: 1.0
Nodes (2): checkSchemaDrift(), detectSchemaFiles()

### Community 1312 - "Community 1312"
Cohesion: 1.0
Nodes (2): buildSkillManifest(), skillManifest()

### Community 1313 - "Community 1313"
Cohesion: 0.67
Nodes (0): 

### Community 1314 - "Community 1314"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 1315 - "Community 1315"
Cohesion: 0.67
Nodes (0): 

### Community 1316 - "Community 1316"
Cohesion: 0.67
Nodes (0): 

### Community 1317 - "Community 1317"
Cohesion: 0.67
Nodes (2): main(), Run the SimpleQA benchmark with the specified parameters.

### Community 1318 - "Community 1318"
Cohesion: 0.67
Nodes (0): 

### Community 1319 - "Community 1319"
Cohesion: 0.67
Nodes (2): main(), Run the test suite with appropriate settings.

### Community 1320 - "Community 1320"
Cohesion: 1.0
Nodes (2): main(), run_one()

### Community 1321 - "Community 1321"
Cohesion: 1.0
Nodes (2): closeModal(), init()

### Community 1322 - "Community 1322"
Cohesion: 1.0
Nodes (2): connectMenuSettings(), saveMenuSettings()

### Community 1323 - "Community 1323"
Cohesion: 1.0
Nodes (2): downloadPdf(), generatePdf()

### Community 1324 - "Community 1324"
Cohesion: 0.67
Nodes (2): convert_debug_to_markdown(), Convert the debug-formatted text to clean markdown.      Args:         raw_te

### Community 1325 - "Community 1325"
Cohesion: 0.67
Nodes (0): 

### Community 1326 - "Community 1326"
Cohesion: 0.67
Nodes (2): populate_search_engines(), Populate search engine settings in the database

### Community 1327 - "Community 1327"
Cohesion: 0.67
Nodes (0): 

### Community 1328 - "Community 1328"
Cohesion: 0.67
Nodes (2): main(), Run authentication tests.

### Community 1329 - "Community 1329"
Cohesion: 0.67
Nodes (1): Static check: every FK in Base.metadata points at a real table+column.  Catche

### Community 1330 - "Community 1330"
Cohesion: 0.67
Nodes (0): 

### Community 1331 - "Community 1331"
Cohesion: 0.67
Nodes (0): 

### Community 1332 - "Community 1332"
Cohesion: 0.67
Nodes (0): 

### Community 1333 - "Community 1333"
Cohesion: 1.0
Nodes (2): checkAll(), checkTest()

### Community 1334 - "Community 1334"
Cohesion: 1.0
Nodes (2): checkTest(), main()

### Community 1335 - "Community 1335"
Cohesion: 1.0
Nodes (2): runAll(), runTest()

### Community 1336 - "Community 1336"
Cohesion: 1.0
Nodes (2): log(), runComprehensiveApiKeyTest()

### Community 1337 - "Community 1337"
Cohesion: 0.67
Nodes (0): 

### Community 1338 - "Community 1338"
Cohesion: 1.0
Nodes (2): delay(), runTests()

### Community 1339 - "Community 1339"
Cohesion: 0.67
Nodes (0): 

### Community 1340 - "Community 1340"
Cohesion: 0.67
Nodes (0): 

### Community 1341 - "Community 1341"
Cohesion: 1.0
Nodes (2): delay(), testMetricsPage()

### Community 1342 - "Community 1342"
Cohesion: 0.67
Nodes (0): 

### Community 1343 - "Community 1343"
Cohesion: 1.0
Nodes (2): delay(), runTest()

### Community 1344 - "Community 1344"
Cohesion: 0.67
Nodes (2): Test to trace the exact error, test_history_error()

### Community 1345 - "Community 1345"
Cohesion: 1.0
Nodes (2): delay(), runTests()

### Community 1346 - "Community 1346"
Cohesion: 0.67
Nodes (0): 

### Community 1347 - "Community 1347"
Cohesion: 1.0
Nodes (2): applyTheme(), setupPageWithTheme()

### Community 1348 - "Community 1348"
Cohesion: 0.67
Nodes (0): 

### Community 1349 - "Community 1349"
Cohesion: 0.67
Nodes (2): Guard direct `loguru` logger calls against stdlib printf formatting., test_loguru_calls_do_not_use_printf_style_placeholders()

### Community 1350 - "Community 1350"
Cohesion: 1.0
Nodes (2): initializeResize(), setPanelWidth()

### Community 1351 - "Community 1351"
Cohesion: 0.67
Nodes (1): Instrumentation

### Community 1352 - "Community 1352"
Cohesion: 0.67
Nodes (2): downsample(), Reduce a list to target_count points via evenly-spaced index sampling.

### Community 1353 - "Community 1353"
Cohesion: 0.67
Nodes (2): Return Windows-only subprocess kwargs that suppress console windows.      On non, windows_hidden_subprocess_kwargs()

### Community 1354 - "Community 1354"
Cohesion: 1.0
Nodes (2): hasSlashComment(), MermaidError()

### Community 1355 - "Community 1355"
Cohesion: 0.67
Nodes (0): 

### Community 1356 - "Community 1356"
Cohesion: 0.67
Nodes (0): 

### Community 1357 - "Community 1357"
Cohesion: 0.67
Nodes (0): 

### Community 1358 - "Community 1358"
Cohesion: 0.67
Nodes (1): Eval task: effects registry.

### Community 1359 - "Community 1359"
Cohesion: 0.67
Nodes (1): Eval task: WAV export.

### Community 1360 - "Community 1360"
Cohesion: 0.67
Nodes (1): Eval task: project roundtrip.

### Community 1361 - "Community 1361"
Cohesion: 0.67
Nodes (1): Eval task: track + clip flow.

### Community 1362 - "Community 1362"
Cohesion: 0.67
Nodes (0): 

### Community 1363 - "Community 1363"
Cohesion: 0.67
Nodes (0): 

### Community 1364 - "Community 1364"
Cohesion: 1.0
Nodes (2): Assert-NotProduction(), Test-IsProductionUrl()

### Community 1365 - "Community 1365"
Cohesion: 1.0
Nodes (2): extractFrontmatter(), validateAgents()

### Community 1366 - "Community 1366"
Cohesion: 1.0
Nodes (2): collectRuleFiles(), validateRules()

### Community 1367 - "Community 1367"
Cohesion: 1.0
Nodes (2): parseInput(), run()

### Community 1368 - "Community 1368"
Cohesion: 0.67
Nodes (0): 

### Community 1369 - "Community 1369"
Cohesion: 1.0
Nodes (2): isSuspiciousDocPath(), run()

### Community 1370 - "Community 1370"
Cohesion: 0.67
Nodes (1): CadgenDxfTests

### Community 1371 - "Community 1371"
Cohesion: 0.67
Nodes (0): 

### Community 1372 - "Community 1372"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 1373 - "Community 1373"
Cohesion: 0.67
Nodes (0): 

### Community 1374 - "Community 1374"
Cohesion: 0.67
Nodes (0): 

### Community 1375 - "Community 1375"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 1376 - "Community 1376"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 1377 - "Community 1377"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 1378 - "Community 1378"
Cohesion: 1.0
Nodes (2): runTests(), test()

### Community 1379 - "Community 1379"
Cohesion: 0.67
Nodes (0): 

### Community 1380 - "Community 1380"
Cohesion: 1.0
Nodes (0): 

### Community 1381 - "Community 1381"
Cohesion: 1.0
Nodes (0): 

### Community 1382 - "Community 1382"
Cohesion: 1.0
Nodes (0): 

### Community 1383 - "Community 1383"
Cohesion: 1.0
Nodes (0): 

### Community 1384 - "Community 1384"
Cohesion: 1.0
Nodes (0): 

### Community 1385 - "Community 1385"
Cohesion: 1.0
Nodes (0): 

### Community 1386 - "Community 1386"
Cohesion: 1.0
Nodes (0): 

### Community 1387 - "Community 1387"
Cohesion: 1.0
Nodes (0): 

### Community 1388 - "Community 1388"
Cohesion: 1.0
Nodes (0): 

### Community 1389 - "Community 1389"
Cohesion: 1.0
Nodes (0): 

### Community 1390 - "Community 1390"
Cohesion: 1.0
Nodes (0): 

### Community 1391 - "Community 1391"
Cohesion: 1.0
Nodes (0): 

### Community 1392 - "Community 1392"
Cohesion: 1.0
Nodes (0): 

### Community 1393 - "Community 1393"
Cohesion: 1.0
Nodes (0): 

### Community 1394 - "Community 1394"
Cohesion: 1.0
Nodes (0): 

### Community 1395 - "Community 1395"
Cohesion: 1.0
Nodes (0): 

### Community 1396 - "Community 1396"
Cohesion: 1.0
Nodes (0): 

### Community 1397 - "Community 1397"
Cohesion: 1.0
Nodes (0): 

### Community 1398 - "Community 1398"
Cohesion: 1.0
Nodes (0): 

### Community 1399 - "Community 1399"
Cohesion: 1.0
Nodes (0): 

### Community 1400 - "Community 1400"
Cohesion: 1.0
Nodes (0): 

### Community 1401 - "Community 1401"
Cohesion: 1.0
Nodes (0): 

### Community 1402 - "Community 1402"
Cohesion: 1.0
Nodes (0): 

### Community 1403 - "Community 1403"
Cohesion: 1.0
Nodes (0): 

### Community 1404 - "Community 1404"
Cohesion: 1.0
Nodes (0): 

### Community 1405 - "Community 1405"
Cohesion: 1.0
Nodes (0): 

### Community 1406 - "Community 1406"
Cohesion: 1.0
Nodes (0): 

### Community 1407 - "Community 1407"
Cohesion: 1.0
Nodes (0): 

### Community 1408 - "Community 1408"
Cohesion: 1.0
Nodes (0): 

### Community 1409 - "Community 1409"
Cohesion: 1.0
Nodes (0): 

### Community 1410 - "Community 1410"
Cohesion: 1.0
Nodes (0): 

### Community 1411 - "Community 1411"
Cohesion: 1.0
Nodes (0): 

### Community 1412 - "Community 1412"
Cohesion: 1.0
Nodes (0): 

### Community 1413 - "Community 1413"
Cohesion: 1.0
Nodes (0): 

### Community 1414 - "Community 1414"
Cohesion: 1.0
Nodes (0): 

### Community 1415 - "Community 1415"
Cohesion: 1.0
Nodes (0): 

### Community 1416 - "Community 1416"
Cohesion: 1.0
Nodes (0): 

### Community 1417 - "Community 1417"
Cohesion: 1.0
Nodes (0): 

### Community 1418 - "Community 1418"
Cohesion: 1.0
Nodes (0): 

### Community 1419 - "Community 1419"
Cohesion: 1.0
Nodes (0): 

### Community 1420 - "Community 1420"
Cohesion: 1.0
Nodes (0): 

### Community 1421 - "Community 1421"
Cohesion: 1.0
Nodes (0): 

### Community 1422 - "Community 1422"
Cohesion: 1.0
Nodes (0): 

### Community 1423 - "Community 1423"
Cohesion: 1.0
Nodes (0): 

### Community 1424 - "Community 1424"
Cohesion: 1.0
Nodes (0): 

### Community 1425 - "Community 1425"
Cohesion: 1.0
Nodes (0): 

### Community 1426 - "Community 1426"
Cohesion: 1.0
Nodes (0): 

### Community 1427 - "Community 1427"
Cohesion: 1.0
Nodes (0): 

### Community 1428 - "Community 1428"
Cohesion: 1.0
Nodes (0): 

### Community 1429 - "Community 1429"
Cohesion: 1.0
Nodes (0): 

### Community 1430 - "Community 1430"
Cohesion: 1.0
Nodes (0): 

### Community 1431 - "Community 1431"
Cohesion: 1.0
Nodes (0): 

### Community 1432 - "Community 1432"
Cohesion: 1.0
Nodes (1): Vulture whitelist — items listed here are ignored during dead-code scanning.

### Community 1433 - "Community 1433"
Cohesion: 1.0
Nodes (0): 

### Community 1434 - "Community 1434"
Cohesion: 1.0
Nodes (1): Database encryption and performance settings.  NOTE: Database settings have be

### Community 1435 - "Community 1435"
Cohesion: 1.0
Nodes (1): Base class for user-specific models that should be stored in encrypted databases

### Community 1436 - "Community 1436"
Cohesion: 1.0
Nodes (0): 

### Community 1437 - "Community 1437"
Cohesion: 1.0
Nodes (0): 

### Community 1438 - "Community 1438"
Cohesion: 1.0
Nodes (0): 

### Community 1439 - "Community 1439"
Cohesion: 1.0
Nodes (0): 

### Community 1440 - "Community 1440"
Cohesion: 1.0
Nodes (0): 

### Community 1441 - "Community 1441"
Cohesion: 1.0
Nodes (1): CI-specific test configuration for API tests. Sets up environment for tests to

### Community 1442 - "Community 1442"
Cohesion: 1.0
Nodes (0): 

### Community 1443 - "Community 1443"
Cohesion: 1.0
Nodes (0): 

### Community 1444 - "Community 1444"
Cohesion: 1.0
Nodes (0): 

### Community 1445 - "Community 1445"
Cohesion: 1.0
Nodes (0): 

### Community 1446 - "Community 1446"
Cohesion: 1.0
Nodes (0): 

### Community 1447 - "Community 1447"
Cohesion: 1.0
Nodes (0): 

### Community 1448 - "Community 1448"
Cohesion: 1.0
Nodes (0): 

### Community 1449 - "Community 1449"
Cohesion: 1.0
Nodes (0): 

### Community 1450 - "Community 1450"
Cohesion: 1.0
Nodes (0): 

### Community 1451 - "Community 1451"
Cohesion: 1.0
Nodes (0): 

### Community 1452 - "Community 1452"
Cohesion: 1.0
Nodes (0): 

### Community 1453 - "Community 1453"
Cohesion: 1.0
Nodes (0): 

### Community 1454 - "Community 1454"
Cohesion: 1.0
Nodes (0): 

### Community 1455 - "Community 1455"
Cohesion: 1.0
Nodes (0): 

### Community 1456 - "Community 1456"
Cohesion: 1.0
Nodes (0): 

### Community 1457 - "Community 1457"
Cohesion: 1.0
Nodes (0): 

### Community 1458 - "Community 1458"
Cohesion: 1.0
Nodes (0): 

### Community 1459 - "Community 1459"
Cohesion: 1.0
Nodes (0): 

### Community 1460 - "Community 1460"
Cohesion: 1.0
Nodes (0): 

### Community 1461 - "Community 1461"
Cohesion: 1.0
Nodes (0): 

### Community 1462 - "Community 1462"
Cohesion: 1.0
Nodes (0): 

### Community 1463 - "Community 1463"
Cohesion: 1.0
Nodes (0): 

### Community 1464 - "Community 1464"
Cohesion: 1.0
Nodes (0): 

### Community 1465 - "Community 1465"
Cohesion: 1.0
Nodes (0): 

### Community 1466 - "Community 1466"
Cohesion: 1.0
Nodes (0): 

### Community 1467 - "Community 1467"
Cohesion: 1.0
Nodes (0): 

### Community 1468 - "Community 1468"
Cohesion: 1.0
Nodes (0): 

### Community 1469 - "Community 1469"
Cohesion: 1.0
Nodes (0): 

### Community 1470 - "Community 1470"
Cohesion: 1.0
Nodes (0): 

### Community 1471 - "Community 1471"
Cohesion: 1.0
Nodes (0): 

### Community 1472 - "Community 1472"
Cohesion: 1.0
Nodes (0): 

### Community 1473 - "Community 1473"
Cohesion: 1.0
Nodes (0): 

### Community 1474 - "Community 1474"
Cohesion: 1.0
Nodes (0): 

### Community 1475 - "Community 1475"
Cohesion: 1.0
Nodes (0): 

### Community 1476 - "Community 1476"
Cohesion: 1.0
Nodes (0): 

### Community 1477 - "Community 1477"
Cohesion: 1.0
Nodes (0): 

### Community 1478 - "Community 1478"
Cohesion: 1.0
Nodes (0): 

### Community 1479 - "Community 1479"
Cohesion: 1.0
Nodes (0): 

### Community 1480 - "Community 1480"
Cohesion: 1.0
Nodes (0): 

### Community 1481 - "Community 1481"
Cohesion: 1.0
Nodes (0): 

### Community 1482 - "Community 1482"
Cohesion: 1.0
Nodes (0): 

### Community 1483 - "Community 1483"
Cohesion: 1.0
Nodes (0): 

### Community 1484 - "Community 1484"
Cohesion: 1.0
Nodes (0): 

### Community 1485 - "Community 1485"
Cohesion: 1.0
Nodes (0): 

### Community 1486 - "Community 1486"
Cohesion: 1.0
Nodes (0): 

### Community 1487 - "Community 1487"
Cohesion: 1.0
Nodes (0): 

### Community 1488 - "Community 1488"
Cohesion: 1.0
Nodes (0): 

### Community 1489 - "Community 1489"
Cohesion: 1.0
Nodes (0): 

### Community 1490 - "Community 1490"
Cohesion: 1.0
Nodes (0): 

### Community 1491 - "Community 1491"
Cohesion: 1.0
Nodes (0): 

### Community 1492 - "Community 1492"
Cohesion: 1.0
Nodes (0): 

### Community 1493 - "Community 1493"
Cohesion: 1.0
Nodes (0): 

### Community 1494 - "Community 1494"
Cohesion: 1.0
Nodes (0): 

### Community 1495 - "Community 1495"
Cohesion: 1.0
Nodes (0): 

### Community 1496 - "Community 1496"
Cohesion: 1.0
Nodes (0): 

### Community 1497 - "Community 1497"
Cohesion: 1.0
Nodes (0): 

### Community 1498 - "Community 1498"
Cohesion: 1.0
Nodes (0): 

### Community 1499 - "Community 1499"
Cohesion: 1.0
Nodes (0): 

### Community 1500 - "Community 1500"
Cohesion: 1.0
Nodes (0): 

### Community 1501 - "Community 1501"
Cohesion: 1.0
Nodes (0): 

### Community 1502 - "Community 1502"
Cohesion: 1.0
Nodes (0): 

### Community 1503 - "Community 1503"
Cohesion: 1.0
Nodes (0): 

### Community 1504 - "Community 1504"
Cohesion: 1.0
Nodes (0): 

### Community 1505 - "Community 1505"
Cohesion: 1.0
Nodes (0): 

### Community 1506 - "Community 1506"
Cohesion: 1.0
Nodes (0): 

### Community 1507 - "Community 1507"
Cohesion: 1.0
Nodes (0): 

### Community 1508 - "Community 1508"
Cohesion: 1.0
Nodes (0): 

### Community 1509 - "Community 1509"
Cohesion: 1.0
Nodes (0): 

### Community 1510 - "Community 1510"
Cohesion: 1.0
Nodes (0): 

### Community 1511 - "Community 1511"
Cohesion: 1.0
Nodes (0): 

### Community 1512 - "Community 1512"
Cohesion: 1.0
Nodes (0): 

### Community 1513 - "Community 1513"
Cohesion: 1.0
Nodes (0): 

### Community 1514 - "Community 1514"
Cohesion: 1.0
Nodes (0): 

### Community 1515 - "Community 1515"
Cohesion: 1.0
Nodes (0): 

### Community 1516 - "Community 1516"
Cohesion: 1.0
Nodes (0): 

### Community 1517 - "Community 1517"
Cohesion: 1.0
Nodes (0): 

### Community 1518 - "Community 1518"
Cohesion: 1.0
Nodes (0): 

### Community 1519 - "Community 1519"
Cohesion: 1.0
Nodes (0): 

### Community 1520 - "Community 1520"
Cohesion: 1.0
Nodes (0): 

### Community 1521 - "Community 1521"
Cohesion: 1.0
Nodes (0): 

### Community 1522 - "Community 1522"
Cohesion: 1.0
Nodes (0): 

### Community 1523 - "Community 1523"
Cohesion: 1.0
Nodes (0): 

### Community 1524 - "Community 1524"
Cohesion: 1.0
Nodes (0): 

### Community 1525 - "Community 1525"
Cohesion: 1.0
Nodes (0): 

### Community 1526 - "Community 1526"
Cohesion: 1.0
Nodes (0): 

### Community 1527 - "Community 1527"
Cohesion: 1.0
Nodes (0): 

### Community 1528 - "Community 1528"
Cohesion: 1.0
Nodes (0): 

### Community 1529 - "Community 1529"
Cohesion: 1.0
Nodes (0): 

### Community 1530 - "Community 1530"
Cohesion: 1.0
Nodes (0): 

### Community 1531 - "Community 1531"
Cohesion: 1.0
Nodes (0): 

### Community 1532 - "Community 1532"
Cohesion: 1.0
Nodes (0): 

### Community 1533 - "Community 1533"
Cohesion: 1.0
Nodes (0): 

### Community 1534 - "Community 1534"
Cohesion: 1.0
Nodes (0): 

### Community 1535 - "Community 1535"
Cohesion: 1.0
Nodes (0): 

### Community 1536 - "Community 1536"
Cohesion: 1.0
Nodes (0): 

### Community 1537 - "Community 1537"
Cohesion: 1.0
Nodes (0): 

### Community 1538 - "Community 1538"
Cohesion: 1.0
Nodes (0): 

### Community 1539 - "Community 1539"
Cohesion: 1.0
Nodes (0): 

### Community 1540 - "Community 1540"
Cohesion: 1.0
Nodes (0): 

### Community 1541 - "Community 1541"
Cohesion: 1.0
Nodes (0): 

### Community 1542 - "Community 1542"
Cohesion: 1.0
Nodes (0): 

### Community 1543 - "Community 1543"
Cohesion: 1.0
Nodes (0): 

### Community 1544 - "Community 1544"
Cohesion: 1.0
Nodes (0): 

### Community 1545 - "Community 1545"
Cohesion: 1.0
Nodes (0): 

### Community 1546 - "Community 1546"
Cohesion: 1.0
Nodes (0): 

### Community 1547 - "Community 1547"
Cohesion: 1.0
Nodes (0): 

### Community 1548 - "Community 1548"
Cohesion: 1.0
Nodes (0): 

### Community 1549 - "Community 1549"
Cohesion: 1.0
Nodes (0): 

### Community 1550 - "Community 1550"
Cohesion: 1.0
Nodes (0): 

### Community 1551 - "Community 1551"
Cohesion: 1.0
Nodes (0): 

### Community 1552 - "Community 1552"
Cohesion: 1.0
Nodes (0): 

### Community 1553 - "Community 1553"
Cohesion: 1.0
Nodes (0): 

### Community 1554 - "Community 1554"
Cohesion: 1.0
Nodes (0): 

### Community 1555 - "Community 1555"
Cohesion: 1.0
Nodes (0): 

### Community 1556 - "Community 1556"
Cohesion: 1.0
Nodes (0): 

### Community 1557 - "Community 1557"
Cohesion: 1.0
Nodes (0): 

### Community 1558 - "Community 1558"
Cohesion: 1.0
Nodes (0): 

### Community 1559 - "Community 1559"
Cohesion: 1.0
Nodes (0): 

### Community 1560 - "Community 1560"
Cohesion: 1.0
Nodes (0): 

### Community 1561 - "Community 1561"
Cohesion: 1.0
Nodes (1): ProtectedResourceMetadata

### Community 1562 - "Community 1562"
Cohesion: 1.0
Nodes (0): 

### Community 1563 - "Community 1563"
Cohesion: 1.0
Nodes (0): 

### Community 1564 - "Community 1564"
Cohesion: 1.0
Nodes (0): 

### Community 1565 - "Community 1565"
Cohesion: 1.0
Nodes (0): 

### Community 1566 - "Community 1566"
Cohesion: 1.0
Nodes (0): 

### Community 1567 - "Community 1567"
Cohesion: 1.0
Nodes (0): 

### Community 1568 - "Community 1568"
Cohesion: 1.0
Nodes (0): 

### Community 1569 - "Community 1569"
Cohesion: 1.0
Nodes (0): 

### Community 1570 - "Community 1570"
Cohesion: 1.0
Nodes (0): 

### Community 1571 - "Community 1571"
Cohesion: 1.0
Nodes (0): 

### Community 1572 - "Community 1572"
Cohesion: 1.0
Nodes (0): 

### Community 1573 - "Community 1573"
Cohesion: 1.0
Nodes (1): Compatibility facade for the focused Nsight Graphics backend modules.

### Community 1574 - "Community 1574"
Cohesion: 1.0
Nodes (0): 

### Community 1575 - "Community 1575"
Cohesion: 1.0
Nodes (0): 

### Community 1576 - "Community 1576"
Cohesion: 1.0
Nodes (0): 

### Community 1577 - "Community 1577"
Cohesion: 1.0
Nodes (0): 

### Community 1578 - "Community 1578"
Cohesion: 1.0
Nodes (0): 

### Community 1579 - "Community 1579"
Cohesion: 1.0
Nodes (0): 

### Community 1580 - "Community 1580"
Cohesion: 1.0
Nodes (0): 

### Community 1581 - "Community 1581"
Cohesion: 1.0
Nodes (0): 

### Community 1582 - "Community 1582"
Cohesion: 1.0
Nodes (0): 

### Community 1583 - "Community 1583"
Cohesion: 1.0
Nodes (0): 

### Community 1584 - "Community 1584"
Cohesion: 1.0
Nodes (0): 

### Community 1585 - "Community 1585"
Cohesion: 1.0
Nodes (0): 

### Community 1586 - "Community 1586"
Cohesion: 1.0
Nodes (0): 

### Community 1587 - "Community 1587"
Cohesion: 1.0
Nodes (0): 

### Community 1588 - "Community 1588"
Cohesion: 1.0
Nodes (0): 

### Community 1589 - "Community 1589"
Cohesion: 1.0
Nodes (0): 

### Community 1590 - "Community 1590"
Cohesion: 1.0
Nodes (0): 

### Community 1591 - "Community 1591"
Cohesion: 1.0
Nodes (0): 

### Community 1592 - "Community 1592"
Cohesion: 1.0
Nodes (0): 

### Community 1593 - "Community 1593"
Cohesion: 1.0
Nodes (0): 

### Community 1594 - "Community 1594"
Cohesion: 1.0
Nodes (0): 

### Community 1595 - "Community 1595"
Cohesion: 1.0
Nodes (0): 

### Community 1596 - "Community 1596"
Cohesion: 1.0
Nodes (0): 

### Community 1597 - "Community 1597"
Cohesion: 1.0
Nodes (0): 

### Community 1598 - "Community 1598"
Cohesion: 1.0
Nodes (0): 

### Community 1599 - "Community 1599"
Cohesion: 1.0
Nodes (0): 

### Community 1600 - "Community 1600"
Cohesion: 1.0
Nodes (0): 

### Community 1601 - "Community 1601"
Cohesion: 1.0
Nodes (0): 

### Community 1602 - "Community 1602"
Cohesion: 1.0
Nodes (0): 

### Community 1603 - "Community 1603"
Cohesion: 1.0
Nodes (0): 

### Community 1604 - "Community 1604"
Cohesion: 1.0
Nodes (0): 

### Community 1605 - "Community 1605"
Cohesion: 1.0
Nodes (0): 

### Community 1606 - "Community 1606"
Cohesion: 1.0
Nodes (0): 

### Community 1607 - "Community 1607"
Cohesion: 1.0
Nodes (0): 

### Community 1608 - "Community 1608"
Cohesion: 1.0
Nodes (0): 

### Community 1609 - "Community 1609"
Cohesion: 1.0
Nodes (0): 

### Community 1610 - "Community 1610"
Cohesion: 1.0
Nodes (0): 

### Community 1611 - "Community 1611"
Cohesion: 1.0
Nodes (0): 

### Community 1612 - "Community 1612"
Cohesion: 1.0
Nodes (0): 

### Community 1613 - "Community 1613"
Cohesion: 1.0
Nodes (0): 

### Community 1614 - "Community 1614"
Cohesion: 1.0
Nodes (0): 

### Community 1615 - "Community 1615"
Cohesion: 1.0
Nodes (0): 

### Community 1616 - "Community 1616"
Cohesion: 1.0
Nodes (0): 

### Community 1617 - "Community 1617"
Cohesion: 1.0
Nodes (0): 

### Community 1618 - "Community 1618"
Cohesion: 1.0
Nodes (0): 

### Community 1619 - "Community 1619"
Cohesion: 1.0
Nodes (0): 

### Community 1620 - "Community 1620"
Cohesion: 1.0
Nodes (0): 

### Community 1621 - "Community 1621"
Cohesion: 1.0
Nodes (0): 

### Community 1622 - "Community 1622"
Cohesion: 1.0
Nodes (0): 

### Community 1623 - "Community 1623"
Cohesion: 1.0
Nodes (0): 

### Community 1624 - "Community 1624"
Cohesion: 1.0
Nodes (0): 

### Community 1625 - "Community 1625"
Cohesion: 1.0
Nodes (0): 

### Community 1626 - "Community 1626"
Cohesion: 1.0
Nodes (0): 

### Community 1627 - "Community 1627"
Cohesion: 1.0
Nodes (0): 

### Community 1628 - "Community 1628"
Cohesion: 1.0
Nodes (0): 

### Community 1629 - "Community 1629"
Cohesion: 1.0
Nodes (0): 

### Community 1630 - "Community 1630"
Cohesion: 1.0
Nodes (0): 

### Community 1631 - "Community 1631"
Cohesion: 1.0
Nodes (0): 

### Community 1632 - "Community 1632"
Cohesion: 1.0
Nodes (0): 

### Community 1633 - "Community 1633"
Cohesion: 1.0
Nodes (0): 

### Community 1634 - "Community 1634"
Cohesion: 1.0
Nodes (0): 

### Community 1635 - "Community 1635"
Cohesion: 1.0
Nodes (0): 

### Community 1636 - "Community 1636"
Cohesion: 1.0
Nodes (0): 

### Community 1637 - "Community 1637"
Cohesion: 1.0
Nodes (0): 

### Community 1638 - "Community 1638"
Cohesion: 1.0
Nodes (0): 

### Community 1639 - "Community 1639"
Cohesion: 1.0
Nodes (0): 

### Community 1640 - "Community 1640"
Cohesion: 1.0
Nodes (0): 

### Community 1641 - "Community 1641"
Cohesion: 1.0
Nodes (0): 

### Community 1642 - "Community 1642"
Cohesion: 1.0
Nodes (0): 

### Community 1643 - "Community 1643"
Cohesion: 1.0
Nodes (0): 

### Community 1644 - "Community 1644"
Cohesion: 1.0
Nodes (0): 

### Community 1645 - "Community 1645"
Cohesion: 1.0
Nodes (0): 

### Community 1646 - "Community 1646"
Cohesion: 1.0
Nodes (0): 

### Community 1647 - "Community 1647"
Cohesion: 1.0
Nodes (0): 

### Community 1648 - "Community 1648"
Cohesion: 1.0
Nodes (0): 

### Community 1649 - "Community 1649"
Cohesion: 1.0
Nodes (0): 

### Community 1650 - "Community 1650"
Cohesion: 1.0
Nodes (0): 

### Community 1651 - "Community 1651"
Cohesion: 1.0
Nodes (0): 

### Community 1652 - "Community 1652"
Cohesion: 1.0
Nodes (0): 

### Community 1653 - "Community 1653"
Cohesion: 1.0
Nodes (0): 

### Community 1654 - "Community 1654"
Cohesion: 1.0
Nodes (0): 

### Community 1655 - "Community 1655"
Cohesion: 1.0
Nodes (0): 

### Community 1656 - "Community 1656"
Cohesion: 1.0
Nodes (0): 

### Community 1657 - "Community 1657"
Cohesion: 1.0
Nodes (0): 

### Community 1658 - "Community 1658"
Cohesion: 1.0
Nodes (0): 

### Community 1659 - "Community 1659"
Cohesion: 1.0
Nodes (0): 

### Community 1660 - "Community 1660"
Cohesion: 1.0
Nodes (0): 

### Community 1661 - "Community 1661"
Cohesion: 1.0
Nodes (0): 

### Community 1662 - "Community 1662"
Cohesion: 1.0
Nodes (0): 

### Community 1663 - "Community 1663"
Cohesion: 1.0
Nodes (0): 

### Community 1664 - "Community 1664"
Cohesion: 1.0
Nodes (0): 

### Community 1665 - "Community 1665"
Cohesion: 1.0
Nodes (0): 

### Community 1666 - "Community 1666"
Cohesion: 1.0
Nodes (0): 

### Community 1667 - "Community 1667"
Cohesion: 1.0
Nodes (0): 

### Community 1668 - "Community 1668"
Cohesion: 1.0
Nodes (0): 

### Community 1669 - "Community 1669"
Cohesion: 1.0
Nodes (0): 

### Community 1670 - "Community 1670"
Cohesion: 1.0
Nodes (0): 

### Community 1671 - "Community 1671"
Cohesion: 1.0
Nodes (0): 

### Community 1672 - "Community 1672"
Cohesion: 1.0
Nodes (0): 

### Community 1673 - "Community 1673"
Cohesion: 1.0
Nodes (0): 

### Community 1674 - "Community 1674"
Cohesion: 1.0
Nodes (0): 

### Community 1675 - "Community 1675"
Cohesion: 1.0
Nodes (0): 

### Community 1676 - "Community 1676"
Cohesion: 1.0
Nodes (0): 

### Community 1677 - "Community 1677"
Cohesion: 1.0
Nodes (0): 

### Community 1678 - "Community 1678"
Cohesion: 1.0
Nodes (0): 

### Community 1679 - "Community 1679"
Cohesion: 1.0
Nodes (0): 

### Community 1680 - "Community 1680"
Cohesion: 1.0
Nodes (0): 

### Community 1681 - "Community 1681"
Cohesion: 1.0
Nodes (0): 

### Community 1682 - "Community 1682"
Cohesion: 1.0
Nodes (0): 

### Community 1683 - "Community 1683"
Cohesion: 1.0
Nodes (0): 

### Community 1684 - "Community 1684"
Cohesion: 1.0
Nodes (0): 

### Community 1685 - "Community 1685"
Cohesion: 1.0
Nodes (0): 

### Community 1686 - "Community 1686"
Cohesion: 1.0
Nodes (0): 

### Community 1687 - "Community 1687"
Cohesion: 1.0
Nodes (0): 

### Community 1688 - "Community 1688"
Cohesion: 1.0
Nodes (0): 

### Community 1689 - "Community 1689"
Cohesion: 1.0
Nodes (0): 

### Community 1690 - "Community 1690"
Cohesion: 1.0
Nodes (0): 

### Community 1691 - "Community 1691"
Cohesion: 1.0
Nodes (0): 

### Community 1692 - "Community 1692"
Cohesion: 1.0
Nodes (0): 

### Community 1693 - "Community 1693"
Cohesion: 1.0
Nodes (0): 

### Community 1694 - "Community 1694"
Cohesion: 1.0
Nodes (0): 

### Community 1695 - "Community 1695"
Cohesion: 1.0
Nodes (0): 

### Community 1696 - "Community 1696"
Cohesion: 1.0
Nodes (0): 

### Community 1697 - "Community 1697"
Cohesion: 1.0
Nodes (0): 

### Community 1698 - "Community 1698"
Cohesion: 1.0
Nodes (0): 

### Community 1699 - "Community 1699"
Cohesion: 1.0
Nodes (0): 

### Community 1700 - "Community 1700"
Cohesion: 1.0
Nodes (0): 

### Community 1701 - "Community 1701"
Cohesion: 1.0
Nodes (0): 

### Community 1702 - "Community 1702"
Cohesion: 1.0
Nodes (0): 

### Community 1703 - "Community 1703"
Cohesion: 1.0
Nodes (0): 

### Community 1704 - "Community 1704"
Cohesion: 1.0
Nodes (0): 

### Community 1705 - "Community 1705"
Cohesion: 1.0
Nodes (0): 

### Community 1706 - "Community 1706"
Cohesion: 1.0
Nodes (0): 

### Community 1707 - "Community 1707"
Cohesion: 1.0
Nodes (0): 

### Community 1708 - "Community 1708"
Cohesion: 1.0
Nodes (0): 

### Community 1709 - "Community 1709"
Cohesion: 1.0
Nodes (0): 

### Community 1710 - "Community 1710"
Cohesion: 1.0
Nodes (0): 

### Community 1711 - "Community 1711"
Cohesion: 1.0
Nodes (0): 

### Community 1712 - "Community 1712"
Cohesion: 1.0
Nodes (0): 

### Community 1713 - "Community 1713"
Cohesion: 1.0
Nodes (0): 

### Community 1714 - "Community 1714"
Cohesion: 1.0
Nodes (0): 

### Community 1715 - "Community 1715"
Cohesion: 1.0
Nodes (0): 

### Community 1716 - "Community 1716"
Cohesion: 1.0
Nodes (0): 

### Community 1717 - "Community 1717"
Cohesion: 1.0
Nodes (0): 

### Community 1718 - "Community 1718"
Cohesion: 1.0
Nodes (0): 

### Community 1719 - "Community 1719"
Cohesion: 1.0
Nodes (0): 

### Community 1720 - "Community 1720"
Cohesion: 1.0
Nodes (0): 

### Community 1721 - "Community 1721"
Cohesion: 1.0
Nodes (0): 

### Community 1722 - "Community 1722"
Cohesion: 1.0
Nodes (0): 

### Community 1723 - "Community 1723"
Cohesion: 1.0
Nodes (0): 

### Community 1724 - "Community 1724"
Cohesion: 1.0
Nodes (1): Return identifier for this LLM.

### Community 1725 - "Community 1725"
Cohesion: 1.0
Nodes (0): 

### Community 1726 - "Community 1726"
Cohesion: 1.0
Nodes (1): Get base confidence for this evidence type.

### Community 1727 - "Community 1727"
Cohesion: 1.0
Nodes (1): Filter search results by relevance to the query.          Args:             r

### Community 1728 - "Community 1728"
Cohesion: 1.0
Nodes (1): Add a finding to the repository.          Args:             query: The query

### Community 1729 - "Community 1729"
Cohesion: 1.0
Nodes (1): Get findings for a query.          Args:             query: The query to get

### Community 1730 - "Community 1730"
Cohesion: 1.0
Nodes (1): Clear findings for a query.          Args:             query: The query to cl

### Community 1731 - "Community 1731"
Cohesion: 1.0
Nodes (1): Synthesize findings from sub-queries into a final answer.          Args:

### Community 1732 - "Community 1732"
Cohesion: 1.0
Nodes (1): Generate knowledge from the given query and context.          Args:

### Community 1733 - "Community 1733"
Cohesion: 1.0
Nodes (1): Generate knowledge based on query and context.          Args:             que

### Community 1734 - "Community 1734"
Cohesion: 1.0
Nodes (1): Generate knowledge for a sub-question.          Args:             sub_query:

### Community 1735 - "Community 1735"
Cohesion: 1.0
Nodes (1): Compress and summarize accumulated knowledge.          Args:             curr

### Community 1736 - "Community 1736"
Cohesion: 1.0
Nodes (1): Format source links into citations.          Args:             links: List of

### Community 1737 - "Community 1737"
Cohesion: 1.0
Nodes (1): Generate questions based on the current state of research.          Args:

### Community 1738 - "Community 1738"
Cohesion: 1.0
Nodes (1): Analyze a topic using the strategy's specific approach.          Args:

### Community 1739 - "Community 1739"
Cohesion: 1.0
Nodes (1): Execute the tool with the given parameters.          Args:             **kwar

### Community 1740 - "Community 1740"
Cohesion: 1.0
Nodes (1): Run benchmark evaluation with given system configuration.          Args:

### Community 1741 - "Community 1741"
Cohesion: 1.0
Nodes (1): Get the default path or URL for the dataset.          Returns:             St

### Community 1742 - "Community 1742"
Cohesion: 1.0
Nodes (1): Delete a research report.          Args:             research_id: Unique iden

### Community 1743 - "Community 1743"
Cohesion: 1.0
Nodes (1): Register a dataset class.          Args:             dataset_class: A class i

### Community 1744 - "Community 1744"
Cohesion: 1.0
Nodes (1): Get a dataset class by ID.          Args:             dataset_id: ID of the d

### Community 1745 - "Community 1745"
Cohesion: 1.0
Nodes (1): Create a dataset instance by ID.          Args:             dataset_id: ID of

### Community 1746 - "Community 1746"
Cohesion: 1.0
Nodes (1): Get information about all registered datasets.          Returns:

### Community 1747 - "Community 1747"
Cohesion: 1.0
Nodes (1): Load a dataset by ID.          This is a convenience method that creates a dat

### Community 1748 - "Community 1748"
Cohesion: 1.0
Nodes (1): Context manager for monitoring resources during a block of code.          Exam

### Community 1749 - "Community 1749"
Cohesion: 1.0
Nodes (1): Context manager for timing a block of code.          Args:             name:

### Community 1750 - "Community 1750"
Cohesion: 1.0
Nodes (1): Process initial analysis with citations.

### Community 1751 - "Community 1751"
Cohesion: 1.0
Nodes (1): Process follow-up analysis with citations.

### Community 1752 - "Community 1752"
Cohesion: 1.0
Nodes (1): Classify a URL to determine its type.          Args:             url: The URL

### Community 1753 - "Community 1753"
Cohesion: 1.0
Nodes (1): Check if URL points directly to a PDF.          Note: Academic source PDFs (ar

### Community 1754 - "Community 1754"
Cohesion: 1.0
Nodes (1): Extract the identifier from a URL.          Args:             url: The URL to

### Community 1755 - "Community 1755"
Cohesion: 1.0
Nodes (1): Get human-readable source name.

### Community 1756 - "Community 1756"
Cohesion: 1.0
Nodes (1): Execute a function with database session.

### Community 1757 - "Community 1757"
Cohesion: 1.0
Nodes (1): Get a database session for metrics in the current thread.         Creates a new

### Community 1758 - "Community 1758"
Cohesion: 1.0
Nodes (1): Path to this user's encrypted database file.

### Community 1759 - "Community 1759"
Cohesion: 1.0
Nodes (1): Create an embeddings instance for this provider.          Args:             m

### Community 1760 - "Community 1760"
Cohesion: 1.0
Nodes (1): Check if this embedding provider is available and properly configured.

### Community 1761 - "Community 1761"
Cohesion: 1.0
Nodes (1): Get list of available embedding models for this provider.          Implementat

### Community 1762 - "Community 1762"
Cohesion: 1.0
Nodes (1): Get a setting value as a boolean.          Args:             key: Setting key

### Community 1763 - "Community 1763"
Cohesion: 1.0
Nodes (1): Get information about a specific model.          Args:             model: Mod

### Community 1764 - "Community 1764"
Cohesion: 1.0
Nodes (1): Validate the provider configuration.          Args:             settings_snap

### Community 1765 - "Community 1765"
Cohesion: 1.0
Nodes (1): Get metadata about this provider.          Returns:             Dict with pro

### Community 1766 - "Community 1766"
Cohesion: 1.0
Nodes (1): Return the format identifier (e.g., 'pdf', 'odt', 'latex').          This is u

### Community 1767 - "Community 1767"
Cohesion: 1.0
Nodes (1): Return the file extension including the dot (e.g., '.pdf', '.odt').

### Community 1768 - "Community 1768"
Cohesion: 1.0
Nodes (1): Export markdown content to the target format.          Args:             mark

### Community 1769 - "Community 1769"
Cohesion: 1.0
Nodes (1): Whether auth is needed to list models.          Returns True by default. Overr

### Community 1770 - "Community 1770"
Cohesion: 1.0
Nodes (1): Connect to the MCP server as an async context manager.          Yields:

### Community 1771 - "Community 1771"
Cohesion: 1.0
Nodes (1): Connect to all configured MCP servers.          Yields:             self: The

### Community 1772 - "Community 1772"
Cohesion: 1.0
Nodes (1): Get a database session with automatic cleanup.          Args:             use

### Community 1773 - "Community 1773"
Cohesion: 1.0
Nodes (1): Return the card type (news, research, update, overview)

### Community 1774 - "Community 1774"
Cohesion: 1.0
Nodes (1): Convert card to dictionary representation.         Must be implemented by subcl

### Community 1775 - "Community 1775"
Cohesion: 1.0
Nodes (1): Update a record, return True if successful

### Community 1776 - "Community 1776"
Cohesion: 1.0
Nodes (1): List records with optional filtering

### Community 1777 - "Community 1777"
Cohesion: 1.0
Nodes (1): Get cards for a specific user

### Community 1778 - "Community 1778"
Cohesion: 1.0
Nodes (1): Get the latest version of a card

### Community 1779 - "Community 1779"
Cohesion: 1.0
Nodes (1): Add a new version to a card

### Community 1780 - "Community 1780"
Cohesion: 1.0
Nodes (1): Update the denormalized latest version info on the card

### Community 1781 - "Community 1781"
Cohesion: 1.0
Nodes (1): Get all active subscriptions, optionally filtered by user

### Community 1782 - "Community 1782"
Cohesion: 1.0
Nodes (1): Get subscriptions that are due for refresh

### Community 1783 - "Community 1783"
Cohesion: 1.0
Nodes (1): Update refresh timestamps after processing

### Community 1784 - "Community 1784"
Cohesion: 1.0
Nodes (1): Increment refresh count and update results count

### Community 1785 - "Community 1785"
Cohesion: 1.0
Nodes (1): Resume a paused subscription

### Community 1786 - "Community 1786"
Cohesion: 1.0
Nodes (1): Mark a subscription as expired

### Community 1787 - "Community 1787"
Cohesion: 1.0
Nodes (1): Get a user's rating for a specific item

### Community 1788 - "Community 1788"
Cohesion: 1.0
Nodes (1): Create or update a rating

### Community 1789 - "Community 1789"
Cohesion: 1.0
Nodes (1): Get aggregated ratings for an item

### Community 1790 - "Community 1790"
Cohesion: 1.0
Nodes (1): Get all ratings by a user

### Community 1791 - "Community 1791"
Cohesion: 1.0
Nodes (1): Get preferences for a user

### Community 1792 - "Community 1792"
Cohesion: 1.0
Nodes (1): Create or update user preferences

### Community 1793 - "Community 1793"
Cohesion: 1.0
Nodes (1): Add an item to liked list

### Community 1794 - "Community 1794"
Cohesion: 1.0
Nodes (1): Add an item to disliked list

### Community 1795 - "Community 1795"
Cohesion: 1.0
Nodes (1): Update the user's preference embedding

### Community 1796 - "Community 1796"
Cohesion: 1.0
Nodes (1): Get user preferences.          Args:             user_id: ID of the user

### Community 1797 - "Community 1797"
Cohesion: 1.0
Nodes (1): Update user preferences.          Args:             user_id: ID of the user

### Community 1798 - "Community 1798"
Cohesion: 1.0
Nodes (1): Record a rating from a user.          Args:             user_id: ID of the us

### Community 1799 - "Community 1799"
Cohesion: 1.0
Nodes (1): Get a user's rating for a specific card.          Args:             user_id:

### Community 1800 - "Community 1800"
Cohesion: 1.0
Nodes (1): Get the type of rating this system handles.          Returns:             str

### Community 1801 - "Community 1801"
Cohesion: 1.0
Nodes (1): Get or create the Jinja2 environment.          Returns:             Jinja2 En

### Community 1802 - "Community 1802"
Cohesion: 1.0
Nodes (1): Format a notification template with context data using Jinja2.          Args:

### Community 1803 - "Community 1803"
Cohesion: 1.0
Nodes (1): Get a simple fallback template when Jinja2 is not available.          Args:

### Community 1804 - "Community 1804"
Cohesion: 1.0
Nodes (1): Get required context variables for an event type.          Args:

### Community 1805 - "Community 1805"
Cohesion: 1.0
Nodes (1): Check if this downloader can handle the given URL.          Args:

### Community 1806 - "Community 1806"
Cohesion: 1.0
Nodes (1): Download content from the given URL.          Args:             url: The URL

### Community 1807 - "Community 1807"
Cohesion: 1.0
Nodes (1): Extract text from PDF content using in-memory processing.          This is par

### Community 1808 - "Community 1808"
Cohesion: 1.0
Nodes (1): Recursively remove sensitive keys from data structures.          This method t

### Community 1809 - "Community 1809"
Cohesion: 1.0
Nodes (1): Recursively redact (replace with placeholder) sensitive values in data structure

### Community 1810 - "Community 1810"
Cohesion: 1.0
Nodes (1): Validate file size to prevent memory exhaustion attacks.          Args:

### Community 1811 - "Community 1811"
Cohesion: 1.0
Nodes (1): Validate number of files to prevent resource abuse.          Args:

### Community 1812 - "Community 1812"
Cohesion: 1.0
Nodes (1): Validate file MIME type and extension.          Args:             filename: O

### Community 1813 - "Community 1813"
Cohesion: 1.0
Nodes (1): Validate PDF structure to detect malicious or corrupted files.          This g

### Community 1814 - "Community 1814"
Cohesion: 1.0
Nodes (1): Comprehensive validation for a single file upload.          Runs all validatio

### Community 1815 - "Community 1815"
Cohesion: 1.0
Nodes (1): Block-decision for a parsed IP, delegating to         ``ssrf_validator.is_ip_bl

### Community 1816 - "Community 1816"
Cohesion: 1.0
Nodes (1): Check if hostname resolves to a private IP address.          Args:

### Community 1817 - "Community 1817"
Cohesion: 1.0
Nodes (1): Validate a notification service URL for security issues.          This functio

### Community 1818 - "Community 1818"
Cohesion: 1.0
Nodes (1): Strict validation that raises an exception on invalid URLs.          Args:

### Community 1819 - "Community 1819"
Cohesion: 1.0
Nodes (1): Validate multiple comma-separated service URLs.          Args:             ur

### Community 1820 - "Community 1820"
Cohesion: 1.0
Nodes (1): Validate and sanitize a user-provided path.          Args:             user_i

### Community 1821 - "Community 1821"
Cohesion: 1.0
Nodes (1): Validate a user-provided absolute filesystem path for local indexing.

### Community 1822 - "Community 1822"
Cohesion: 1.0
Nodes (1): Re-sanitize a validated path for static analyzer recognition.          This me

### Community 1823 - "Community 1823"
Cohesion: 1.0
Nodes (1): Validate a model file path specifically.          Args:             model_pat

### Community 1824 - "Community 1824"
Cohesion: 1.0
Nodes (1): Validate a path within the data directory.          Args:             file_pa

### Community 1825 - "Community 1825"
Cohesion: 1.0
Nodes (1): Validate a configuration file path.          Args:             config_path: P

### Community 1826 - "Community 1826"
Cohesion: 1.0
Nodes (1): Generate Permissions-Policy header value.          Disables potentially danger

### Community 1827 - "Community 1827"
Cohesion: 1.0
Nodes (1): Check if the request path is an API route.          Args:             path: R

### Community 1828 - "Community 1828"
Cohesion: 1.0
Nodes (1): Check if a URL uses an unsafe scheme.          Args:             url: The URL

### Community 1829 - "Community 1829"
Cohesion: 1.0
Nodes (1): Validate if a URL is safe to use.          Args:             url: The URL to

### Community 1830 - "Community 1830"
Cohesion: 1.0
Nodes (1): Check for suspicious patterns in URLs that might indicate attacks.          Ar

### Community 1831 - "Community 1831"
Cohesion: 1.0
Nodes (1): Sanitize a URL by adding a scheme if missing and validating it.          Args:

### Community 1832 - "Community 1832"
Cohesion: 1.0
Nodes (1): Check if a URL is from a known academic/research domain.          Args:

### Community 1833 - "Community 1833"
Cohesion: 1.0
Nodes (1): Extract DOI from a URL if present.          Args:             url: The URL to

### Community 1834 - "Community 1834"
Cohesion: 1.0
Nodes (1): Validate that a callback URL is well-formed and safe for HTTP/HTTPS use.

### Community 1835 - "Community 1835"
Cohesion: 1.0
Nodes (1): Validate that a redirect target is safe (same host).          Prevents open re

### Community 1836 - "Community 1836"
Cohesion: 1.0
Nodes (1): Validate a redirect target and return its path-only form.          Combines is

### Community 1837 - "Community 1837"
Cohesion: 1.0
Nodes (1): Determine if this verifier handles the given file.          Args:

### Community 1838 - "Community 1838"
Cohesion: 1.0
Nodes (1): Get the file type identifier for this verifier.          Returns:

### Community 1839 - "Community 1839"
Cohesion: 1.0
Nodes (1): Whether this file type can be legitimately modified by users.          Returns

### Community 1840 - "Community 1840"
Cohesion: 1.0
Nodes (1): Get a setting value.          Args:             key: Setting key

### Community 1841 - "Community 1841"
Cohesion: 1.0
Nodes (1): Get all settings.          Returns:             Dictionary of all settings wi

### Community 1842 - "Community 1842"
Cohesion: 1.0
Nodes (1): Create or update a setting.          Args:             setting: Setting objec

### Community 1843 - "Community 1843"
Cohesion: 1.0
Nodes (1): Delete a setting.          Args:             key: Setting key             co

### Community 1844 - "Community 1844"
Cohesion: 1.0
Nodes (1): Get a simplified settings snapshot with just key-value pairs.          Returns

### Community 1845 - "Community 1845"
Cohesion: 1.0
Nodes (1): Import settings from the defaults settings file.          Args:             c

### Community 1846 - "Community 1846"
Cohesion: 1.0
Nodes (1): Import settings from a dictionary.          Args:             settings_data:

### Community 1847 - "Community 1847"
Cohesion: 1.0
Nodes (1): Convert raw string value to the appropriate type.

### Community 1848 - "Community 1848"
Cohesion: 1.0
Nodes (1): Check if the environment variable is set.

### Community 1849 - "Community 1849"
Cohesion: 1.0
Nodes (1): Save a research report.          Args:             research_id: Unique identi

### Community 1850 - "Community 1850"
Cohesion: 1.0
Nodes (1): Retrieve a research report.          Args:             research_id: Unique id

### Community 1851 - "Community 1851"
Cohesion: 1.0
Nodes (1): Retrieve a research report with its metadata.          Args:             rese

### Community 1852 - "Community 1852"
Cohesion: 1.0
Nodes (1): List available reports.          Args:             username: Optional usernam

### Community 1853 - "Community 1853"
Cohesion: 1.0
Nodes (1): Check if a report exists.          Args:             research_id: Unique iden

### Community 1854 - "Community 1854"
Cohesion: 1.0
Nodes (1): Extract text and metadata from PDF in a single pass.          This method open

### Community 1855 - "Community 1855"
Cohesion: 1.0
Nodes (1): Extract text from multiple PDF files.          Args:             files_data:

### Community 1856 - "Community 1856"
Cohesion: 1.0
Nodes (1): Save sources from research to the ResearchResource table.          Args:

### Community 1857 - "Community 1857"
Cohesion: 1.0
Nodes (1): Get all sources for a research from the database.          Args:

### Community 1858 - "Community 1858"
Cohesion: 1.0
Nodes (1): Update a completed research with its sources.         This should be called whe

### Community 1859 - "Community 1859"
Cohesion: 1.0
Nodes (0): 

### Community 1860 - "Community 1860"
Cohesion: 1.0
Nodes (0): 

### Community 1861 - "Community 1861"
Cohesion: 1.0
Nodes (0): 

### Community 1862 - "Community 1862"
Cohesion: 1.0
Nodes (0): 

### Community 1863 - "Community 1863"
Cohesion: 1.0
Nodes (1): Test quick_summary with full settings propagation.          Patches happen on

### Community 1864 - "Community 1864"
Cohesion: 1.0
Nodes (1): Test detailed_research with comprehensive settings.          detailed_research

### Community 1865 - "Community 1865"
Cohesion: 1.0
Nodes (1): Test fallback between providers based on settings.

### Community 1866 - "Community 1866"
Cohesion: 1.0
Nodes (1): Test that search engine specific settings are applied.          Each call's po

### Community 1867 - "Community 1867"
Cohesion: 1.0
Nodes (1): Create an in-memory database session for testing.

### Community 1868 - "Community 1868"
Cohesion: 1.0
Nodes (1): Create a token counting callback for testing.

### Community 1869 - "Community 1869"
Cohesion: 1.0
Nodes (1): Test that overflow detection logs a warning.

### Community 1870 - "Community 1870"
Cohesion: 1.0
Nodes (1): Detection fires from prompt estimate when provider doesn't echo prompt_eval_coun

### Community 1871 - "Community 1871"
Cohesion: 1.0
Nodes (1): [total-context] fires when input+output exceeds limit but input alone doesn't.

### Community 1872 - "Community 1872"
Cohesion: 1.0
Nodes (1): [total-context] fires when hosted provider input+output exceeds limit.

### Community 1873 - "Community 1873"
Cohesion: 1.0
Nodes (1): [estimated-total-context] fires when token_usage comes from llm_output.

### Community 1874 - "Community 1874"
Cohesion: 1.0
Nodes (1): Regression: TokenCountingCallback is reused across LLM calls in a         resea

### Community 1875 - "Community 1875"
Cohesion: 1.0
Nodes (1): Estimation path should not fire when context_limit is not set.

### Community 1876 - "Community 1876"
Cohesion: 1.0
Nodes (1): Estimation path should not fire when prompt estimate is 0.

### Community 1877 - "Community 1877"
Cohesion: 1.0
Nodes (1): Estimation path should not crash if on_llm_start was never called.

### Community 1878 - "Community 1878"
Cohesion: 1.0
Nodes (1): Test with real Ollama instance if available.

### Community 1879 - "Community 1879"
Cohesion: 1.0
Nodes (1): Create a temporary database for testing

### Community 1880 - "Community 1880"
Cohesion: 1.0
Nodes (1): Create a mock LLM for testing.

### Community 1881 - "Community 1881"
Cohesion: 1.0
Nodes (1): Mock database settings.

### Community 1882 - "Community 1882"
Cohesion: 1.0
Nodes (1): Test that tracker is not used since rate limiting is disabled.

### Community 1883 - "Community 1883"
Cohesion: 1.0
Nodes (1): Create settings snapshot with OpenAI configuration.          Uses simplified f

### Community 1884 - "Community 1884"
Cohesion: 1.0
Nodes (1): Test fallback to environment variable if API key not in settings.

### Community 1885 - "Community 1885"
Cohesion: 1.0
Nodes (1): Create a mock language model.

### Community 1886 - "Community 1886"
Cohesion: 1.0
Nodes (1): Create a mock search engine.

### Community 1887 - "Community 1887"
Cohesion: 1.0
Nodes (1): Create a mock language model.

### Community 1888 - "Community 1888"
Cohesion: 1.0
Nodes (1): Create a mock search engine.

### Community 1889 - "Community 1889"
Cohesion: 1.0
Nodes (1): Fetch the research page HTML

### Community 1890 - "Community 1890"
Cohesion: 1.0
Nodes (0): 

### Community 1891 - "Community 1891"
Cohesion: 1.0
Nodes (1): Test evidence is collected from search results

### Community 1892 - "Community 1892"
Cohesion: 1.0
Nodes (1): Test evidence is scored for quality

### Community 1893 - "Community 1893"
Cohesion: 1.0
Nodes (1): Test irrelevant evidence is filtered out

### Community 1894 - "Community 1894"
Cohesion: 1.0
Nodes (1): Test duplicate evidence is removed

### Community 1895 - "Community 1895"
Cohesion: 1.0
Nodes (1): Test evidence has proper source attribution

### Community 1896 - "Community 1896"
Cohesion: 1.0
Nodes (1): Test evidence timestamps are extracted

### Community 1897 - "Community 1897"
Cohesion: 1.0
Nodes (1): Test evidence authors are extracted

### Community 1898 - "Community 1898"
Cohesion: 1.0
Nodes (1): Test citation information is parsed

### Community 1899 - "Community 1899"
Cohesion: 1.0
Nodes (1): Test evidence confidence is calculated

### Community 1900 - "Community 1900"
Cohesion: 1.0
Nodes (1): Test conflicting evidence is identified

### Community 1901 - "Community 1901"
Cohesion: 1.0
Nodes (1): Test synthesis prompt is generated

### Community 1902 - "Community 1902"
Cohesion: 1.0
Nodes (1): Test evidence is ranked properly

### Community 1903 - "Community 1903"
Cohesion: 1.0
Nodes (1): Test evidence is clustered by topic

### Community 1904 - "Community 1904"
Cohesion: 1.0
Nodes (1): Test evidence gaps are identified

### Community 1905 - "Community 1905"
Cohesion: 1.0
Nodes (1): Test evidence chain is built

### Community 1906 - "Community 1906"
Cohesion: 1.0
Nodes (1): Test claims are extracted from text

### Community 1907 - "Community 1907"
Cohesion: 1.0
Nodes (1): Test claims are classified by type

### Community 1908 - "Community 1908"
Cohesion: 1.0
Nodes (1): Test claims are matched to supporting evidence

### Community 1909 - "Community 1909"
Cohesion: 1.0
Nodes (1): Test claim confidence is scored

### Community 1910 - "Community 1910"
Cohesion: 1.0
Nodes (1): Test contradicting claims are detected

### Community 1911 - "Community 1911"
Cohesion: 1.0
Nodes (1): Test number of supporting evidence is counted

### Community 1912 - "Community 1912"
Cohesion: 1.0
Nodes (1): Test source diversity for claims

### Community 1913 - "Community 1913"
Cohesion: 1.0
Nodes (1): Test recent claims are weighted higher

### Community 1914 - "Community 1914"
Cohesion: 1.0
Nodes (1): Test authority of sources is scored

### Community 1915 - "Community 1915"
Cohesion: 1.0
Nodes (1): Test consensus level is calculated

### Community 1916 - "Community 1916"
Cohesion: 1.0
Nodes (1): Test multiple claims are synthesized

### Community 1917 - "Community 1917"
Cohesion: 1.0
Nodes (1): Test claim hierarchy is built

### Community 1918 - "Community 1918"
Cohesion: 1.0
Nodes (1): Test claim dependencies are mapped

### Community 1919 - "Community 1919"
Cohesion: 1.0
Nodes (1): Test verification prompt is generated

### Community 1920 - "Community 1920"
Cohesion: 1.0
Nodes (1): Test uncertainty is quantified

### Community 1921 - "Community 1921"
Cohesion: 1.0
Nodes (1): Test claim revisions are tracked

### Community 1922 - "Community 1922"
Cohesion: 1.0
Nodes (1): Test conflicting claims are merged

### Community 1923 - "Community 1923"
Cohesion: 1.0
Nodes (1): Test compound claims are split

### Community 1924 - "Community 1924"
Cohesion: 1.0
Nodes (1): Test claim text is normalized

### Community 1925 - "Community 1925"
Cohesion: 1.0
Nodes (1): Test semantic similarity between claims

### Community 1926 - "Community 1926"
Cohesion: 1.0
Nodes (1): Test analyze_topic returns proper result

### Community 1927 - "Community 1927"
Cohesion: 1.0
Nodes (1): Test progress callback is invoked during analysis

### Community 1928 - "Community 1928"
Cohesion: 1.0
Nodes (1): Test source profiles are tracked

### Community 1929 - "Community 1929"
Cohesion: 1.0
Nodes (1): Test query patterns are learned

### Community 1930 - "Community 1930"
Cohesion: 1.0
Nodes (1): Test multi-stage discovery process

### Community 1931 - "Community 1931"
Cohesion: 1.0
Nodes (1): Test initial hypothesis is generated

### Community 1932 - "Community 1932"
Cohesion: 1.0
Nodes (1): Test hypothesis is refined through iteration

### Community 1933 - "Community 1933"
Cohesion: 1.0
Nodes (1): Test evidence is integrated each iteration

### Community 1934 - "Community 1934"
Cohesion: 1.0
Nodes (1): Test convergence is detected

### Community 1935 - "Community 1935"
Cohesion: 1.0
Nodes (1): Test divergence is handled

### Community 1936 - "Community 1936"
Cohesion: 1.0
Nodes (1): Test iteration limit is enforced

### Community 1937 - "Community 1937"
Cohesion: 1.0
Nodes (1): Test quality improvement is tracked

### Community 1938 - "Community 1938"
Cohesion: 1.0
Nodes (1): Test reasoning chain is built

### Community 1939 - "Community 1939"
Cohesion: 1.0
Nodes (1): Test reasoning steps are validated

### Community 1940 - "Community 1940"
Cohesion: 1.0
Nodes (1): Test contradictions are resolved

### Community 1941 - "Community 1941"
Cohesion: 1.0
Nodes (1): Test reasoning gaps are filled

### Community 1942 - "Community 1942"
Cohesion: 1.0
Nodes (1): Test reasoning depth is controlled

### Community 1943 - "Community 1943"
Cohesion: 1.0
Nodes (1): Test reasoning breadth is controlled

### Community 1944 - "Community 1944"
Cohesion: 1.0
Nodes (1): Test reasoning priorities are ordered

### Community 1945 - "Community 1945"
Cohesion: 1.0
Nodes (1): Test irrelevant reasoning is pruned

### Community 1946 - "Community 1946"
Cohesion: 1.0
Nodes (1): Test multiple reasoning paths are explored

### Community 1947 - "Community 1947"
Cohesion: 1.0
Nodes (1): Test reasoning paths are merged

### Community 1948 - "Community 1948"
Cohesion: 1.0
Nodes (1): Test confidence propagates through reasoning

### Community 1949 - "Community 1949"
Cohesion: 1.0
Nodes (1): Test uncertainty is handled in reasoning

### Community 1950 - "Community 1950"
Cohesion: 1.0
Nodes (1): Test assumptions are tracked

### Community 1951 - "Community 1951"
Cohesion: 1.0
Nodes (1): Test conclusions are extracted

### Community 1952 - "Community 1952"
Cohesion: 1.0
Nodes (1): Test supporting evidence is collected

### Community 1953 - "Community 1953"
Cohesion: 1.0
Nodes (1): Test counterarguments are handled

### Community 1954 - "Community 1954"
Cohesion: 1.0
Nodes (1): Test synthesis is generated

### Community 1955 - "Community 1955"
Cohesion: 1.0
Nodes (1): Test summary is created

### Community 1956 - "Community 1956"
Cohesion: 1.0
Nodes (1): Test reasoning quality is assessed

### Community 1957 - "Community 1957"
Cohesion: 1.0
Nodes (1): Test feedback is integrated

### Community 1958 - "Community 1958"
Cohesion: 1.0
Nodes (1): Test learning from outcomes

### Community 1959 - "Community 1959"
Cohesion: 1.0
Nodes (1): Test context is managed

### Community 1960 - "Community 1960"
Cohesion: 1.0
Nodes (1): Test resources are optimized

### Community 1961 - "Community 1961"
Cohesion: 1.0
Nodes (1): Test next search decision

### Community 1962 - "Community 1962"
Cohesion: 1.0
Nodes (1): Test search execution

### Community 1963 - "Community 1963"
Cohesion: 1.0
Nodes (1): Test knowledge update

### Community 1964 - "Community 1964"
Cohesion: 1.0
Nodes (1): Test answer assessment

### Community 1965 - "Community 1965"
Cohesion: 1.0
Nodes (1): Test final answer synthesis

### Community 1966 - "Community 1966"
Cohesion: 1.0
Nodes (1): Test modules are properly initialized

### Community 1967 - "Community 1967"
Cohesion: 1.0
Nodes (1): Test module dependencies are resolved

### Community 1968 - "Community 1968"
Cohesion: 1.0
Nodes (1): Test modules execute in correct order

### Community 1969 - "Community 1969"
Cohesion: 1.0
Nodes (1): Test module outputs are passed between modules

### Community 1970 - "Community 1970"
Cohesion: 1.0
Nodes (1): Test errors in one module don't crash others

### Community 1971 - "Community 1971"
Cohesion: 1.0
Nodes (1): Test module retry on failure

### Community 1972 - "Community 1972"
Cohesion: 1.0
Nodes (1): Test module timeout is handled

### Community 1973 - "Community 1973"
Cohesion: 1.0
Nodes (1): Test modules can execute in parallel

### Community 1974 - "Community 1974"
Cohesion: 1.0
Nodes (1): Test modules execute sequentially when needed

### Community 1975 - "Community 1975"
Cohesion: 1.0
Nodes (1): Test conditional module execution

### Community 1976 - "Community 1976"
Cohesion: 1.0
Nodes (1): Test module results are aggregated

### Community 1977 - "Community 1977"
Cohesion: 1.0
Nodes (1): Test module state is managed

### Community 1978 - "Community 1978"
Cohesion: 1.0
Nodes (1): Test checkpoint is saved

### Community 1979 - "Community 1979"
Cohesion: 1.0
Nodes (1): Test checkpoint can be restored

### Community 1980 - "Community 1980"
Cohesion: 1.0
Nodes (1): Test progress is reported

### Community 1981 - "Community 1981"
Cohesion: 1.0
Nodes (1): Test resources are allocated per module

### Community 1982 - "Community 1982"
Cohesion: 1.0
Nodes (1): Test LLM is selected per module

### Community 1983 - "Community 1983"
Cohesion: 1.0
Nodes (1): Test prompt templates are used

### Community 1984 - "Community 1984"
Cohesion: 1.0
Nodes (1): Test module output is validated

### Community 1985 - "Community 1985"
Cohesion: 1.0
Nodes (1): Test module output quality is assessed

### Community 1986 - "Community 1986"
Cohesion: 1.0
Nodes (1): Test strategy is configurable

### Community 1987 - "Community 1987"
Cohesion: 1.0
Nodes (1): Test execution flows through all phases

### Community 1988 - "Community 1988"
Cohesion: 1.0
Nodes (1): Test strategy adapts to query type

### Community 1989 - "Community 1989"
Cohesion: 1.0
Nodes (1): Test fallback is used on failure

### Community 1990 - "Community 1990"
Cohesion: 1.0
Nodes (1): Test quality threshold is enforced

### Community 1991 - "Community 1991"
Cohesion: 1.0
Nodes (1): Test early termination on high confidence

### Community 1992 - "Community 1992"
Cohesion: 1.0
Nodes (1): Test results are synthesized

### Community 1993 - "Community 1993"
Cohesion: 1.0
Nodes (1): Test cost optimization is applied

### Community 1994 - "Community 1994"
Cohesion: 1.0
Nodes (1): Test latency optimization is applied

### Community 1995 - "Community 1995"
Cohesion: 1.0
Nodes (1): Test quality optimization is applied

### Community 1996 - "Community 1996"
Cohesion: 1.0
Nodes (1): Test multi-objective optimization

### Community 1997 - "Community 1997"
Cohesion: 1.0
Nodes (1): Test user preferences are respected

### Community 1998 - "Community 1998"
Cohesion: 1.0
Nodes (1): Test strategy is context-aware

### Community 1999 - "Community 1999"
Cohesion: 1.0
Nodes (1): Test learning from past executions

### Community 2000 - "Community 2000"
Cohesion: 1.0
Nodes (1): Test feedback is incorporated

### Community 2001 - "Community 2001"
Cohesion: 1.0
Nodes (1): Test intelligent constraint decomposition

### Community 2002 - "Community 2002"
Cohesion: 1.0
Nodes (1): Test generating search combinations

### Community 2003 - "Community 2003"
Cohesion: 1.0
Nodes (1): Test creative search angle generation

### Community 2004 - "Community 2004"
Cohesion: 1.0
Nodes (1): Test search combination optimization

### Community 2005 - "Community 2005"
Cohesion: 1.0
Nodes (1): Test quick confidence checking

### Community 2006 - "Community 2006"
Cohesion: 1.0
Nodes (1): Test early rejection decision

### Community 2007 - "Community 2007"
Cohesion: 1.0
Nodes (1): Test search continuation decision

### Community 2008 - "Community 2008"
Cohesion: 1.0
Nodes (1): evaluation_config is set when only model is provided.

### Community 2009 - "Community 2009"
Cohesion: 1.0
Nodes (1): evaluation_config is set when only provider is provided.

### Community 2010 - "Community 2010"
Cohesion: 1.0
Nodes (1): evaluation_config includes both model and provider.

### Community 2011 - "Community 2011"
Cohesion: 1.0
Nodes (1): evaluation_config is None when neither model nor provider.

### Community 2012 - "Community 2012"
Cohesion: 1.0
Nodes (1): evaluation_config with model for browsecomp.

### Community 2013 - "Community 2013"
Cohesion: 1.0
Nodes (1): evaluation_config with provider for browsecomp.

### Community 2014 - "Community 2014"
Cohesion: 1.0
Nodes (1): evaluation_config with model for xbench.

### Community 2015 - "Community 2015"
Cohesion: 1.0
Nodes (1): evaluation_config with provider for xbench.

### Community 2016 - "Community 2016"
Cohesion: 1.0
Nodes (1): Uses default configurations when none provided.

### Community 2017 - "Community 2017"
Cohesion: 1.0
Nodes (1): Passes custom configurations correctly.

### Community 2018 - "Community 2018"
Cohesion: 1.0
Nodes (1): Comparison report is written to file.

### Community 2019 - "Community 2019"
Cohesion: 1.0
Nodes (1): Extra config items beyond standard ones are passed through.

### Community 2020 - "Community 2020"
Cohesion: 1.0
Nodes (1): Test basic initialization of search system.

### Community 2021 - "Community 2021"
Cohesion: 1.0
Nodes (1): Test initialization with custom model name.

### Community 2022 - "Community 2022"
Cohesion: 1.0
Nodes (1): Test initialization with custom temperature.

### Community 2023 - "Community 2023"
Cohesion: 1.0
Nodes (1): Test initialization with custom provider.

### Community 2024 - "Community 2024"
Cohesion: 1.0
Nodes (1): Test initialization with custom iterations.

### Community 2025 - "Community 2025"
Cohesion: 1.0
Nodes (1): Test initialization with custom questions per iteration.

### Community 2026 - "Community 2026"
Cohesion: 1.0
Nodes (1): Test initialization with progress callback.

### Community 2027 - "Community 2027"
Cohesion: 1.0
Nodes (1): Test initialization with custom search tool.

### Community 2028 - "Community 2028"
Cohesion: 1.0
Nodes (1): Test initialization with custom search strategy.

### Community 2029 - "Community 2029"
Cohesion: 1.0
Nodes (1): Test initialization with custom retrievers.

### Community 2030 - "Community 2030"
Cohesion: 1.0
Nodes (1): Test initialization with custom LLMs.

### Community 2031 - "Community 2031"
Cohesion: 1.0
Nodes (1): Test basic quick summary.

### Community 2032 - "Community 2032"
Cohesion: 1.0
Nodes (1): Test quick summary with custom provider in settings_snapshot.

### Community 2033 - "Community 2033"
Cohesion: 1.0
Nodes (1): Test quick summary with custom temperature in settings_snapshot.

### Community 2034 - "Community 2034"
Cohesion: 1.0
Nodes (1): Test quick summary registers retrievers with registry.

### Community 2035 - "Community 2035"
Cohesion: 1.0
Nodes (1): Test quick summary with research ID tracking.

### Community 2036 - "Community 2036"
Cohesion: 1.0
Nodes (1): Test quick summary search_original_query default is True.

### Community 2037 - "Community 2037"
Cohesion: 1.0
Nodes (1): Test quick summary with search_original_query disabled.

### Community 2038 - "Community 2038"
Cohesion: 1.0
Nodes (1): Test quick summary with empty query.

### Community 2039 - "Community 2039"
Cohesion: 1.0
Nodes (1): Test quick summary with special characters.

### Community 2040 - "Community 2040"
Cohesion: 1.0
Nodes (1): Test quick summary with unicode characters.

### Community 2041 - "Community 2041"
Cohesion: 1.0
Nodes (1): Test quick summary handles system errors.

### Community 2042 - "Community 2042"
Cohesion: 1.0
Nodes (1): Test quick summary handles analyze_topic errors.

### Community 2043 - "Community 2043"
Cohesion: 1.0
Nodes (1): Test complete research workflow.

### Community 2044 - "Community 2044"
Cohesion: 1.0
Nodes (1): Test ALL API v1 endpoints.

### Community 2045 - "Community 2045"
Cohesion: 1.0
Nodes (1): Test that API accepts properly formatted requests.

### Community 2046 - "Community 2046"
Cohesion: 1.0
Nodes (1): Each example file must be valid Python (no syntax errors).

### Community 2047 - "Community 2047"
Cohesion: 1.0
Nodes (1): Each example script should define a main() function.

### Community 2048 - "Community 2048"
Cohesion: 1.0
Nodes (1): Each example script should have an if __name__ == '__main__' guard.

### Community 2049 - "Community 2049"
Cohesion: 1.0
Nodes (1): Test quick summary with minimal query.

### Community 2050 - "Community 2050"
Cohesion: 1.0
Nodes (1): Test the quick summary test endpoint with minimal query.

### Community 2051 - "Community 2051"
Cohesion: 1.0
Nodes (1): Test analyze documents with minimal input.

### Community 2052 - "Community 2052"
Cohesion: 1.0
Nodes (1): Test generate report with minimal input.

### Community 2053 - "Community 2053"
Cohesion: 1.0
Nodes (1): Test quick summary with the most minimal possible query.

### Community 2054 - "Community 2054"
Cohesion: 1.0
Nodes (1): Test the test endpoint with minimal query.

### Community 2055 - "Community 2055"
Cohesion: 1.0
Nodes (1): Test analyze documents with minimal input.

### Community 2056 - "Community 2056"
Cohesion: 1.0
Nodes (1): Test generate report with minimal input.

### Community 2057 - "Community 2057"
Cohesion: 1.0
Nodes (1): Check related search engine settings.

### Community 2058 - "Community 2058"
Cohesion: 1.0
Nodes (1): Check all settings to see what's available.

### Community 2059 - "Community 2059"
Cohesion: 1.0
Nodes (0): 

### Community 2060 - "Community 2060"
Cohesion: 1.0
Nodes (0): 

### Community 2061 - "Community 2061"
Cohesion: 1.0
Nodes (0): 

### Community 2062 - "Community 2062"
Cohesion: 1.0
Nodes (1): Use Puppeteer to authenticate and get cookies

### Community 2063 - "Community 2063"
Cohesion: 1.0
Nodes (1): Create a temporary data directory for testing.

### Community 2064 - "Community 2064"
Cohesion: 1.0
Nodes (1): Create a test Flask app with rate limiting.

### Community 2065 - "Community 2065"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2066 - "Community 2066"
Cohesion: 1.0
Nodes (1): Create a temporary data directory for testing.

### Community 2067 - "Community 2067"
Cohesion: 1.0
Nodes (1): Create a test Flask app with rate limiting.

### Community 2068 - "Community 2068"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2069 - "Community 2069"
Cohesion: 1.0
Nodes (1): Test that rate limit resets after 15 minutes (for login).

### Community 2070 - "Community 2070"
Cohesion: 1.0
Nodes (1): Test that empty configurations list returns error.

### Community 2071 - "Community 2071"
Cohesion: 1.0
Nodes (1): Test that output directory is created.

### Community 2072 - "Community 2072"
Cohesion: 1.0
Nodes (1): Test that default metric weights are applied.

### Community 2073 - "Community 2073"
Cohesion: 1.0
Nodes (1): Test that compare_configurations returns a dictionary.

### Community 2074 - "Community 2074"
Cohesion: 1.0
Nodes (1): Test that error results have 'error' key.

### Community 2075 - "Community 2075"
Cohesion: 1.0
Nodes (1): Test comparing a single configuration.

### Community 2076 - "Community 2076"
Cohesion: 1.0
Nodes (1): Test comparing multiple configurations.

### Community 2077 - "Community 2077"
Cohesion: 1.0
Nodes (1): Test handling of failed configuration.

### Community 2078 - "Community 2078"
Cohesion: 1.0
Nodes (1): Test compare with multiple repetitions per configuration.

### Community 2079 - "Community 2079"
Cohesion: 1.0
Nodes (1): Test compare with custom metric weights.

### Community 2080 - "Community 2080"
Cohesion: 1.0
Nodes (1): Test that results are sorted by score in descending order.

### Community 2081 - "Community 2081"
Cohesion: 1.0
Nodes (1): Test successful configuration evaluation.

### Community 2082 - "Community 2082"
Cohesion: 1.0
Nodes (1): Test that evaluation handles LLM initialization errors.

### Community 2083 - "Community 2083"
Cohesion: 1.0
Nodes (1): Test that configuration parameters are applied correctly.

### Community 2084 - "Community 2084"
Cohesion: 1.0
Nodes (1): Test visualization with no successful results.

### Community 2085 - "Community 2085"
Cohesion: 1.0
Nodes (1): Test metric comparison chart with single metric.

### Community 2086 - "Community 2086"
Cohesion: 1.0
Nodes (1): Test pareto chart creation with data.

### Community 2087 - "Community 2087"
Cohesion: 1.0
Nodes (1): Test that visualizations create output files.

### Community 2088 - "Community 2088"
Cohesion: 1.0
Nodes (1): Test that default config is used.

### Community 2089 - "Community 2089"
Cohesion: 1.0
Nodes (1): Test that custom config overrides defaults.

### Community 2090 - "Community 2090"
Cohesion: 1.0
Nodes (1): Test that unsupported parameters are filtered out.

### Community 2091 - "Community 2091"
Cohesion: 1.0
Nodes (1): Test that API key is extracted from settings snapshot.

### Community 2092 - "Community 2092"
Cohesion: 1.0
Nodes (1): Test that grade_single_result grades correctly.

### Community 2093 - "Community 2093"
Cohesion: 1.0
Nodes (1): Test that grade_single_result handles errors gracefully.

### Community 2094 - "Community 2094"
Cohesion: 1.0
Nodes (1): Test BrowseComp-specific grading format extraction.

### Community 2095 - "Community 2095"
Cohesion: 1.0
Nodes (1): Test grading when LLM doesn't provide clear judgment.

### Community 2096 - "Community 2096"
Cohesion: 1.0
Nodes (1): Test that grade_results processes all items in file.

### Community 2097 - "Community 2097"
Cohesion: 1.0
Nodes (1): Test that progress callback is invoked during grading.

### Community 2098 - "Community 2098"
Cohesion: 1.0
Nodes (1): Test that grade_results handles individual grading errors.

### Community 2099 - "Community 2099"
Cohesion: 1.0
Nodes (1): Test that grade_results writes to output file.

### Community 2100 - "Community 2100"
Cohesion: 1.0
Nodes (1): Test grading with empty model response.

### Community 2101 - "Community 2101"
Cohesion: 1.0
Nodes (1): Test grading when LLM doesn't have invoke method.

### Community 2102 - "Community 2102"
Cohesion: 1.0
Nodes (1): Test grading with LLM that has chat_messages attribute.

### Community 2103 - "Community 2103"
Cohesion: 1.0
Nodes (1): Test SimpleQA grading with 'no' judgment.

### Community 2104 - "Community 2104"
Cohesion: 1.0
Nodes (1): Test that settings_snapshot is passed to get_evaluation_llm.

### Community 2105 - "Community 2105"
Cohesion: 1.0
Nodes (1): grade_single_result handles LLM response with .content attribute.

### Community 2106 - "Community 2106"
Cohesion: 1.0
Nodes (1): grade_single_result handles browsecomp extraction format.

### Community 2107 - "Community 2107"
Cohesion: 1.0
Nodes (1): grade_single_result falls back to calling LLM as callable.

### Community 2108 - "Community 2108"
Cohesion: 1.0
Nodes (1): grade_single_result handles exceptions gracefully.

### Community 2109 - "Community 2109"
Cohesion: 1.0
Nodes (1): grade_single_result defaults to incorrect when no 'Correct:' match.

### Community 2110 - "Community 2110"
Cohesion: 1.0
Nodes (1): Extracts API key from settings_snapshot when value is a dict.

### Community 2111 - "Community 2111"
Cohesion: 1.0
Nodes (1): Extracts API key from settings_snapshot when value is a string.

### Community 2112 - "Community 2112"
Cohesion: 1.0
Nodes (1): Warns when no settings_snapshot provided for openai_endpoint.

### Community 2113 - "Community 2113"
Cohesion: 1.0
Nodes (1): Warns when settings_snapshot has no API key.

### Community 2114 - "Community 2114"
Cohesion: 1.0
Nodes (1): Custom config overrides default evaluation config.

### Community 2115 - "Community 2115"
Cohesion: 1.0
Nodes (1): Parameters not in ldr_supported_params are filtered out.

### Community 2116 - "Community 2116"
Cohesion: 1.0
Nodes (1): Uses HumanMessage when LLM has chat_messages attribute.

### Community 2117 - "Community 2117"
Cohesion: 1.0
Nodes (1): safe_close is called on the LLM after grading completes.

### Community 2118 - "Community 2118"
Cohesion: 1.0
Nodes (1): safe_close is called even when grading raises.

### Community 2119 - "Community 2119"
Cohesion: 1.0
Nodes (1): When the LLM invoke raises, the try/except inside grade_single_result catches it

### Community 2120 - "Community 2120"
Cohesion: 1.0
Nodes (1): Function creates optimizer with the provided query.

### Community 2121 - "Community 2121"
Cohesion: 1.0
Nodes (1): Function passes all configuration parameters to optimizer.

### Community 2122 - "Community 2122"
Cohesion: 1.0
Nodes (1): Function calls the optimizer's optimize method.

### Community 2123 - "Community 2123"
Cohesion: 1.0
Nodes (1): Function returns the result from optimizer.

### Community 2124 - "Community 2124"
Cohesion: 1.0
Nodes (1): Function uses a parameter space optimized for speed.

### Community 2125 - "Community 2125"
Cohesion: 1.0
Nodes (1): Function uses metric weights that prioritize speed.

### Community 2126 - "Community 2126"
Cohesion: 1.0
Nodes (1): Function uses fast search strategies.

### Community 2127 - "Community 2127"
Cohesion: 1.0
Nodes (1): Function uses metric weights that prioritize quality.

### Community 2128 - "Community 2128"
Cohesion: 1.0
Nodes (1): Function passes None for param_space (uses default).

### Community 2129 - "Community 2129"
Cohesion: 1.0
Nodes (1): Function includes quality in optimization metrics.

### Community 2130 - "Community 2130"
Cohesion: 1.0
Nodes (1): Function uses balanced metric weights.

### Community 2131 - "Community 2131"
Cohesion: 1.0
Nodes (1): Function includes resource in optimization metrics.

### Community 2132 - "Community 2132"
Cohesion: 1.0
Nodes (1): Function optimizes for quality, speed, and resource.

### Community 2133 - "Community 2133"
Cohesion: 1.0
Nodes (1): Cover line 166-167: fallback to 'answer' when 'correct_answer' missing.

### Community 2134 - "Community 2134"
Cohesion: 1.0
Nodes (1): When example has no 'id', fallback to example_{i}.

### Community 2135 - "Community 2135"
Cohesion: 1.0
Nodes (1): Cover the config_info dict passed to generate_report.

### Community 2136 - "Community 2136"
Cohesion: 1.0
Nodes (1): When no outer callback, the lambda should still work (returns None).

### Community 2137 - "Community 2137"
Cohesion: 1.0
Nodes (1): _evaluate_single_configuration must not be called for empty input.

### Community 2138 - "Community 2138"
Cohesion: 1.0
Nodes (1): makedirs is called even before the empty-list guard.

### Community 2139 - "Community 2139"
Cohesion: 1.0
Nodes (1): An exception raised by _evaluate_single_configuration counts as a failure.

### Community 2140 - "Community 2140"
Cohesion: 1.0
Nodes (1): Even on error the result includes timing_details and resource_details.

### Community 2141 - "Community 2141"
Cohesion: 1.0
Nodes (1): stop() must be called on both profiler and monitor even on error.

### Community 2142 - "Community 2142"
Cohesion: 1.0
Nodes (1): Early return when there are no successful results.

### Community 2143 - "Community 2143"
Cohesion: 1.0
Nodes (1): With one successful result all sub-chart helpers are called.

### Community 2144 - "Community 2144"
Cohesion: 1.0
Nodes (1): Config names used in barh must come from result['name'].

### Community 2145 - "Community 2145"
Cohesion: 1.0
Nodes (1): Only successful repetitions count toward runs_completed.

### Community 2146 - "Community 2146"
Cohesion: 1.0
Nodes (1): _calculate_average_metrics is called with the list of successful runs.

### Community 2147 - "Community 2147"
Cohesion: 1.0
Nodes (1): The top-level 'repetitions' key reflects the requested count.

### Community 2148 - "Community 2148"
Cohesion: 1.0
Nodes (1): Results are sorted descending by overall_score.

### Community 2149 - "Community 2149"
Cohesion: 1.0
Nodes (1): String values are coerced to int.

### Community 2150 - "Community 2150"
Cohesion: 1.0
Nodes (1): None value → fallback to 8192.

### Community 2151 - "Community 2151"
Cohesion: 1.0
Nodes (1): Unknown provider goes through cloud branch.

### Community 2152 - "Community 2152"
Cohesion: 1.0
Nodes (1): Should create search engine via factory.

### Community 2153 - "Community 2153"
Cohesion: 1.0
Nodes (1): Should use provided search_tool argument.

### Community 2154 - "Community 2154"
Cohesion: 1.0
Nodes (1): Should use provided llm_instance instead of getting new one.

### Community 2155 - "Community 2155"
Cohesion: 1.0
Nodes (1): Should extract value when search.tool is a dict.

### Community 2156 - "Community 2156"
Cohesion: 1.0
Nodes (1): Should add username to settings snapshot.

### Community 2157 - "Community 2157"
Cohesion: 1.0
Nodes (1): Should create snapshot with just username if none provided.

### Community 2158 - "Community 2158"
Cohesion: 1.0
Nodes (1): Should pass programmatic_mode to factory.

### Community 2159 - "Community 2159"
Cohesion: 1.0
Nodes (1): Should pass all search parameters to factory.

### Community 2160 - "Community 2160"
Cohesion: 1.0
Nodes (1): Should return None when factory returns None.

### Community 2161 - "Community 2161"
Cohesion: 1.0
Nodes (1): Create an in-memory SQLite database for testing.

### Community 2162 - "Community 2162"
Cohesion: 1.0
Nodes (1): Create a database session for testing.

### Community 2163 - "Community 2163"
Cohesion: 1.0
Nodes (1): Create an in-memory SQLite database for testing.

### Community 2164 - "Community 2164"
Cohesion: 1.0
Nodes (1): Create a database session for testing.

### Community 2165 - "Community 2165"
Cohesion: 1.0
Nodes (1): Create an in-memory SQLite database for testing.

### Community 2166 - "Community 2166"
Cohesion: 1.0
Nodes (1): Create a database session for testing.

### Community 2167 - "Community 2167"
Cohesion: 1.0
Nodes (1): Create a temporary directory for test databases.

### Community 2168 - "Community 2168"
Cohesion: 1.0
Nodes (1): Create and dispose a SQLite engine with all tables.

### Community 2169 - "Community 2169"
Cohesion: 1.0
Nodes (1): Create a session bound to db_engine, closed on teardown.

### Community 2170 - "Community 2170"
Cohesion: 1.0
Nodes (1): Test pool kwargs for static pool (testing mode)

### Community 2171 - "Community 2171"
Cohesion: 1.0
Nodes (1): Test pool kwargs for queue pool (production mode)

### Community 2172 - "Community 2172"
Cohesion: 1.0
Nodes (1): Should create all predefined source types.

### Community 2173 - "Community 2173"
Cohesion: 1.0
Nodes (1): Should not duplicate existing source types.

### Community 2174 - "Community 2174"
Cohesion: 1.0
Nodes (1): Should handle IntegrityError gracefully without raising.

### Community 2175 - "Community 2175"
Cohesion: 1.0
Nodes (1): Should re-raise unexpected exceptions.

### Community 2176 - "Community 2176"
Cohesion: 1.0
Nodes (1): Should log when creating source types.

### Community 2177 - "Community 2177"
Cohesion: 1.0
Nodes (1): Should create source types with correct name, display_name, description, icon.

### Community 2178 - "Community 2178"
Cohesion: 1.0
Nodes (1): Should work when password is not provided.

### Community 2179 - "Community 2179"
Cohesion: 1.0
Nodes (1): Should create default Library collection when none exists.

### Community 2180 - "Community 2180"
Cohesion: 1.0
Nodes (1): Should return ID of existing default collection.

### Community 2181 - "Community 2181"
Cohesion: 1.0
Nodes (1): Should set is_default=True on new collection.

### Community 2182 - "Community 2182"
Cohesion: 1.0
Nodes (1): Should create collection with name='Library' and type='default_library'.

### Community 2183 - "Community 2183"
Cohesion: 1.0
Nodes (1): Should re-raise exceptions from database operations.

### Community 2184 - "Community 2184"
Cohesion: 1.0
Nodes (1): Should create Research History collection when none exists.

### Community 2185 - "Community 2185"
Cohesion: 1.0
Nodes (1): Should return ID of existing Research History collection.

### Community 2186 - "Community 2186"
Cohesion: 1.0
Nodes (1): Should re-raise exceptions from database operations.

### Community 2187 - "Community 2187"
Cohesion: 1.0
Nodes (1): Should return dict with success=True on success.

### Community 2188 - "Community 2188"
Cohesion: 1.0
Nodes (1): Should include error message when seed_source_types fails.

### Community 2189 - "Community 2189"
Cohesion: 1.0
Nodes (1): Should include error message when ensure_default_library_collection fails.

### Community 2190 - "Community 2190"
Cohesion: 1.0
Nodes (1): Should call both seed_source_types and ensure_default_library_collection.

### Community 2191 - "Community 2191"
Cohesion: 1.0
Nodes (1): Should return dict with all expected keys.

### Community 2192 - "Community 2192"
Cohesion: 1.0
Nodes (1): Should return the library collection ID.

### Community 2193 - "Community 2193"
Cohesion: 1.0
Nodes (1): Should create library if it doesn't exist (via ensure_default_library_collection

### Community 2194 - "Community 2194"
Cohesion: 1.0
Nodes (1): Should return ID for existing source type.

### Community 2195 - "Community 2195"
Cohesion: 1.0
Nodes (1): Should raise ValueError for non-existent type.

### Community 2196 - "Community 2196"
Cohesion: 1.0
Nodes (1): Should re-raise database errors after logging.

### Community 2197 - "Community 2197"
Cohesion: 1.0
Nodes (1): Should work when password is not provided.

### Community 2198 - "Community 2198"
Cohesion: 1.0
Nodes (1): Create an in-memory SQLite database for testing.

### Community 2199 - "Community 2199"
Cohesion: 1.0
Nodes (1): Create a database session for testing.

### Community 2200 - "Community 2200"
Cohesion: 1.0
Nodes (1): Create a database with research_resources missing document_id.          This s

### Community 2201 - "Community 2201"
Cohesion: 1.0
Nodes (1): Create an in-memory SQLite database for testing.

### Community 2202 - "Community 2202"
Cohesion: 1.0
Nodes (1): Create a database session for testing.

### Community 2203 - "Community 2203"
Cohesion: 1.0
Nodes (1): Create an in-memory SQLite database for testing.

### Community 2204 - "Community 2204"
Cohesion: 1.0
Nodes (1): Create a database session for testing.

### Community 2205 - "Community 2205"
Cohesion: 1.0
Nodes (1): Create an in-memory SQLite database for testing.

### Community 2206 - "Community 2206"
Cohesion: 1.0
Nodes (1): Create a database session for testing.

### Community 2207 - "Community 2207"
Cohesion: 1.0
Nodes (1): Test getting sentence splitter.

### Community 2208 - "Community 2208"
Cohesion: 1.0
Nodes (1): Test sentence splitter with custom parameters.

### Community 2209 - "Community 2209"
Cohesion: 1.0
Nodes (1): breakpoint_threshold_amount=0 is forwarded (not treated as None).

### Community 2210 - "Community 2210"
Cohesion: 1.0
Nodes (1): Mock Wikipedia API response.

### Community 2211 - "Community 2211"
Cohesion: 1.0
Nodes (1): Mock arXiv XML response.

### Community 2212 - "Community 2212"
Cohesion: 1.0
Nodes (1): Mock PubMed search response.

### Community 2213 - "Community 2213"
Cohesion: 1.0
Nodes (1): Mock PubMed article detail.

### Community 2214 - "Community 2214"
Cohesion: 1.0
Nodes (1): Mock Semantic Scholar API response.

### Community 2215 - "Community 2215"
Cohesion: 1.0
Nodes (1): Mock Google Programmable Search Engine response.

### Community 2216 - "Community 2216"
Cohesion: 1.0
Nodes (1): Mock DuckDuckGo search response.

### Community 2217 - "Community 2217"
Cohesion: 1.0
Nodes (1): Collection of error responses for testing error handling.

### Community 2218 - "Community 2218"
Cohesion: 1.0
Nodes (1): Test that frontend_progress_sink properly handles MILESTONE logs

### Community 2219 - "Community 2219"
Cohesion: 1.0
Nodes (1): Test that remove_think_tags never crashes on arbitrary input.

### Community 2220 - "Community 2220"
Cohesion: 1.0
Nodes (1): Test that think tags are properly removed.

### Community 2221 - "Community 2221"
Cohesion: 1.0
Nodes (1): Test that extract_links_from_search_results handles arbitrary dicts.

### Community 2222 - "Community 2222"
Cohesion: 1.0
Nodes (1): Test that format_links_to_markdown handles arbitrary link data.

### Community 2223 - "Community 2223"
Cohesion: 1.0
Nodes (1): Test that empty input returns empty list.

### Community 2224 - "Community 2224"
Cohesion: 1.0
Nodes (1): Test that None input returns empty list.

### Community 2225 - "Community 2225"
Cohesion: 1.0
Nodes (1): Test handling of dicts with missing expected keys.

### Community 2226 - "Community 2226"
Cohesion: 1.0
Nodes (0): 

### Community 2227 - "Community 2227"
Cohesion: 1.0
Nodes (1): Load the JavaScript URLs configuration file

### Community 2228 - "Community 2228"
Cohesion: 1.0
Nodes (0): 

### Community 2229 - "Community 2229"
Cohesion: 1.0
Nodes (0): 

### Community 2230 - "Community 2230"
Cohesion: 1.0
Nodes (0): 

### Community 2231 - "Community 2231"
Cohesion: 1.0
Nodes (0): 

### Community 2232 - "Community 2232"
Cohesion: 1.0
Nodes (0): 

### Community 2233 - "Community 2233"
Cohesion: 1.0
Nodes (0): 

### Community 2234 - "Community 2234"
Cohesion: 1.0
Nodes (0): 

### Community 2235 - "Community 2235"
Cohesion: 1.0
Nodes (0): 

### Community 2236 - "Community 2236"
Cohesion: 1.0
Nodes (0): 

### Community 2237 - "Community 2237"
Cohesion: 1.0
Nodes (0): 

### Community 2238 - "Community 2238"
Cohesion: 1.0
Nodes (0): 

### Community 2239 - "Community 2239"
Cohesion: 1.0
Nodes (0): 

### Community 2240 - "Community 2240"
Cohesion: 1.0
Nodes (0): 

### Community 2241 - "Community 2241"
Cohesion: 1.0
Nodes (0): 

### Community 2242 - "Community 2242"
Cohesion: 1.0
Nodes (0): 

### Community 2243 - "Community 2243"
Cohesion: 1.0
Nodes (0): 

### Community 2244 - "Community 2244"
Cohesion: 1.0
Nodes (0): 

### Community 2245 - "Community 2245"
Cohesion: 1.0
Nodes (1): Create settings snapshot for testing.

### Community 2246 - "Community 2246"
Cohesion: 1.0
Nodes (1): Return identifier of llm.

### Community 2247 - "Community 2247"
Cohesion: 1.0
Nodes (1): Create a mock database session.

### Community 2248 - "Community 2248"
Cohesion: 1.0
Nodes (1): Create a settings snapshot for testing.

### Community 2249 - "Community 2249"
Cohesion: 1.0
Nodes (1): Test that init_database() disposes engine even on success.

### Community 2250 - "Community 2250"
Cohesion: 1.0
Nodes (1): Test that init_database() disposes engine when create_all fails.

### Community 2251 - "Community 2251"
Cohesion: 1.0
Nodes (1): Test that init_database() calls Base.metadata.create_all().

### Community 2252 - "Community 2252"
Cohesion: 1.0
Nodes (1): Test that verify_table_exists() disposes engine when table is missing.

### Community 2253 - "Community 2253"
Cohesion: 1.0
Nodes (1): Test that verify_table_exists() disposes engine on inspect error.

### Community 2254 - "Community 2254"
Cohesion: 1.0
Nodes (1): Test that verify_table_exists() disposes engine on get_table_names error.

### Community 2255 - "Community 2255"
Cohesion: 1.0
Nodes (1): Test that verify_table_exists() uses SQLAlchemy inspect().

### Community 2256 - "Community 2256"
Cohesion: 1.0
Nodes (1): Test behavior at daily limit boundary (exactly 3 retries)

### Community 2257 - "Community 2257"
Cohesion: 1.0
Nodes (1): Test handling of None retry counts (legacy data)

### Community 2258 - "Community 2258"
Cohesion: 1.0
Nodes (1): Test that headline is generated when LLM succeeds.

### Community 2259 - "Community 2259"
Cohesion: 1.0
Nodes (1): Test that quotes are stripped from generated headline.

### Community 2260 - "Community 2260"
Cohesion: 1.0
Nodes (1): Test that empty findings returns failure message.

### Community 2261 - "Community 2261"
Cohesion: 1.0
Nodes (1): Test that LLM exception results in failure message.

### Community 2262 - "Community 2262"
Cohesion: 1.0
Nodes (1): Test that empty LLM response returns failure message.

### Community 2263 - "Community 2263"
Cohesion: 1.0
Nodes (1): Test that LLM is called with low temperature for consistency.

### Community 2264 - "Community 2264"
Cohesion: 1.0
Nodes (1): Test that prompt includes the findings content.

### Community 2265 - "Community 2265"
Cohesion: 1.0
Nodes (1): Test that missing findings returns None.

### Community 2266 - "Community 2266"
Cohesion: 1.0
Nodes (1): Test that punctuation is stripped from headline ends.

### Community 2267 - "Community 2267"
Cohesion: 1.0
Nodes (1): Test returns LLM-generated headline when successful.

### Community 2268 - "Community 2268"
Cohesion: 1.0
Nodes (1): Test returns failure message when LLM fails.

### Community 2269 - "Community 2269"
Cohesion: 1.0
Nodes (1): Test passes query to LLM generator.

### Community 2270 - "Community 2270"
Cohesion: 1.0
Nodes (1): Test passes findings to LLM generator.

### Community 2271 - "Community 2271"
Cohesion: 1.0
Nodes (1): Test passes max_length to LLM generator.

### Community 2272 - "Community 2272"
Cohesion: 1.0
Nodes (1): Test default max_length is 100.

### Community 2273 - "Community 2273"
Cohesion: 1.0
Nodes (1): Test empty findings is allowed.

### Community 2274 - "Community 2274"
Cohesion: 1.0
Nodes (1): Test handles unicode characters in query.

### Community 2275 - "Community 2275"
Cohesion: 1.0
Nodes (1): Test handles unicode characters in findings.

### Community 2276 - "Community 2276"
Cohesion: 1.0
Nodes (1): Test handles very long query string.

### Community 2277 - "Community 2277"
Cohesion: 1.0
Nodes (1): Test handles newlines in findings.

### Community 2278 - "Community 2278"
Cohesion: 1.0
Nodes (1): Test handles special characters in findings.

### Community 2279 - "Community 2279"
Cohesion: 1.0
Nodes (1): Test that LLM topics are returned when generation succeeds.

### Community 2280 - "Community 2280"
Cohesion: 1.0
Nodes (1): Test that failure message is returned when LLM fails.

### Community 2281 - "Community 2281"
Cohesion: 1.0
Nodes (1): Test parsing of JSON array from LLM.

### Community 2282 - "Community 2282"
Cohesion: 1.0
Nodes (1): Test handling of JSON wrapped in markdown code block.

### Community 2283 - "Community 2283"
Cohesion: 1.0
Nodes (1): Test fallback parsing of comma-separated topics.

### Community 2284 - "Community 2284"
Cohesion: 1.0
Nodes (1): Test that max_topics limit is respected.

### Community 2285 - "Community 2285"
Cohesion: 1.0
Nodes (1): Test that topics longer than 30 chars are filtered.

### Community 2286 - "Community 2286"
Cohesion: 1.0
Nodes (1): Test graceful handling of LLM exceptions.

### Community 2287 - "Community 2287"
Cohesion: 1.0
Nodes (1): Test that medium temperature is used for topic diversity.

### Community 2288 - "Community 2288"
Cohesion: 1.0
Nodes (1): Test that long queries are truncated in prompt.

### Community 2289 - "Community 2289"
Cohesion: 1.0
Nodes (1): Test returns validated topics from LLM.

### Community 2290 - "Community 2290"
Cohesion: 1.0
Nodes (1): Test returns failure marker when LLM returns empty.

### Community 2291 - "Community 2291"
Cohesion: 1.0
Nodes (1): Test passes max_topics to validator.

### Community 2292 - "Community 2292"
Cohesion: 1.0
Nodes (1): Test default max_topics is 5.

### Community 2293 - "Community 2293"
Cohesion: 1.0
Nodes (1): Test passes category to LLM generator.

### Community 2294 - "Community 2294"
Cohesion: 1.0
Nodes (1): Test handles unicode characters in topics.

### Community 2295 - "Community 2295"
Cohesion: 1.0
Nodes (1): Test handles zero max_topics.

### Community 2296 - "Community 2296"
Cohesion: 1.0
Nodes (1): Test news_page renders correct template.

### Community 2297 - "Community 2297"
Cohesion: 1.0
Nodes (1): Test news_page passes strategies to template.

### Community 2298 - "Community 2298"
Cohesion: 1.0
Nodes (1): Test news_page includes expected default strategies.

### Community 2299 - "Community 2299"
Cohesion: 1.0
Nodes (1): Test subscriptions_page renders correct template.

### Community 2300 - "Community 2300"
Cohesion: 1.0
Nodes (1): Test new_subscription_page renders correct template.

### Community 2301 - "Community 2301"
Cohesion: 1.0
Nodes (1): Test new_subscription_page passes default settings.

### Community 2302 - "Community 2302"
Cohesion: 1.0
Nodes (1): Test new_subscription_page passes None for subscription.

### Community 2303 - "Community 2303"
Cohesion: 1.0
Nodes (1): Test edit_subscription_page loads subscription data.

### Community 2304 - "Community 2304"
Cohesion: 1.0
Nodes (1): Test edit_subscription_page passes subscription to template.

### Community 2305 - "Community 2305"
Cohesion: 1.0
Nodes (1): Test edit_subscription_page handles subscription not found.

### Community 2306 - "Community 2306"
Cohesion: 1.0
Nodes (1): Test edit_subscription_page handles exception.

### Community 2307 - "Community 2307"
Cohesion: 1.0
Nodes (0): 

### Community 2308 - "Community 2308"
Cohesion: 1.0
Nodes (0): 

### Community 2309 - "Community 2309"
Cohesion: 1.0
Nodes (1): Create a test Flask app with the scheduler blueprint.

### Community 2310 - "Community 2310"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2311 - "Community 2311"
Cohesion: 1.0
Nodes (1): Test quick_summary with a single retriever.

### Community 2312 - "Community 2312"
Cohesion: 1.0
Nodes (1): Test quick_summary with multiple retrievers.

### Community 2313 - "Community 2313"
Cohesion: 1.0
Nodes (1): Test detailed_research with retrievers.

### Community 2314 - "Community 2314"
Cohesion: 1.0
Nodes (1): Test generate_report with retrievers.

### Community 2315 - "Community 2315"
Cohesion: 1.0
Nodes (1): Test that research_id is generated if not provided.

### Community 2316 - "Community 2316"
Cohesion: 1.0
Nodes (1): Register stub endpoints for `auth.login` and `settings.settings_page`         s

### Community 2317 - "Community 2317"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2318 - "Community 2318"
Cohesion: 1.0
Nodes (1): Test that users can only access their own objects.          BOLA/IDOR (Insecur

### Community 2319 - "Community 2319"
Cohesion: 1.0
Nodes (1): Test protection of sensitive business logic flows.          Examples:

### Community 2320 - "Community 2320"
Cohesion: 1.0
Nodes (1): Test API documentation and version management.          Issues:         - Und

### Community 2321 - "Community 2321"
Cohesion: 1.0
Nodes (1): Test secure consumption of external APIs.          LDR consumes external APIs:

### Community 2322 - "Community 2322"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2323 - "Community 2323"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2324 - "Community 2324"
Cohesion: 1.0
Nodes (1): Test that passwords are hashed using a secure algorithm.         LDR uses SQLCi

### Community 2325 - "Community 2325"
Cohesion: 1.0
Nodes (1): Test that password requirements are enforced (if applicable).

### Community 2326 - "Community 2326"
Cohesion: 1.0
Nodes (1): Test that passwords are never logged or exposed in errors.

### Community 2327 - "Community 2327"
Cohesion: 1.0
Nodes (1): Test that authentication timing is constant to prevent timing attacks.

### Community 2328 - "Community 2328"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2329 - "Community 2329"
Cohesion: 1.0
Nodes (1): Test that sessions expire appropriately.

### Community 2330 - "Community 2330"
Cohesion: 1.0
Nodes (1): Test that session ID is regenerated after login.

### Community 2331 - "Community 2331"
Cohesion: 1.0
Nodes (1): Test handling of concurrent sessions.

### Community 2332 - "Community 2332"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2333 - "Community 2333"
Cohesion: 1.0
Nodes (1): Test that @login_required decorator is used on protected routes.

### Community 2334 - "Community 2334"
Cohesion: 1.0
Nodes (1): Clarify difference between authentication and authorization.          Authenti

### Community 2335 - "Community 2335"
Cohesion: 1.0
Nodes (1): Test that users can only access their own data.

### Community 2336 - "Community 2336"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2337 - "Community 2337"
Cohesion: 1.0
Nodes (1): open_file_location must validate path via PathValidator.

### Community 2338 - "Community 2338"
Cohesion: 1.0
Nodes (1): open_file_location must use validated path parent, not raw input.

### Community 2339 - "Community 2339"
Cohesion: 1.0
Nodes (1): open_file_location returns False if PathValidator rejects path.

### Community 2340 - "Community 2340"
Cohesion: 1.0
Nodes (1): open_file_location blocks path traversal via PathValidator.

### Community 2341 - "Community 2341"
Cohesion: 1.0
Nodes (1): Wrap the root conftest app fixture with CSRF enabled.

### Community 2342 - "Community 2342"
Cohesion: 1.0
Nodes (1): Create a test Flask app instance.

### Community 2343 - "Community 2343"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2344 - "Community 2344"
Cohesion: 1.0
Nodes (1): Create a test client with CSRF disabled for comparison.

### Community 2345 - "Community 2345"
Cohesion: 1.0
Nodes (1): Test that CSRF tokens are not leaked in logs or URLs.

### Community 2346 - "Community 2346"
Cohesion: 1.0
Nodes (1): Document CSRF protection strategy for LDR.          CSRF Protection Mechanisms

### Community 2347 - "Community 2347"
Cohesion: 1.0
Nodes (1): Clarify difference between CSRF and CORS.          CSRF (Cross-Site Request Fo

### Community 2348 - "Community 2348"
Cohesion: 1.0
Nodes (1): Test that URL redirects are handled safely.

### Community 2349 - "Community 2349"
Cohesion: 1.0
Nodes (1): Document input validation best practices.          Defense in Depth - Input Va

### Community 2350 - "Community 2350"
Cohesion: 1.0
Nodes (1): Document common input validation mistakes to avoid.          Common Mistakes:

### Community 2351 - "Community 2351"
Cohesion: 1.0
Nodes (1): Load non-comment, non-empty lines from .file-whitelist.txt.

### Community 2352 - "Community 2352"
Cohesion: 1.0
Nodes (1): Load non-comment, non-empty lines from CODEOWNERS.

### Community 2353 - "Community 2353"
Cohesion: 1.0
Nodes (1): Document the SSRF protection security model.          WHY THIS EXISTS:

### Community 2354 - "Community 2354"
Cohesion: 1.0
Nodes (1): Well-known public IPv4 addresses are not blocked.

### Community 2355 - "Community 2355"
Cohesion: 1.0
Nodes (1): Public IPs remain unblocked when allow_localhost=True.

### Community 2356 - "Community 2356"
Cohesion: 1.0
Nodes (1): Public IPs remain unblocked when allow_private_ips=True.

### Community 2357 - "Community 2357"
Cohesion: 1.0
Nodes (1): Whitelisted module '{module_path}' can be imported.

### Community 2358 - "Community 2358"
Cohesion: 1.0
Nodes (1): Create a test Flask app instance.

### Community 2359 - "Community 2359"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2360 - "Community 2360"
Cohesion: 1.0
Nodes (1): Test prevention of DOM-based XSS through JavaScript.

### Community 2361 - "Community 2361"
Cohesion: 1.0
Nodes (1): Test that stored XSS (persistent XSS) is prevented.         User-submitted cont

### Community 2362 - "Community 2362"
Cohesion: 1.0
Nodes (1): Create a test client.

### Community 2363 - "Community 2363"
Cohesion: 1.0
Nodes (1): Test that various truthy string values convert to True.

### Community 2364 - "Community 2364"
Cohesion: 1.0
Nodes (1): Test that various falsy string values convert to False.

### Community 2365 - "Community 2365"
Cohesion: 1.0
Nodes (1): Test common environment variable values for true.

### Community 2366 - "Community 2366"
Cohesion: 1.0
Nodes (1): Test common environment variable values for false.

### Community 2367 - "Community 2367"
Cohesion: 1.0
Nodes (1): Clean environment before each test.

### Community 2368 - "Community 2368"
Cohesion: 1.0
Nodes (1): Clean environment before each test.

### Community 2369 - "Community 2369"
Cohesion: 1.0
Nodes (1): Clean environment before each test.

### Community 2370 - "Community 2370"
Cohesion: 1.0
Nodes (1): Clean environment before each test.

### Community 2371 - "Community 2371"
Cohesion: 1.0
Nodes (1): Clean environment before each test.

### Community 2372 - "Community 2372"
Cohesion: 1.0
Nodes (1): Clean environment before each test.

### Community 2373 - "Community 2373"
Cohesion: 1.0
Nodes (1): Test that 'unsafe' and 'raw' also map to 'none'.

### Community 2374 - "Community 2374"
Cohesion: 1.0
Nodes (1): Import the module for tests.

### Community 2375 - "Community 2375"
Cohesion: 1.0
Nodes (1): Import the module for tests.

### Community 2376 - "Community 2376"
Cohesion: 1.0
Nodes (1): Test that various env values map to correct log levels.

### Community 2377 - "Community 2377"
Cohesion: 1.0
Nodes (1): Import the module for tests.

### Community 2378 - "Community 2378"
Cohesion: 1.0
Nodes (1): Test strategy with empty query string.

### Community 2379 - "Community 2379"
Cohesion: 1.0
Nodes (1): Test strategy with whitespace-only query.

### Community 2380 - "Community 2380"
Cohesion: 1.0
Nodes (1): Test strategy with very long query.

### Community 2381 - "Community 2381"
Cohesion: 1.0
Nodes (1): Test strategy with unicode characters.

### Community 2382 - "Community 2382"
Cohesion: 1.0
Nodes (1): Test strategy with special characters.

### Community 2383 - "Community 2383"
Cohesion: 1.0
Nodes (1): Test when LLM returns empty response.

### Community 2384 - "Community 2384"
Cohesion: 1.0
Nodes (1): Test when LLM returns None.

### Community 2385 - "Community 2385"
Cohesion: 1.0
Nodes (1): Test when LLM raises an exception.

### Community 2386 - "Community 2386"
Cohesion: 1.0
Nodes (1): Test when search returns empty list.

### Community 2387 - "Community 2387"
Cohesion: 1.0
Nodes (1): Test when search returns None.

### Community 2388 - "Community 2388"
Cohesion: 1.0
Nodes (1): Test when search raises exception.

### Community 2389 - "Community 2389"
Cohesion: 1.0
Nodes (1): Test with search results missing expected fields.

### Community 2390 - "Community 2390"
Cohesion: 1.0
Nodes (1): Test with search results containing None values.

### Community 2391 - "Community 2391"
Cohesion: 1.0
Nodes (1): Test that callback receives valid progress values.

### Community 2392 - "Community 2392"
Cohesion: 1.0
Nodes (1): Test that exception in callback doesn't crash strategy.

### Community 2393 - "Community 2393"
Cohesion: 1.0
Nodes (1): Test multiple analyze_topic calls on same strategy instance.

### Community 2394 - "Community 2394"
Cohesion: 1.0
Nodes (1): Test that constrained strategies can analyze topics.

### Community 2395 - "Community 2395"
Cohesion: 1.0
Nodes (1): Test that dual confidence strategies work.

### Community 2396 - "Community 2396"
Cohesion: 1.0
Nodes (1): Test that modular strategies work.

### Community 2397 - "Community 2397"
Cohesion: 1.0
Nodes (1): Test getting formatter with number hyperlinks mode.

### Community 2398 - "Community 2398"
Cohesion: 1.0
Nodes (1): Test getting formatter with domain hyperlinks mode.

### Community 2399 - "Community 2399"
Cohesion: 1.0
Nodes (1): Test getting formatter with no hyperlinks mode.

### Community 2400 - "Community 2400"
Cohesion: 1.0
Nodes (1): Test getting formatter with invalid mode falls back to default.

### Community 2401 - "Community 2401"
Cohesion: 1.0
Nodes (1): Test citation formatting with real-world example.

### Community 2402 - "Community 2402"
Cohesion: 1.0
Nodes (1): Test automatic export to multiple formats based on settings.

### Community 2403 - "Community 2403"
Cohesion: 1.0
Nodes (1): Load or generate themes.css content.

### Community 2404 - "Community 2404"
Cohesion: 1.0
Nodes (1): Check each theme defines all required variables.

### Community 2405 - "Community 2405"
Cohesion: 1.0
Nodes (1): Check each theme defines RGB variants.

### Community 2406 - "Community 2406"
Cohesion: 1.0
Nodes (1): Check if a theme is a light theme based on name patterns.

### Community 2407 - "Community 2407"
Cohesion: 1.0
Nodes (1): Load themes.css content.

### Community 2408 - "Community 2408"
Cohesion: 1.0
Nodes (1): Dark themes should have low luminance backgrounds.

### Community 2409 - "Community 2409"
Cohesion: 1.0
Nodes (1): Light themes should have high luminance backgrounds.

### Community 2410 - "Community 2410"
Cohesion: 1.0
Nodes (1): Load themes.css content.

### Community 2411 - "Community 2411"
Cohesion: 1.0
Nodes (1): Check that critical CSS files use theme variables.

### Community 2412 - "Community 2412"
Cohesion: 1.0
Nodes (1): Load all CSS files content.

### Community 2413 - "Community 2413"
Cohesion: 1.0
Nodes (1): Load themes.css content.

### Community 2414 - "Community 2414"
Cohesion: 1.0
Nodes (1): Load themes.css content.

### Community 2415 - "Community 2415"
Cohesion: 1.0
Nodes (1): Load themes.css content.

### Community 2416 - "Community 2416"
Cohesion: 1.0
Nodes (1): Load themes.css content.

### Community 2417 - "Community 2417"
Cohesion: 1.0
Nodes (1): Load themes.css content.

### Community 2418 - "Community 2418"
Cohesion: 1.0
Nodes (0): 

### Community 2419 - "Community 2419"
Cohesion: 1.0
Nodes (0): 

### Community 2420 - "Community 2420"
Cohesion: 1.0
Nodes (0): 

### Community 2421 - "Community 2421"
Cohesion: 1.0
Nodes (0): 

### Community 2422 - "Community 2422"
Cohesion: 1.0
Nodes (0): 

### Community 2423 - "Community 2423"
Cohesion: 1.0
Nodes (0): 

### Community 2424 - "Community 2424"
Cohesion: 1.0
Nodes (0): 

### Community 2425 - "Community 2425"
Cohesion: 1.0
Nodes (0): 

### Community 2426 - "Community 2426"
Cohesion: 1.0
Nodes (0): 

### Community 2427 - "Community 2427"
Cohesion: 1.0
Nodes (0): 

### Community 2428 - "Community 2428"
Cohesion: 1.0
Nodes (0): 

### Community 2429 - "Community 2429"
Cohesion: 1.0
Nodes (0): 

### Community 2430 - "Community 2430"
Cohesion: 1.0
Nodes (0): 

### Community 2431 - "Community 2431"
Cohesion: 1.0
Nodes (0): 

### Community 2432 - "Community 2432"
Cohesion: 1.0
Nodes (0): 

### Community 2433 - "Community 2433"
Cohesion: 1.0
Nodes (0): 

### Community 2434 - "Community 2434"
Cohesion: 1.0
Nodes (0): 

### Community 2435 - "Community 2435"
Cohesion: 1.0
Nodes (0): 

### Community 2436 - "Community 2436"
Cohesion: 1.0
Nodes (0): 

### Community 2437 - "Community 2437"
Cohesion: 1.0
Nodes (0): 

### Community 2438 - "Community 2438"
Cohesion: 1.0
Nodes (0): 

### Community 2439 - "Community 2439"
Cohesion: 1.0
Nodes (0): 

### Community 2440 - "Community 2440"
Cohesion: 1.0
Nodes (0): 

### Community 2441 - "Community 2441"
Cohesion: 1.0
Nodes (0): 

### Community 2442 - "Community 2442"
Cohesion: 1.0
Nodes (0): 

### Community 2443 - "Community 2443"
Cohesion: 1.0
Nodes (0): 

### Community 2444 - "Community 2444"
Cohesion: 1.0
Nodes (0): 

### Community 2445 - "Community 2445"
Cohesion: 1.0
Nodes (0): 

### Community 2446 - "Community 2446"
Cohesion: 1.0
Nodes (0): 

### Community 2447 - "Community 2447"
Cohesion: 1.0
Nodes (0): 

### Community 2448 - "Community 2448"
Cohesion: 1.0
Nodes (0): 

### Community 2449 - "Community 2449"
Cohesion: 1.0
Nodes (0): 

### Community 2450 - "Community 2450"
Cohesion: 1.0
Nodes (0): 

### Community 2451 - "Community 2451"
Cohesion: 1.0
Nodes (0): 

### Community 2452 - "Community 2452"
Cohesion: 1.0
Nodes (1): The user-facing regression. Before the fix, calling         ``_close_base_llm``

### Community 2453 - "Community 2453"
Cohesion: 1.0
Nodes (1): If the resolved URL is None/empty, fall back to localhost.

### Community 2454 - "Community 2454"
Cohesion: 1.0
Nodes (1): Whitespace around truthy strings should be stripped.

### Community 2455 - "Community 2455"
Cohesion: 1.0
Nodes (1): Only exact matches (after strip+lower) should be truthy.

### Community 2456 - "Community 2456"
Cohesion: 1.0
Nodes (1): Only '1' is truthy; other numeric strings are not.

### Community 2457 - "Community 2457"
Cohesion: 1.0
Nodes (1): Quotes around truthy values should NOT match.

### Community 2458 - "Community 2458"
Cohesion: 1.0
Nodes (1): Should return a dict.

### Community 2459 - "Community 2459"
Cohesion: 1.0
Nodes (1): Should contain all expected configuration keys.

### Community 2460 - "Community 2460"
Cohesion: 1.0
Nodes (1): Default host should be 0.0.0.0.

### Community 2461 - "Community 2461"
Cohesion: 1.0
Nodes (1): Default port should be 5000.

### Community 2462 - "Community 2462"
Cohesion: 1.0
Nodes (1): Default debug should be False.

### Community 2463 - "Community 2463"
Cohesion: 1.0
Nodes (1): Default use_https should be True.

### Community 2464 - "Community 2464"
Cohesion: 1.0
Nodes (1): Default allow_registrations should be True.

### Community 2465 - "Community 2465"
Cohesion: 1.0
Nodes (1): Default rate_limit_default value.

### Community 2466 - "Community 2466"
Cohesion: 1.0
Nodes (1): Default rate_limit_login value.

### Community 2467 - "Community 2467"
Cohesion: 1.0
Nodes (1): Default rate_limit_registration value.

### Community 2468 - "Community 2468"
Cohesion: 1.0
Nodes (1): Default rate_limit_settings value.

### Community 2469 - "Community 2469"
Cohesion: 1.0
Nodes (1): Default rate_limit_upload_user value.

### Community 2470 - "Community 2470"
Cohesion: 1.0
Nodes (1): Default rate_limit_upload_ip value.

### Community 2471 - "Community 2471"
Cohesion: 1.0
Nodes (1): Should return all defaults when no environment variables are set.

### Community 2472 - "Community 2472"
Cohesion: 1.0
Nodes (1): Recognized boolean env-var values should NOT trigger fail-closed override.

### Community 2473 - "Community 2473"
Cohesion: 1.0
Nodes (1): Unrecognized env-var value should force allow_registrations=False.

### Community 2474 - "Community 2474"
Cohesion: 1.0
Nodes (1): Should log a warning for unrecognized env-var value.

### Community 2475 - "Community 2475"
Cohesion: 1.0
Nodes (1): When env var is not set, allow_registrations should use default value.

### Community 2476 - "Community 2476"
Cohesion: 1.0
Nodes (1): Empty-string env var should trigger fail-closed (registrations=False).

### Community 2477 - "Community 2477"
Cohesion: 1.0
Nodes (1): Security-critical: allow_registrations=false from legacy file must be honored.

### Community 2478 - "Community 2478"
Cohesion: 1.0
Nodes (1): Env var should take priority over legacy file value.          We use _env_type

### Community 2479 - "Community 2479"
Cohesion: 1.0
Nodes (1): Without a legacy file, defaults should be returned.

### Community 2480 - "Community 2480"
Cohesion: 1.0
Nodes (1): Corrupt JSON should log a warning and return defaults.

### Community 2481 - "Community 2481"
Cohesion: 1.0
Nodes (1): Invalid UTF-8 bytes should log a warning and return defaults.

### Community 2482 - "Community 2482"
Cohesion: 1.0
Nodes (1): Non-dict JSON (e.g. array) should log a warning and return defaults.

### Community 2483 - "Community 2483"
Cohesion: 1.0
Nodes (1): Partial legacy file: port from file, rest defaults.

### Community 2484 - "Community 2484"
Cohesion: 1.0
Nodes (1): Security warning with 'SECURITY' should be logged for allow_registrations.

### Community 2485 - "Community 2485"
Cohesion: 1.0
Nodes (1): Non-security settings should log at info level, not warning.

### Community 2486 - "Community 2486"
Cohesion: 1.0
Nodes (1): Unrecognized keys in legacy file produce a warning listing them.

### Community 2487 - "Community 2487"
Cohesion: 1.0
Nodes (1): Empty dict {} should produce no warnings and return defaults.

### Community 2488 - "Community 2488"
Cohesion: 1.0
Nodes (1): Info banner should be logged when recognized keys are present.

### Community 2489 - "Community 2489"
Cohesion: 1.0
Nodes (1): Legacy file with all default values should not produce per-key messages.

### Community 2490 - "Community 2490"
Cohesion: 1.0
Nodes (1): Legacy JSON 'allow_registrations': 'disabled' should fail closed.

### Community 2491 - "Community 2491"
Cohesion: 1.0
Nodes (1): Truthy recognized strings should NOT be overridden by the guard.

### Community 2492 - "Community 2492"
Cohesion: 1.0
Nodes (1): Falsy recognized strings — guard should not override.

### Community 2493 - "Community 2493"
Cohesion: 1.0
Nodes (1): Native JSON bool should not trigger the string guard.

### Community 2494 - "Community 2494"
Cohesion: 1.0
Nodes (1): When both env var and legacy JSON have bad values, the env var guard fires.

### Community 2495 - "Community 2495"
Cohesion: 1.0
Nodes (1): Ensure the 1% random sampling gate always passes so tests         exercise the

### Community 2496 - "Community 2496"
Cohesion: 1.0
Nodes (1): period='all' → days=None → no time filter applied.

### Community 2497 - "Community 2497"
Cohesion: 1.0
Nodes (1): Unknown period string falls back to 30 days.

### Community 2498 - "Community 2498"
Cohesion: 1.0
Nodes (1): Any exception → returns zero-count fallback dict.

### Community 2499 - "Community 2499"
Cohesion: 1.0
Nodes (1): Build a MagicMock refDB whose .get_journals_page echoes the         per_page va

### Community 2500 - "Community 2500"
Cohesion: 1.0
Nodes (1): When period='all', days is None so no time filter applied.

### Community 2501 - "Community 2501"
Cohesion: 1.0
Nodes (1): Tests the 'all' period branch where cutoff_time=0.

### Community 2502 - "Community 2502"
Cohesion: 1.0
Nodes (1): Resource with url=None should be skipped.

### Community 2503 - "Community 2503"
Cohesion: 1.0
Nodes (1): When getting user satisfaction raises an exception, it should fallback.

### Community 2504 - "Community 2504"
Cohesion: 1.0
Nodes (1): When record_count > 1000, it limits to 1000.

### Community 2505 - "Community 2505"
Cohesion: 1.0
Nodes (1): period='all' → days=None → no time filter.

### Community 2506 - "Community 2506"
Cohesion: 1.0
Nodes (1): When total_research is 0 after time filter, percentages should be 0.

### Community 2507 - "Community 2507"
Cohesion: 1.0
Nodes (1): Failures with error_type='RateLimitError' are counted as rate_limit_events.

### Community 2508 - "Community 2508"
Cohesion: 1.0
Nodes (1): estimate.success_rate > 0.8 → 'healthy'.

### Community 2509 - "Community 2509"
Cohesion: 1.0
Nodes (1): 0.5 < estimate.success_rate <= 0.8 → 'degraded'.

### Community 2510 - "Community 2510"
Cohesion: 1.0
Nodes (1): estimate.success_rate <= 0.5 → 'poor'.

### Community 2511 - "Community 2511"
Cohesion: 1.0
Nodes (1): No estimate → uses recent_success_rate with 80/50 thresholds.

### Community 2512 - "Community 2512"
Cohesion: 1.0
Nodes (1): period='all' → cutoff_time=0 → no time filter applied.

### Community 2513 - "Community 2513"
Cohesion: 1.0
Nodes (1): Ollama returns 200 with models list (new API format).

### Community 2514 - "Community 2514"
Cohesion: 1.0
Nodes (1): Ollama returns 200 with array (old API format).

### Community 2515 - "Community 2515"
Cohesion: 1.0
Nodes (1): Ollama returns 200 but invalid JSON.

### Community 2516 - "Community 2516"
Cohesion: 1.0
Nodes (1): Ollama returns non-200 status code.

### Community 2517 - "Community 2517"
Cohesion: 1.0
Nodes (1): Ollama connection refused.

### Community 2518 - "Community 2518"
Cohesion: 1.0
Nodes (1): Ollama request times out.

### Community 2519 - "Community 2519"
Cohesion: 1.0
Nodes (1): Model exists in Ollama (new API format).

### Community 2520 - "Community 2520"
Cohesion: 1.0
Nodes (1): Model not found in Ollama.

### Community 2521 - "Community 2521"
Cohesion: 1.0
Nodes (1): Ollama has no models.

### Community 2522 - "Community 2522"
Cohesion: 1.0
Nodes (1): Model name comparison should be case-insensitive.

### Community 2523 - "Community 2523"
Cohesion: 1.0
Nodes (1): Model name from query parameter overrides config.

### Community 2524 - "Community 2524"
Cohesion: 1.0
Nodes (1): Ollama API returns non-200.

### Community 2525 - "Community 2525"
Cohesion: 1.0
Nodes (1): Ollama returns invalid JSON.

### Community 2526 - "Community 2526"
Cohesion: 1.0
Nodes (1): Test with old Ollama API format (plain array).

### Community 2527 - "Community 2527"
Cohesion: 1.0
Nodes (1): Simulate the date replacement logic from start_research.

### Community 2528 - "Community 2528"
Cohesion: 1.0
Nodes (1): Value '[' is detected as corrupted; search.tool gets default 'auto'.

### Community 2529 - "Community 2529"
Cohesion: 1.0
Nodes (1): Value '{}' is detected as corrupted; app.theme gets default 'dark'.

### Community 2530 - "Community 2530"
Cohesion: 1.0
Nodes (1): report.* keys with corrupted values get replaced with empty dict.

### Community 2531 - "Community 2531"
Cohesion: 1.0
Nodes (1): When create_or_update_setting returns None, a validation error is recorded.

### Community 2532 - "Community 2532"
Cohesion: 1.0
Nodes (1): A new setting with a list value gets ui_element 'textarea'.

### Community 2533 - "Community 2533"
Cohesion: 1.0
Nodes (1): Updating a warning-affecting key includes warnings in response.

### Community 2534 - "Community 2534"
Cohesion: 1.0
Nodes (1): PUT creates a new setting when key doesn't exist.

### Community 2535 - "Community 2535"
Cohesion: 1.0
Nodes (1): Update an existing editable setting.

### Community 2536 - "Community 2536"
Cohesion: 1.0
Nodes (1): Checkbox string value gets converted to bool.

### Community 2537 - "Community 2537"
Cohesion: 1.0
Nodes (1): Creating a new setting when key not in DB.

### Community 2538 - "Community 2538"
Cohesion: 1.0
Nodes (1): Creating a new setting that fails produces validation error.

### Community 2539 - "Community 2539"
Cohesion: 1.0
Nodes (1): Updating warning-affecting key includes warnings.

### Community 2540 - "Community 2540"
Cohesion: 1.0
Nodes (1): If favorites is not a list, it gets reset to empty list.

### Community 2541 - "Community 2541"
Cohesion: 1.0
Nodes (1): Bool value creates checkbox UI element.

### Community 2542 - "Community 2542"
Cohesion: 1.0
Nodes (1): Numeric value creates number UI element.

### Community 2543 - "Community 2543"
Cohesion: 1.0
Nodes (1): Dict value creates textarea UI element.

### Community 2544 - "Community 2544"
Cohesion: 1.0
Nodes (1): Database-prefixed key gets correct type.

### Community 2545 - "Community 2545"
Cohesion: 1.0
Nodes (1): Single boolean update uses enabled/disabled language.

### Community 2546 - "Community 2546"
Cohesion: 1.0
Nodes (1): Multiple updates use count message.

### Community 2547 - "Community 2547"
Cohesion: 1.0
Nodes (1): Unknown prefix is rejected by the namespace gate with 400.

### Community 2548 - "Community 2548"
Cohesion: 1.0
Nodes (1): Value '{' (single bracket) is detected as corrupted.

### Community 2549 - "Community 2549"
Cohesion: 1.0
Nodes (1): llm.temperature -> category=llm_parameters.

### Community 2550 - "Community 2550"
Cohesion: 1.0
Nodes (1): Response should only contain expected safe fields.

### Community 2551 - "Community 2551"
Cohesion: 1.0
Nodes (1): Test PDF generation from markdown

### Community 2552 - "Community 2552"
Cohesion: 1.0
Nodes (1): Test PDF generation with embedded images

### Community 2553 - "Community 2553"
Cohesion: 1.0
Nodes (1): Test PDF generation with tables

### Community 2554 - "Community 2554"
Cohesion: 1.0
Nodes (1): Test PDF generation with code blocks

### Community 2555 - "Community 2555"
Cohesion: 1.0
Nodes (1): Test PDF generation with math expressions

### Community 2556 - "Community 2556"
Cohesion: 1.0
Nodes (1): Test PDF generation with unicode content

### Community 2557 - "Community 2557"
Cohesion: 1.0
Nodes (1): Test PDF generation for large documents

### Community 2558 - "Community 2558"
Cohesion: 1.0
Nodes (1): Test PDF page layout settings

### Community 2559 - "Community 2559"
Cohesion: 1.0
Nodes (1): Test PDF headers and footers

### Community 2560 - "Community 2560"
Cohesion: 1.0
Nodes (1): Test PDF table of contents generation

### Community 2561 - "Community 2561"
Cohesion: 1.0
Nodes (1): Test PDF hyperlink preservation

### Community 2562 - "Community 2562"
Cohesion: 1.0
Nodes (1): Test PDF metadata embedding

### Community 2563 - "Community 2563"
Cohesion: 1.0
Nodes (1): Test error recovery during PDF generation

### Community 2564 - "Community 2564"
Cohesion: 1.0
Nodes (1): Test timeout handling during generation

### Community 2565 - "Community 2565"
Cohesion: 1.0
Nodes (1): Test text extraction from PDF

### Community 2566 - "Community 2566"
Cohesion: 1.0
Nodes (1): Test handling corrupted PDF

### Community 2567 - "Community 2567"
Cohesion: 1.0
Nodes (1): Test handling encrypted PDF

### Community 2568 - "Community 2568"
Cohesion: 1.0
Nodes (1): Test handling scanned (image-based) PDF

### Community 2569 - "Community 2569"
Cohesion: 1.0
Nodes (1): Test metadata extraction

### Community 2570 - "Community 2570"
Cohesion: 1.0
Nodes (1): Test image extraction from PDF

### Community 2571 - "Community 2571"
Cohesion: 1.0
Nodes (1): Test table extraction from PDF

### Community 2572 - "Community 2572"
Cohesion: 1.0
Nodes (1): Test streaming extraction for large PDFs

### Community 2573 - "Community 2573"
Cohesion: 1.0
Nodes (1): Test extracting specific pages

### Community 2574 - "Community 2574"
Cohesion: 1.0
Nodes (1): Test extraction timeout handling

### Community 2575 - "Community 2575"
Cohesion: 1.0
Nodes (1): Test markdown to HTML conversion

### Community 2576 - "Community 2576"
Cohesion: 1.0
Nodes (1): Test markdown extensions are applied

### Community 2577 - "Community 2577"
Cohesion: 1.0
Nodes (1): Test default CSS is generated

### Community 2578 - "Community 2578"
Cohesion: 1.0
Nodes (1): Test custom CSS is applied

### Community 2579 - "Community 2579"
Cohesion: 1.0
Nodes (1): Socket errors in cleanup should not raise.

### Community 2580 - "Community 2580"
Cohesion: 1.0
Nodes (1): Research exists in DB in_progress state, not in active dict -> suspend it.

### Community 2581 - "Community 2581"
Cohesion: 1.0
Nodes (1): number_hyperlinks' maps to CitationMode.NUMBER_HYPERLINKS.

### Community 2582 - "Community 2582"
Cohesion: 1.0
Nodes (1): domain_hyperlinks' maps to CitationMode.DOMAIN_HYPERLINKS.

### Community 2583 - "Community 2583"
Cohesion: 1.0
Nodes (1): no_hyperlinks' maps to CitationMode.NO_HYPERLINKS.

### Community 2584 - "Community 2584"
Cohesion: 1.0
Nodes (1): An unrecognised setting value falls back to NUMBER_HYPERLINKS.

### Community 2585 - "Community 2585"
Cohesion: 1.0
Nodes (1): When the setting returns its default, formatter uses NUMBER_HYPERLINKS.

### Community 2586 - "Community 2586"
Cohesion: 1.0
Nodes (1): The format string is lowered before being passed to get_exporter.

### Community 2587 - "Community 2587"
Cohesion: 1.0
Nodes (1): When ExporterRegistry.get_exporter returns None, ValueError is raised.

### Community 2588 - "Community 2588"
Cohesion: 1.0
Nodes (1): Successful export returns (content, filename, mimetype).

### Community 2589 - "Community 2589"
Cohesion: 1.0
Nodes (1): Mixed-case format strings are normalised before lookup.

### Community 2590 - "Community 2590"
Cohesion: 1.0
Nodes (1): Cleanup calls cleanup_research to remove from active dicts.

### Community 2591 - "Community 2591"
Cohesion: 1.0
Nodes (1): Cleanup notifies queue processor of completion.

### Community 2592 - "Community 2592"
Cohesion: 1.0
Nodes (1): Cleanup handles socket emit failure gracefully.

### Community 2593 - "Community 2593"
Cohesion: 1.0
Nodes (1): Cleanup handles database session properly.

### Community 2594 - "Community 2594"
Cohesion: 1.0
Nodes (1): Progress callbacks integrate with socket service.

### Community 2595 - "Community 2595"
Cohesion: 1.0
Nodes (1): Progress callbacks queue database updates.

### Community 2596 - "Community 2596"
Cohesion: 1.0
Nodes (1): Report generation completes successfully.

### Community 2597 - "Community 2597"
Cohesion: 1.0
Nodes (1): Report PDF export succeeds.

### Community 2598 - "Community 2598"
Cohesion: 1.0
Nodes (1): Report PDF export handles failure.

### Community 2599 - "Community 2599"
Cohesion: 1.0
Nodes (1): Report generation commits to database.

### Community 2600 - "Community 2600"
Cohesion: 1.0
Nodes (1): Report generation handles database commit failure.

### Community 2601 - "Community 2601"
Cohesion: 1.0
Nodes (1): Citation formatter handles domain_id_hyperlinks mode.

### Community 2602 - "Community 2602"
Cohesion: 1.0
Nodes (1): Citation formatter handles domain_id_always_hyperlinks mode.

### Community 2603 - "Community 2603"
Cohesion: 1.0
Nodes (1): Test authenticated socket connection

### Community 2604 - "Community 2604"
Cohesion: 1.0
Nodes (1): Test unauthenticated socket connection

### Community 2605 - "Community 2605"
Cohesion: 1.0
Nodes (1): Test cleanup on disconnect

### Community 2606 - "Community 2606"
Cohesion: 1.0
Nodes (1): Test reconnection handling

### Community 2607 - "Community 2607"
Cohesion: 1.0
Nodes (1): Test session binding to socket

### Community 2608 - "Community 2608"
Cohesion: 1.0
Nodes (1): Test namespace isolation

### Community 2609 - "Community 2609"
Cohesion: 1.0
Nodes (1): Test connection timeout handling

### Community 2610 - "Community 2610"
Cohesion: 1.0
Nodes (1): Test heartbeat/ping mechanism

### Community 2611 - "Community 2611"
Cohesion: 1.0
Nodes (1): Test max connections enforcement

### Community 2612 - "Community 2612"
Cohesion: 1.0
Nodes (1): Test connection metadata storage

### Community 2613 - "Community 2613"
Cohesion: 1.0
Nodes (1): Test rate limiting on connections

### Community 2614 - "Community 2614"
Cohesion: 1.0
Nodes (1): Test emitting to single subscriber

### Community 2615 - "Community 2615"
Cohesion: 1.0
Nodes (1): Test emitting to multiple subscribers

### Community 2616 - "Community 2616"
Cohesion: 1.0
Nodes (1): Test emitting to room

### Community 2617 - "Community 2617"
Cohesion: 1.0
Nodes (1): Test broadcast emission

### Community 2618 - "Community 2618"
Cohesion: 1.0
Nodes (1): Test emit with acknowledgment callback

### Community 2619 - "Community 2619"
Cohesion: 1.0
Nodes (1): Test emit with ack response

### Community 2620 - "Community 2620"
Cohesion: 1.0
Nodes (1): Test emitting binary data

### Community 2621 - "Community 2621"
Cohesion: 1.0
Nodes (1): Test emitting large payload

### Community 2622 - "Community 2622"
Cohesion: 1.0
Nodes (1): Test emission queue management

### Community 2623 - "Community 2623"
Cohesion: 1.0
Nodes (1): Test priority-based emission ordering

### Community 2624 - "Community 2624"
Cohesion: 1.0
Nodes (1): Test retry on emission failure

### Community 2625 - "Community 2625"
Cohesion: 1.0
Nodes (1): Test emission timeout handling

### Community 2626 - "Community 2626"
Cohesion: 1.0
Nodes (1): Test batch emission optimization

### Community 2627 - "Community 2627"
Cohesion: 1.0
Nodes (1): Test emission logging control

### Community 2628 - "Community 2628"
Cohesion: 1.0
Nodes (1): Test emission thread safety

### Community 2629 - "Community 2629"
Cohesion: 1.0
Nodes (1): Test handling lock contention

### Community 2630 - "Community 2630"
Cohesion: 1.0
Nodes (1): Test handling subscriber errors

### Community 2631 - "Community 2631"
Cohesion: 1.0
Nodes (1): Test partial emission failure handling

### Community 2632 - "Community 2632"
Cohesion: 1.0
Nodes (1): Test emission metrics tracking

### Community 2633 - "Community 2633"
Cohesion: 1.0
Nodes (1): Test event filtering before emission

### Community 2634 - "Community 2634"
Cohesion: 1.0
Nodes (1): Test subscribing to research updates

### Community 2635 - "Community 2635"
Cohesion: 1.0
Nodes (1): Test unsubscribing from research

### Community 2636 - "Community 2636"
Cohesion: 1.0
Nodes (1): Test getting subscribers for research

### Community 2637 - "Community 2637"
Cohesion: 1.0
Nodes (1): Test singleton pattern is enforced

### Community 2638 - "Community 2638"
Cohesion: 1.0
Nodes (1): Should return dict containing search engine configs.

### Community 2639 - "Community 2639"
Cohesion: 1.0
Nodes (1): Should include 'auto' key in result.

### Community 2640 - "Community 2640"
Cohesion: 1.0
Nodes (1): Should add 'meta' as alias for 'auto'.

### Community 2641 - "Community 2641"
Cohesion: 1.0
Nodes (1): Should include registered retrievers as search engines.

### Community 2642 - "Community 2642"
Cohesion: 1.0
Nodes (1): Should add library search engine when enabled.

### Community 2643 - "Community 2643"
Cohesion: 1.0
Nodes (1): Should skip library search engine when disabled.

### Community 2644 - "Community 2644"
Cohesion: 1.0
Nodes (1): Should return configured default search engine.

### Community 2645 - "Community 2645"
Cohesion: 1.0
Nodes (1): Should return 'wikipedia' as default when not configured.

### Community 2646 - "Community 2646"
Cohesion: 1.0
Nodes (1): Should query the correct setting key.

### Community 2647 - "Community 2647"
Cohesion: 1.0
Nodes (1): Should pass db_session to _get_setting.

### Community 2648 - "Community 2648"
Cohesion: 1.0
Nodes (1): Should pass settings_snapshot to _get_setting.

### Community 2649 - "Community 2649"
Cohesion: 1.0
Nodes (1): Run the agent function and return its output.

### Community 2650 - "Community 2650"
Cohesion: 1.0
Nodes (1): Run the quickstart function and return its output.

### Community 2651 - "Community 2651"
Cohesion: 1.0
Nodes (0): 

### Community 2652 - "Community 2652"
Cohesion: 1.0
Nodes (1): Convert a PIL Image to base64 string for IPC.

### Community 2653 - "Community 2653"
Cohesion: 1.0
Nodes (1): Resolve a list of local dataset paths to concrete file paths.

### Community 2654 - "Community 2654"
Cohesion: 1.0
Nodes (1): Determine the HF datasets loader type from file extensions.

### Community 2655 - "Community 2655"
Cohesion: 1.0
Nodes (1): Compatibility shim for routes that access backend.trainer.*

### Community 2656 - "Community 2656"
Cohesion: 1.0
Nodes (1): Configure structured logging for the application.         Args:             serv

### Community 2657 - "Community 2657"
Cohesion: 1.0
Nodes (1): Accept legacy 'split' field as alias for 'train_split'.

### Community 2658 - "Community 2658"
Cohesion: 1.0
Nodes (1): POST /api/providers/test → success: true.

### Community 2659 - "Community 2659"
Cohesion: 1.0
Nodes (1): POST /api/providers/models → non-empty list, print first 3.

### Community 2660 - "Community 2660"
Cohesion: 1.0
Nodes (1): POST /v1/chat/completions with provider fields → streamed reply.

### Community 2661 - "Community 2661"
Cohesion: 1.0
Nodes (1): Image URL + text message → non-empty streamed reply.

### Community 2662 - "Community 2662"
Cohesion: 1.0
Nodes (1): Calling is_vision_model() twice for the same model should invoke         the unc

### Community 2663 - "Community 2663"
Cohesion: 1.0
Nodes (1): Different model names should each trigger detection.

### Community 2664 - "Community 2664"
Cohesion: 1.0
Nodes (1): The cached value must match what _is_vision_model_uncached returned.

### Community 2665 - "Community 2665"
Cohesion: 1.0
Nodes (1): Subprocess should only fire on the first call; second is cached.

### Community 2666 - "Community 2666"
Cohesion: 1.0
Nodes (1): A permanent failure (ValueError / RepositoryNotFoundError /         GatedRepoErr

### Community 2667 - "Community 2667"
Cohesion: 1.0
Nodes (1): A transient failure (OSError, timeouts) should return None from         _is_visi

### Community 2668 - "Community 2668"
Cohesion: 1.0
Nodes (1): A standard VLM detected via architecture suffix should be cached.

### Community 2669 - "Community 2669"
Cohesion: 1.0
Nodes (1): A standard text model (no VLM indicators) should cache False.

### Community 2670 - "Community 2670"
Cohesion: 1.0
Nodes (1): Models with vision_config (LLaVA, Qwen2-VL, etc.) should be cached as True.

### Community 2671 - "Community 2671"
Cohesion: 1.0
Nodes (1): Audio-only models (csm, whisper) with ForConditionalGeneration         should be

### Community 2672 - "Community 2672"
Cohesion: 1.0
Nodes (1): Calls with different tokens should trigger separate detections to         handle

### Community 2673 - "Community 2673"
Cohesion: 1.0
Nodes (1): Repeated calls with identical model + token should hit cache.

### Community 2674 - "Community 2674"
Cohesion: 1.0
Nodes (0): 

### Community 2675 - "Community 2675"
Cohesion: 1.0
Nodes (0): 

### Community 2676 - "Community 2676"
Cohesion: 1.0
Nodes (0): 

### Community 2677 - "Community 2677"
Cohesion: 1.0
Nodes (0): 

### Community 2678 - "Community 2678"
Cohesion: 1.0
Nodes (1): Extract cu* suffixes from the major/minor comparison chain in install.sh.

### Community 2679 - "Community 2679"
Cohesion: 1.0
Nodes (1): Extract cu* suffixes from the major/minor comparison chain in install.ps1.

### Community 2680 - "Community 2680"
Cohesion: 1.0
Nodes (1): Start the studio backend server without torch, yield (proc, port), then stop.

### Community 2681 - "Community 2681"
Cohesion: 1.0
Nodes (1): Skip if requirements files are missing.

### Community 2682 - "Community 2682"
Cohesion: 1.0
Nodes (0): 

### Community 2683 - "Community 2683"
Cohesion: 1.0
Nodes (0): 

### Community 2684 - "Community 2684"
Cohesion: 1.0
Nodes (1): NVIDIA host should NOT hit the ROCm path -- gets CPU asset (CUDA handled elsewhe

### Community 2685 - "Community 2685"
Cohesion: 1.0
Nodes (1): AMD ROCm Linux host should get the ROCm prebuilt.

### Community 2686 - "Community 2686"
Cohesion: 1.0
Nodes (1): CPU-only Linux host should get CPU asset.

### Community 2687 - "Community 2687"
Cohesion: 1.0
Nodes (1): macOS arm64 host should get macOS asset.

### Community 2688 - "Community 2688"
Cohesion: 1.0
Nodes (1): Windows CPU-only host should get Windows CPU asset.

### Community 2689 - "Community 2689"
Cohesion: 1.0
Nodes (1): Windows ROCm host should get Windows HIP asset.

### Community 2690 - "Community 2690"
Cohesion: 1.0
Nodes (1): Host with both NVIDIA and ROCm should use NVIDIA (CPU path here, CUDA elsewhere)

### Community 2691 - "Community 2691"
Cohesion: 1.0
Nodes (1): AMD ROCm host should fall back to source build when no ROCm prebuilt exists.

### Community 2692 - "Community 2692"
Cohesion: 1.0
Nodes (1): Windows+ROCm with HIP prebuilt missing should fall through to CPU.

### Community 2693 - "Community 2693"
Cohesion: 1.0
Nodes (1): macOS host should never have has_rocm=True in practice; verify it gets macOS ass

### Community 2694 - "Community 2694"
Cohesion: 1.0
Nodes (1): Linux aarch64 with ROCm -- no x86_64 match, should raise PrebuiltFallback.

### Community 2695 - "Community 2695"
Cohesion: 1.0
Nodes (1): No ROCm toolchain should skip entirely.

### Community 2696 - "Community 2696"
Cohesion: 1.0
Nodes (1): If torch already has CUDA, should skip ROCm reinstall.

### Community 2697 - "Community 2697"
Cohesion: 1.0
Nodes (1): If torch already has HIP, should skip ROCm reinstall.

### Community 2698 - "Community 2698"
Cohesion: 1.0
Nodes (1): CPU-only torch on ROCm host should trigger reinstall.

### Community 2699 - "Community 2699"
Cohesion: 1.0
Nodes (1): ROCm 6.3 should select rocm6.3 tag.

### Community 2700 - "Community 2700"
Cohesion: 1.0
Nodes (1): ROCm version too old (below 6.0) should skip.

### Community 2701 - "Community 2701"
Cohesion: 1.0
Nodes (1): ROCm detected but version unreadable should print warning and skip.

### Community 2702 - "Community 2702"
Cohesion: 1.0
Nodes (1): ROCm 7.2 should select rocm7.1 tag (capped, not in mapping).

### Community 2703 - "Community 2703"
Cohesion: 1.0
Nodes (1): Probe subprocess timeout should not crash; should proceed to reinstall.

### Community 2704 - "Community 2704"
Cohesion: 1.0
Nodes (1): ROCm tools present but no actual AMD GPU should skip entirely.

### Community 2705 - "Community 2705"
Cohesion: 1.0
Nodes (0): 

### Community 2706 - "Community 2706"
Cohesion: 1.0
Nodes (0): 

### Community 2707 - "Community 2707"
Cohesion: 1.0
Nodes (1): Compute the top-``rank`` orthogonal matrix via truncated SVD.          Args:

### Community 2708 - "Community 2708"
Cohesion: 1.0
Nodes (1): Pipe character triggers shell=True so bash can interpret it.

### Community 2709 - "Community 2709"
Cohesion: 1.0
Nodes (1): Simple commands (no shell operators) must NOT use shell=True.

### Community 2710 - "Community 2710"
Cohesion: 1.0
Nodes (1): && operator also triggers shell=True.

### Community 2711 - "Community 2711"
Cohesion: 1.0
Nodes (1): install_cli('jimeng') succeeds and invokes the pipe command via shell.

### Community 2712 - "Community 2712"
Cohesion: 1.0
Nodes (1): A non-zero exit from the curl|bash script surfaces as failure.

### Community 2713 - "Community 2713"
Cohesion: 1.0
Nodes (1): Uninstalling jimeng (no uninstall_cmd defined) returns a non-crash message.

### Community 2714 - "Community 2714"
Cohesion: 1.0
Nodes (1): After a successful install, jimeng appears in installed.json.

### Community 2715 - "Community 2715"
Cohesion: 1.0
Nodes (1): cli-install event name is static; CLI name lives in properties.cli.

### Community 2716 - "Community 2716"
Cohesion: 1.0
Nodes (1): cli-uninstall event name is static; CLI name lives in properties.cli.

### Community 2717 - "Community 2717"
Cohesion: 1.0
Nodes (1): cli-launch event fires with the CLI name in properties.

### Community 2718 - "Community 2718"
Cohesion: 1.0
Nodes (1): cli-hub call event sent when not detected as agent.

### Community 2719 - "Community 2719"
Cohesion: 1.0
Nodes (1): cli-hub call event captures the agent flag.

### Community 2720 - "Community 2720"
Cohesion: 1.0
Nodes (1): Clean env with a tty should not detect as agent.

### Community 2721 - "Community 2721"
Cohesion: 1.0
Nodes (1): First invocation sends cli-hub-installed event.

### Community 2722 - "Community 2722"
Cohesion: 1.0
Nodes (1): Second invocation does NOT send cli-hub-installed event.

### Community 2723 - "Community 2723"
Cohesion: 1.0
Nodes (1): When agent env detected, track_visit is called with the new cli-hub call metadat

### Community 2724 - "Community 2724"
Cohesion: 1.0
Nodes (1): Post-install output includes both entry point and cli-hub launch hint.

### Community 2725 - "Community 2725"
Cohesion: 1.0
Nodes (1): launch execs the CLI entry point, passing through extra args.

### Community 2726 - "Community 2726"
Cohesion: 1.0
Nodes (1): launch fails gracefully when entry point not on PATH.

### Community 2727 - "Community 2727"
Cohesion: 1.0
Nodes (1): launch with an unknown CLI name exits with error.

### Community 2728 - "Community 2728"
Cohesion: 1.0
Nodes (1): List all saved sessions.

### Community 2729 - "Community 2729"
Cohesion: 1.0
Nodes (1): Test --json project info via subprocess.

### Community 2730 - "Community 2730"
Cohesion: 1.0
Nodes (1): Test --json export pdf via subprocess.

### Community 2731 - "Community 2731"
Cohesion: 1.0
Nodes (1): Test --json transpose by-key via subprocess.

### Community 2732 - "Community 2732"
Cohesion: 1.0
Nodes (1): Execute a macro step.          Args:             step: The MacroStep definiti

### Community 2733 - "Community 2733"
Cohesion: 1.0
Nodes (1): Parse a condition dict like {file_exists: /tmp/out.png}.

### Community 2734 - "Community 2734"
Cohesion: 1.0
Nodes (1): Load a session from disk.

### Community 2735 - "Community 2735"
Cohesion: 1.0
Nodes (1): List all saved sessions (metadata only).

### Community 2736 - "Community 2736"
Cohesion: 1.0
Nodes (1): Load session metadata from disk.

### Community 2737 - "Community 2737"
Cohesion: 1.0
Nodes (1): List all saved sessions.

### Community 2738 - "Community 2738"
Cohesion: 1.0
Nodes (1): Build a minimal snapshot dict.

### Community 2739 - "Community 2739"
Cohesion: 1.0
Nodes (1): Load session metadata from disk.

### Community 2740 - "Community 2740"
Cohesion: 1.0
Nodes (1): List all saved sessions.

### Community 2741 - "Community 2741"
Cohesion: 1.0
Nodes (0): 

### Community 2742 - "Community 2742"
Cohesion: 1.0
Nodes (1): Test training a classification model.

### Community 2743 - "Community 2743"
Cohesion: 1.0
Nodes (1): Test training a regression model.

### Community 2744 - "Community 2744"
Cohesion: 1.0
Nodes (1): Test making predictions with a trained model.

### Community 2745 - "Community 2745"
Cohesion: 1.0
Nodes (1): Convert metrics (dict/list/numpy) to JSON-serializable format

### Community 2746 - "Community 2746"
Cohesion: 1.0
Nodes (1): Check if unimol_tools is available

### Community 2747 - "Community 2747"
Cohesion: 1.0
Nodes (1): Reset WireMock state before each test.

### Community 2748 - "Community 2748"
Cohesion: 1.0
Nodes (1): get_config_dir should force 700 permissions on POSIX.

### Community 2749 - "Community 2749"
Cohesion: 1.0
Nodes (1): save_tokens should force 600 on tokens.json on POSIX.

### Community 2750 - "Community 2750"
Cohesion: 1.0
Nodes (0): 

### Community 2751 - "Community 2751"
Cohesion: 1.0
Nodes (0): 

### Community 2752 - "Community 2752"
Cohesion: 1.0
Nodes (0): 

### Community 2753 - "Community 2753"
Cohesion: 1.0
Nodes (0): 

### Community 2754 - "Community 2754"
Cohesion: 1.0
Nodes (0): 

### Community 2755 - "Community 2755"
Cohesion: 1.0
Nodes (0): 

### Community 2756 - "Community 2756"
Cohesion: 1.0
Nodes (0): 

### Community 2757 - "Community 2757"
Cohesion: 1.0
Nodes (0): 

### Community 2758 - "Community 2758"
Cohesion: 1.0
Nodes (0): 

### Community 2759 - "Community 2759"
Cohesion: 1.0
Nodes (0): 

### Community 2760 - "Community 2760"
Cohesion: 1.0
Nodes (0): 

### Community 2761 - "Community 2761"
Cohesion: 1.0
Nodes (0): 

### Community 2762 - "Community 2762"
Cohesion: 1.0
Nodes (0): 

### Community 2763 - "Community 2763"
Cohesion: 1.0
Nodes (0): 

### Community 2764 - "Community 2764"
Cohesion: 1.0
Nodes (0): 

### Community 2765 - "Community 2765"
Cohesion: 1.0
Nodes (0): 

### Community 2766 - "Community 2766"
Cohesion: 1.0
Nodes (0): 

### Community 2767 - "Community 2767"
Cohesion: 1.0
Nodes (0): 

### Community 2768 - "Community 2768"
Cohesion: 1.0
Nodes (0): 

### Community 2769 - "Community 2769"
Cohesion: 1.0
Nodes (0): 

### Community 2770 - "Community 2770"
Cohesion: 1.0
Nodes (0): 

### Community 2771 - "Community 2771"
Cohesion: 1.0
Nodes (0): 

### Community 2772 - "Community 2772"
Cohesion: 1.0
Nodes (0): 

### Community 2773 - "Community 2773"
Cohesion: 1.0
Nodes (0): 

### Community 2774 - "Community 2774"
Cohesion: 1.0
Nodes (0): 

### Community 2775 - "Community 2775"
Cohesion: 1.0
Nodes (0): 

### Community 2776 - "Community 2776"
Cohesion: 1.0
Nodes (0): 

### Community 2777 - "Community 2777"
Cohesion: 1.0
Nodes (0): 

### Community 2778 - "Community 2778"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **19554 isolated node(s):** `Load all SeaBridgeAI graphify graph.json files into FalkorDB.  Multi-tenant: one`, `Make a relation string safe for a Cypher type name.`, `Load one repo's graph.json into FalkorDB as a named graph. Returns stats.`, `Smoke-test queries across the loaded FalkorDB graphs.  Confirms:   1. All 8 name`, `Reusable AST-only graphify build script.  Usage: run from the repo root whose gr` (+19549 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 1380`** (2 nodes): `source-context.ts`, `isExampleLikePath()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1381`** (2 nodes): `mcp-cve.ts`, `buildMaliciousFinding()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1382`** (2 nodes): `action-policy.test.ts`, `makeEvaluation()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1383`** (2 nodes): `injection.test.ts`, `makeTestResult()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1384`** (2 nodes): `transforms.test.ts`, `makeFinding()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1385`** (2 nodes): `init.test.ts`, `createTempDir()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1386`** (2 nodes): `html.test.ts`, `makeReport()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1387`** (2 nodes): `prompt-defense.test.ts`, `runPromptDefense()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1388`** (2 nodes): `discovery.test.ts`, `createTempDir()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1389`** (2 nodes): `health.test.ts`, `makeFile()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1390`** (2 nodes): `extract.test.ts`, `makeMcpConfig()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1391`** (2 nodes): `gsd-check-update-worker.js`, `isNewer()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1392`** (2 nodes): `gsd-check-update.js`, `detectConfigDir()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1393`** (2 nodes): `gsd-read-injection-scanner.js`, `isExcludedPath()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1394`** (2 nodes): `assembled-prompts.test.ts`, `assertNoBlockedPatterns()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1395`** (2 nodes): `context-truncation.test.ts`, `makeRoadmap()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1396`** (2 nodes): `gsd-tools.test.ts`, `createScript()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1397`** (2 nodes): `phase-runner-types.test.ts`, `createScript()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1398`** (2 nodes): `prompt-builder.test.ts`, `makePlan()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1399`** (2 nodes): `query-gsd-tools-runtime.ts`, `createGSDToolsRuntime()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1400`** (2 nodes): `research-gate.ts`, `checkResearchGate()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1401`** (2 nodes): `runtime-gate.ts`, `assertRuntimeSupportsAutoMode()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1402`** (2 nodes): `session-runner.test.ts`, `makeConfig()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1403`** (2 nodes): `tool-scoping.ts`, `getToolsForPhase()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1404`** (2 nodes): `workstream-utils.ts`, `relPlanningPath()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1405`** (2 nodes): `ws-flag.test.ts`, `createScript()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1406`** (2 nodes): `init-golden-normalize.ts`, `omitInitQuickVolatile()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1407`** (2 nodes): `read-only-golden-rows.ts`, `readOnlyGoldenCanonicals()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1408`** (2 nodes): `read-only-parity.integration.test.ts`, `strip()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1409`** (2 nodes): `registry-canonical-commands.ts`, `getCanonicalRegistryCommands()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1410`** (2 nodes): `command-definition.ts`, `byFamily()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1411`** (2 nodes): `command-seam-coverage.test.ts`, `subcommandFor()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1412`** (2 nodes): `commands-list.ts`, `commandsList()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1413`** (2 nodes): `config-gates.test.ts`, `cleanupTempDir()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1414`** (2 nodes): `config-schema.ts`, `isValidConfigKeyPath()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1415`** (2 nodes): `decomposed-handlers.test.ts`, `assertMilestoneSuccess()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1416`** (2 nodes): `fallow-audit.ts`, `normalizeFallowReport()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1417`** (2 nodes): `phase-lifecycle.test.ts`, `setupTestProject()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1418`** (2 nodes): `phase-ready.test.ts`, `writeMinimalRoadmap()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1419`** (2 nodes): `pipeline.test.ts`, `makeRegistry()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1420`** (2 nodes): `plan-task-structure.ts`, `planTaskStructure()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1421`** (2 nodes): `profile-sample.ts`, `runProfileSample()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1422`** (2 nodes): `query-dispatch-observability.ts`, `fallbackBridgeNotices()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1423`** (2 nodes): `query-fallback-executor.test.ts`, `createScript()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1424`** (2 nodes): `query-native-dispatch-adapter.ts`, `createQueryNativeDispatchAdapter()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1425`** (2 nodes): `query-runtime-context.ts`, `resolveQueryRuntimeContext()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1426`** (2 nodes): `registry-assembly.test.ts`, `noop()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1427`** (2 nodes): `registry.test.ts`, `handler()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1428`** (2 nodes): `roadmap-update-plan-progress.test.ts`, `setupProject()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1429`** (2 nodes): `state-mutation.test.ts`, `setupTestProject()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1430`** (2 nodes): `websearch.ts`, `websearch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1431`** (2 nodes): `builder.test.ts`, `minimalInputs()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1432`** (2 nodes): `vulture_whitelist.py`, `Vulture whitelist — items listed here are ignored during dead-code scanning.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1433`** (2 nodes): `show_env_vars.py`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1434`** (2 nodes): `database_settings.py`, `Database encryption and performance settings.  NOTE: Database settings have be`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1435`** (2 nodes): `user_base.py`, `Base class for user-specific models that should be stored in encrypted databases`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1436`** (2 nodes): `context-overflow-shared.js`, `renderTruncationBadge()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1437`** (2 nodes): `auth-validation.js`, `validatePasswordViaAPI()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1438`** (2 nodes): `safe-fetch.js`, `safeFetch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1439`** (2 nodes): `alert-helpers.js`, `mapAlertType()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1440`** (2 nodes): `sse-completion.js`, `handleSSECompletion()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1441`** (2 nodes): `test_ci_config.py`, `CI-specific test configuration for API tests. Sets up environment for tests to`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1442`** (2 nodes): `test_xss_protection.test.js`, `highlightText()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1443`** (2 nodes): `history-search.test.js`, `fakeCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1444`** (2 nodes): `urls.test.js`, `collectGroup()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1445`** (2 nodes): `delete-modules.test.js`, `flushPromises()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1446`** (2 nodes): `safe-logger.test.js`, `generateRandomString()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1447`** (2 nodes): `xss-protection.test.js`, `generatePayload()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1448`** (2 nodes): `help.test.js`, `createPanel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1449`** (2 nodes): `socket.test.js`, `createMockSocket()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1450`** (2 nodes): `test_news_api_debug.js`, `debugNewsAPI()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1451`** (2 nodes): `test_news_basic_functionality.js`, `runBasicNewsTests()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1452`** (2 nodes): `test_news_clean_content.js`, `testNewsCleanContent()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1453`** (2 nodes): `test_news_enhanced.js`, `testEnhancedNews()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1454`** (2 nodes): `test_news_error_debug.js`, `debugNewsError()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1455`** (2 nodes): `test_news_features.js`, `testNewsFeatures()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1456`** (2 nodes): `test_news_final.js`, `testNewsFinal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1457`** (2 nodes): `test_news_final_check.js`, `finalNewsCheck()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1458`** (2 nodes): `test_news_load_sequence.js`, `testLoadSequence()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1459`** (2 nodes): `test_news_no_cache.js`, `testNewsNoCache()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1460`** (2 nodes): `test_news_render_debug.js`, `debugNewsRendering()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1461`** (2 nodes): `test_news_screenshots.js`, `testNewsVisual()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1462`** (2 nodes): `test_news_status.js`, `checkNewsSystemStatus()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1463`** (2 nodes): `test_news_ui_debug.js`, `debugNewsUI()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1464`** (2 nodes): `test_news_visual_final.js`, `testNewsFinal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1465`** (2 nodes): `test_news_with_data.js`, `testNewsWithData()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1466`** (2 nodes): `test_deep_functionality.js`, `isCdpSessionFlake()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1467`** (2 nodes): `test_openai_api_key_ui.js`, `loginUser()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1468`** (2 nodes): `test_ui_functionality.js`, `logPageInfo()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1469`** (2 nodes): `check_api_directly.js`, `checkAPI()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1470`** (2 nodes): `check_available_models.js`, `checkAvailableModels()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1471`** (2 nodes): `check_chart_data.js`, `checkChartData()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1472`** (2 nodes): `DEBUG_metrics_thread_fix.js`, `testMetricsThreadFix()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1473`** (2 nodes): `DEBUG_mobile_debug.js`, `debugMobileUI()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1474`** (2 nodes): `DEBUG_news_features_fixed.js`, `testNewsFeatures()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1475`** (2 nodes): `DEBUG_settings_mobile_fix.js`, `testSettingsMobileFix()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1476`** (2 nodes): `NO_CI_executes_research_ajax_research_submission.js`, `submitResearchAjax()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1477`** (2 nodes): `NO_CI_executes_research_complete_workflow.js`, `testCompleteWorkflow()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1478`** (2 nodes): `NO_CI_executes_research_fixed_research.js`, `testFixedResearch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1479`** (2 nodes): `NO_CI_executes_research_followup_simple.js`, `testFollowupResearch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1480`** (2 nodes): `NO_CI_executes_research_full_research_completion.js`, `testCompleteResearch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1481`** (2 nodes): `NO_CI_executes_research_multiple_research.js`, `startResearch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1482`** (2 nodes): `NO_CI_executes_research_research_fixed_model.js`, `testResearchFixed()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1483`** (2 nodes): `NO_CI_executes_research_research_submission.js`, `testResearchSubmit()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1484`** (2 nodes): `NO_CI_executes_research_research_with_model.js`, `testResearchWithAvailableModel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1485`** (2 nodes): `NO_CI_executes_research_research_working_config.js`, `testResearchWorkingConfig()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1486`** (2 nodes): `register_ci_user.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1487`** (2 nodes): `test_api_endpoints_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1488`** (2 nodes): `test_api_key_enter_save.js`, `log()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1489`** (2 nodes): `test_api_key_inputs.js`, `testApiKeyInputs()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1490`** (2 nodes): `test_auth_comprehensive_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1491`** (2 nodes): `test_auth_flow.js`, `testAuthFlow()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1492`** (2 nodes): `test_autocomplete_selection.js`, `runTests()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1493`** (2 nodes): `test_benchmark_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1494`** (2 nodes): `test_charts.js`, `testCharts()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1495`** (2 nodes): `test_check_search_engines.js`, `checkSearchEngines()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1496`** (2 nodes): `test_check_user_database.js`, `checkUserDatabase()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1497`** (2 nodes): `test_concurrent_limit.js`, `submitResearchBatch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1498`** (2 nodes): `test_context_overflow_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1499`** (2 nodes): `test_context_overflow_standalone.js`, `testContextOverflow()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1500`** (2 nodes): `test_cost_analytics.js`, `testCostAnalytics()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1501`** (2 nodes): `test_crud_operations_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1502`** (2 nodes): `test_direct_mode.js`, `submitResearchBatch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1503`** (2 nodes): `test_form_validation_aria_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1504`** (2 nodes): `test_full_navigation.js`, `testFullNavigation()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1505`** (2 nodes): `test_history_page_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1506`** (2 nodes): `test_keyboard_accessibility_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1507`** (2 nodes): `test_library_collections_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1508`** (2 nodes): `test_library_documents_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1509`** (2 nodes): `test_loading_feedback_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1510`** (2 nodes): `test_login_validation.js`, `testLoginValidation()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1511`** (2 nodes): `test_metrics_browser.js`, `testMetricsPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1512`** (2 nodes): `test_metrics_charts.js`, `testChartsScroll()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1513`** (2 nodes): `test_metrics_dashboard_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1514`** (2 nodes): `test_metrics_display.js`, `testMetricsDisplay()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1515`** (2 nodes): `test_metrics_only.js`, `testMetricsPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1516`** (2 nodes): `test_metrics_screenshot.js`, `captureMetricsScreenshot()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1517`** (2 nodes): `test_metrics_subpages.js`, `captureMetricsSubpages()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1518`** (2 nodes): `test_mobile_interactions_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1519`** (2 nodes): `test_mobile_metrics.js`, `testMobileMetrics()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1520`** (2 nodes): `test_network_requests.js`, `testNetworkRequests()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1521`** (2 nodes): `test_news_breaking_table.js`, `testNewsBreakingTable()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1522`** (2 nodes): `test_news_feed_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1523`** (2 nodes): `test_news_js_loads.js`, `testNewsJsLoads()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1524`** (2 nodes): `test_news_subscriptions_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1525`** (2 nodes): `test_news_subscription_form.js`, `testNewsSubscriptionForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1526`** (2 nodes): `test_queue_simple.js`, `submitResearch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1527`** (2 nodes): `test_quick_screenshot.js`, `quickScreenshot()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1528`** (2 nodes): `test_rate_limiting_chart.js`, `testRateLimitingChart()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1529`** (2 nodes): `test_rate_limiting_settings.js`, `testRateLimiting()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1530`** (2 nodes): `test_realtime_progress_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1531`** (2 nodes): `test_register_full_flow.js`, `testRegisterFullFlow()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1532`** (2 nodes): `test_register_validation.js`, `testRegisterValidation()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1533`** (2 nodes): `test_research_diagnosis.js`, `testResearchDiagnosis()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1534`** (2 nodes): `test_research_diagnostic.js`, `runDiagnostic()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1535`** (2 nodes): `test_research_form.js`, `testResearchForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1536`** (2 nodes): `test_research_form_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1537`** (2 nodes): `test_research_form_validation.js`, `testResearchFormValidation()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1538`** (2 nodes): `test_research_search_analysis.js`, `analyzeSearchFunctionality()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1539`** (2 nodes): `test_research_searxng.js`, `testResearchWithSearxng()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1540`** (2 nodes): `test_research_simple.js`, `testSimpleResearch()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1541`** (2 nodes): `test_research_status.js`, `testResearchStatus()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1542`** (2 nodes): `test_research_verify.js`, `testResearchVerify()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1543`** (2 nodes): `test_research_workflow.js`, `testResearchWorkflow()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1544`** (2 nodes): `test_research_workflow_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1545`** (2 nodes): `test_settings_errors.js`, `testSettingsChange()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1546`** (2 nodes): `test_settings_interactions_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1547`** (2 nodes): `test_settings_page.js`, `testSettingsPage()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1548`** (2 nodes): `test_settings_pages_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1549`** (2 nodes): `test_settings_save.js`, `testSettingsSave()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1550`** (2 nodes): `test_settings_validation.js`, `testSettingsValidation()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1551`** (2 nodes): `test_simple_metrics.js`, `testMetricsDashboard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1552`** (2 nodes): `test_star_reviews.js`, `testStarReviews()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1553`** (2 nodes): `test_ui_screenshots.js`, `captureUIScreenshots()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1554`** (2 nodes): `test_library_documents.js`, `delay()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1555`** (2 nodes): `test_mobile_navigation_authenticated.js`, `testAuthenticatedPages()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1556`** (2 nodes): `test_mobile_nav_all_pages.js`, `testAllPages()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1557`** (2 nodes): `test_ui_functionality_ci.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1558`** (2 nodes): `test_scheduler_simple_standalone.js`, `testScheduler()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1559`** (2 nodes): `all-pages-mobile.spec.js`, `waitForPageLoad()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1560`** (2 nodes): `runme.py`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1561`** (2 nodes): `prm.go`, `ProtectedResourceMetadata`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1562`** (2 nodes): `sanitize.js`, `escapeHtml()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1563`** (2 nodes): `run_ruff_format.py`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1564`** (2 nodes): `defaults.py`, `get_default_models()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1565`** (2 nodes): `test_data_recipe_seed.py`, `test_seed_inspect_load_kwargs_disables_remote_code_execution()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1566`** (2 nodes): `read-more.tsx`, `ReadMore()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1567`** (2 nodes): `use-debounced-value.ts`, `useDebouncedValue()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1568`** (2 nodes): `use-infinite-scroll.ts`, `useInfiniteScroll()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1569`** (2 nodes): `test_merged_model.py`, `safe_remove_directory()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1570`** (2 nodes): `test_csm.py`, `find_lora_base_model()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1571`** (2 nodes): `test_whisper.py`, `find_lora_base_model()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1572`** (2 nodes): `blender_gyro_observatory_demo.py`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1573`** (2 nodes): `nsight_graphics_backend.py`, `Compatibility facade for the focused Nsight Graphics backend modules.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1574`** (2 nodes): `check-agent-runtime-guardrails.ps1`, `Add-Finding()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1575`** (2 nodes): `validate-commands.js`, `validateCommands()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1576`** (2 nodes): `validate-no-personal-paths.js`, `collectFiles()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1577`** (2 nodes): `validate-skills.js`, `validateSkills()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1578`** (2 nodes): `evaluate-session.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1579`** (2 nodes): `insaits-security-wrapper.js`, `isEnabled()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1580`** (2 nodes): `post-edit-format.js`, `run()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1581`** (2 nodes): `pre-compact.js`, `run()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1582`** (2 nodes): `session-end-marker.js`, `run()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1583`** (2 nodes): `suggest-compact.js`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1584`** (2 nodes): `resolve-ecc-root.js`, `resolveEccRoot()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1585`** (2 nodes): `shell-split.js`, `splitShellSegments()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1586`** (2 nodes): `antigravity-project.js`, `planOperations()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1587`** (2 nodes): `cursor-project.js`, `planOperations()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1588`** (2 nodes): `quality-gate.test.js`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1589`** (2 nodes): `orchestration-session.test.js`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1590`** (2 nodes): `shell-split.test.js`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1591`** (2 nodes): `orchestrate-codex-worker.test.js`, `test()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1592`** (2 nodes): `ws-protocol.test.js`, `runTests()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1593`** (1 nodes): `commitlint.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1594`** (1 nodes): `vulnerable-configs.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1595`** (1 nodes): `mcp-tool-poisoning.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1596`** (1 nodes): `types.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1597`** (1 nodes): `structured.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1598`** (1 nodes): `scanner.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1599`** (1 nodes): `taint.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1600`** (1 nodes): `cve-database.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1601`** (1 nodes): `gsd-sdk.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1602`** (1 nodes): `gsd-context-monitor.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1603`** (1 nodes): `gsd-prompt-guard.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1604`** (1 nodes): `gsd-read-guard.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1605`** (1 nodes): `gsd-workflow-guard.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1606`** (1 nodes): `e2e.integration.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1607`** (1 nodes): `gsd-tools-error.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1608`** (1 nodes): `gsd-transport-policy.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1609`** (1 nodes): `gsd-transport.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1610`** (1 nodes): `init-e2e.integration.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1611`** (1 nodes): `lifecycle-e2e.integration.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1612`** (1 nodes): `plan-parser.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1613`** (1 nodes): `planning-journal.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1614`** (1 nodes): `planning-runtime.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1615`** (1 nodes): `prompt-sanitizer.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1616`** (1 nodes): `query-execution-policy.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1617`** (1 nodes): `query-failure-classification.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1618`** (1 nodes): `query-gsd-tools-path.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1619`** (1 nodes): `query-native-direct-adapter.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1620`** (1 nodes): `query-native-hotpath-adapter.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1621`** (1 nodes): `query-raw-output-projection.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1622`** (1 nodes): `query-runtime-bridge.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1623`** (1 nodes): `query-runtime-seam-coverage.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1624`** (1 nodes): `query-tools-error-factory.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1625`** (1 nodes): `research-gate.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1626`** (1 nodes): `runtime-bridge-options.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1627`** (1 nodes): `runtime-gate.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1628`** (1 nodes): `sdk-package-compatibility.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1629`** (1 nodes): `tool-scoping.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1630`** (1 nodes): `golden-integration-covered.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1631`** (1 nodes): `golden-mutation-covered.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1632`** (1 nodes): `golden-policy.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1633`** (1 nodes): `agent-failure-classifier.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1634`** (1 nodes): `check-auto-mode.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1635`** (1 nodes): `check-completion.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1636`** (1 nodes): `check-gates.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1637`** (1 nodes): `check-ship-ready.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1638`** (1 nodes): `check-verification-status.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1639`** (1 nodes): `command-aliases.generated.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1640`** (1 nodes): `command-definition.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1641`** (1 nodes): `command-family-handlers.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1642`** (1 nodes): `command-manifest.init.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1643`** (1 nodes): `command-manifest.non-family.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1644`** (1 nodes): `command-manifest.phase.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1645`** (1 nodes): `command-manifest.phases.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1646`** (1 nodes): `command-manifest.roadmap.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1647`** (1 nodes): `command-manifest.state.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1648`** (1 nodes): `command-manifest.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1649`** (1 nodes): `command-manifest.types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1650`** (1 nodes): `command-manifest.validate.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1651`** (1 nodes): `command-manifest.verify.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1652`** (1 nodes): `command-resolution.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1653`** (1 nodes): `command-static-catalog-domain.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1654`** (1 nodes): `command-static-catalog-foundation.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1655`** (1 nodes): `command-topology.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1656`** (1 nodes): `commands-list.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1657`** (1 nodes): `commit.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1658`** (1 nodes): `config-mutation.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1659`** (1 nodes): `config-query.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1660`** (1 nodes): `decisions.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1661`** (1 nodes): `detect-phase-type.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1662`** (1 nodes): `frontmatter-array.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1663`** (1 nodes): `frontmatter-mutation.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1664`** (1 nodes): `frontmatter.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1665`** (1 nodes): `index-thin-seam.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1666`** (1 nodes): `init-complex.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1667`** (1 nodes): `init-workstream-milestone-op.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1668`** (1 nodes): `intel.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1669`** (1 nodes): `mutation-event-decorator.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1670`** (1 nodes): `mutation-event-mapper.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1671`** (1 nodes): `normalize-query-command.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1672`** (1 nodes): `phase-list-queries.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1673`** (1 nodes): `phase.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1674`** (1 nodes): `plan-scan.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1675`** (1 nodes): `plan-task-structure.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1676`** (1 nodes): `policy-convergence.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1677`** (1 nodes): `profile.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1678`** (1 nodes): `progress.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1679`** (1 nodes): `query-cli-adapter.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1680`** (1 nodes): `query-cli-output.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1681`** (1 nodes): `query-command-diagnosis.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1682`** (1 nodes): `query-command-diagnosis.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1683`** (1 nodes): `query-command-resolution-strategy.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1684`** (1 nodes): `query-command-semantics.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1685`** (1 nodes): `query-command-semantics.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1686`** (1 nodes): `query-dispatch-contract.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1687`** (1 nodes): `query-dispatch-error-mapper.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1688`** (1 nodes): `query-dispatch-error-mapper.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1689`** (1 nodes): `query-dispatch-formatting.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1690`** (1 nodes): `query-dispatch-formatting.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1691`** (1 nodes): `query-dispatch-input-validation.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1692`** (1 nodes): `query-dispatch-input-validation.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1693`** (1 nodes): `query-dispatch-observability.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1694`** (1 nodes): `query-dispatch-plan.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1695`** (1 nodes): `query-dispatch-plan.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1696`** (1 nodes): `query-dispatch-result-builder.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1697`** (1 nodes): `query-dispatch-result-builder.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1698`** (1 nodes): `query-error-taxonomy.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1699`** (1 nodes): `query-fallback-bridge-adapter.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1700`** (1 nodes): `query-fallback-output-classifier.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1701`** (1 nodes): `query-fallback-policy.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1702`** (1 nodes): `query-policy-capability.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1703`** (1 nodes): `query-policy-snapshot.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1704`** (1 nodes): `query-registry-capability.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1705`** (1 nodes): `query-unknown-command-hints.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1706`** (1 nodes): `query-unknown-command-hints.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1707`** (1 nodes): `requirements-extract-from-plans.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1708`** (1 nodes): `roadmap.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1709`** (1 nodes): `route-next-action.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1710`** (1 nodes): `skill-manifest.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1711`** (1 nodes): `state-document.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1712`** (1 nodes): `state.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1713`** (1 nodes): `sub-repos-root.integration.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1714`** (1 nodes): `summary.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1715`** (1 nodes): `template.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1716`** (1 nodes): `uat.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1717`** (1 nodes): `websearch.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1718`** (1 nodes): `workspace.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1719`** (1 nodes): `workstream.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1720`** (1 nodes): `playwright.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1721`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1722`** (1 nodes): `simple_programmatic_example.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1723`** (1 nodes): `test_direct_import.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1724`** (1 nodes): `Return identifier for this LLM.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1725`** (1 nodes): `debug_pytest.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1726`** (1 nodes): `Get base confidence for this evidence type.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1727`** (1 nodes): `Filter search results by relevance to the query.          Args:             r`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1728`** (1 nodes): `Add a finding to the repository.          Args:             query: The query`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1729`** (1 nodes): `Get findings for a query.          Args:             query: The query to get`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1730`** (1 nodes): `Clear findings for a query.          Args:             query: The query to cl`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1731`** (1 nodes): `Synthesize findings from sub-queries into a final answer.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1732`** (1 nodes): `Generate knowledge from the given query and context.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1733`** (1 nodes): `Generate knowledge based on query and context.          Args:             que`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1734`** (1 nodes): `Generate knowledge for a sub-question.          Args:             sub_query:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1735`** (1 nodes): `Compress and summarize accumulated knowledge.          Args:             curr`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1736`** (1 nodes): `Format source links into citations.          Args:             links: List of`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1737`** (1 nodes): `Generate questions based on the current state of research.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1738`** (1 nodes): `Analyze a topic using the strategy's specific approach.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1739`** (1 nodes): `Execute the tool with the given parameters.          Args:             **kwar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1740`** (1 nodes): `Run benchmark evaluation with given system configuration.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1741`** (1 nodes): `Get the default path or URL for the dataset.          Returns:             St`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1742`** (1 nodes): `Delete a research report.          Args:             research_id: Unique iden`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1743`** (1 nodes): `Register a dataset class.          Args:             dataset_class: A class i`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1744`** (1 nodes): `Get a dataset class by ID.          Args:             dataset_id: ID of the d`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1745`** (1 nodes): `Create a dataset instance by ID.          Args:             dataset_id: ID of`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1746`** (1 nodes): `Get information about all registered datasets.          Returns:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1747`** (1 nodes): `Load a dataset by ID.          This is a convenience method that creates a dat`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1748`** (1 nodes): `Context manager for monitoring resources during a block of code.          Exam`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1749`** (1 nodes): `Context manager for timing a block of code.          Args:             name:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1750`** (1 nodes): `Process initial analysis with citations.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1751`** (1 nodes): `Process follow-up analysis with citations.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1752`** (1 nodes): `Classify a URL to determine its type.          Args:             url: The URL`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1753`** (1 nodes): `Check if URL points directly to a PDF.          Note: Academic source PDFs (ar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1754`** (1 nodes): `Extract the identifier from a URL.          Args:             url: The URL to`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1755`** (1 nodes): `Get human-readable source name.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1756`** (1 nodes): `Execute a function with database session.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1757`** (1 nodes): `Get a database session for metrics in the current thread.         Creates a new`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1758`** (1 nodes): `Path to this user's encrypted database file.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1759`** (1 nodes): `Create an embeddings instance for this provider.          Args:             m`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1760`** (1 nodes): `Check if this embedding provider is available and properly configured.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1761`** (1 nodes): `Get list of available embedding models for this provider.          Implementat`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1762`** (1 nodes): `Get a setting value as a boolean.          Args:             key: Setting key`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1763`** (1 nodes): `Get information about a specific model.          Args:             model: Mod`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1764`** (1 nodes): `Validate the provider configuration.          Args:             settings_snap`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1765`** (1 nodes): `Get metadata about this provider.          Returns:             Dict with pro`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1766`** (1 nodes): `Return the format identifier (e.g., 'pdf', 'odt', 'latex').          This is u`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1767`** (1 nodes): `Return the file extension including the dot (e.g., '.pdf', '.odt').`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1768`** (1 nodes): `Export markdown content to the target format.          Args:             mark`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1769`** (1 nodes): `Whether auth is needed to list models.          Returns True by default. Overr`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1770`** (1 nodes): `Connect to the MCP server as an async context manager.          Yields:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1771`** (1 nodes): `Connect to all configured MCP servers.          Yields:             self: The`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1772`** (1 nodes): `Get a database session with automatic cleanup.          Args:             use`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1773`** (1 nodes): `Return the card type (news, research, update, overview)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1774`** (1 nodes): `Convert card to dictionary representation.         Must be implemented by subcl`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1775`** (1 nodes): `Update a record, return True if successful`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1776`** (1 nodes): `List records with optional filtering`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1777`** (1 nodes): `Get cards for a specific user`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1778`** (1 nodes): `Get the latest version of a card`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1779`** (1 nodes): `Add a new version to a card`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1780`** (1 nodes): `Update the denormalized latest version info on the card`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1781`** (1 nodes): `Get all active subscriptions, optionally filtered by user`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1782`** (1 nodes): `Get subscriptions that are due for refresh`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1783`** (1 nodes): `Update refresh timestamps after processing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1784`** (1 nodes): `Increment refresh count and update results count`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1785`** (1 nodes): `Resume a paused subscription`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1786`** (1 nodes): `Mark a subscription as expired`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1787`** (1 nodes): `Get a user's rating for a specific item`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1788`** (1 nodes): `Create or update a rating`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1789`** (1 nodes): `Get aggregated ratings for an item`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1790`** (1 nodes): `Get all ratings by a user`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1791`** (1 nodes): `Get preferences for a user`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1792`** (1 nodes): `Create or update user preferences`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1793`** (1 nodes): `Add an item to liked list`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1794`** (1 nodes): `Add an item to disliked list`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1795`** (1 nodes): `Update the user's preference embedding`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1796`** (1 nodes): `Get user preferences.          Args:             user_id: ID of the user`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1797`** (1 nodes): `Update user preferences.          Args:             user_id: ID of the user`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1798`** (1 nodes): `Record a rating from a user.          Args:             user_id: ID of the us`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1799`** (1 nodes): `Get a user's rating for a specific card.          Args:             user_id:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1800`** (1 nodes): `Get the type of rating this system handles.          Returns:             str`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1801`** (1 nodes): `Get or create the Jinja2 environment.          Returns:             Jinja2 En`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1802`** (1 nodes): `Format a notification template with context data using Jinja2.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1803`** (1 nodes): `Get a simple fallback template when Jinja2 is not available.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1804`** (1 nodes): `Get required context variables for an event type.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1805`** (1 nodes): `Check if this downloader can handle the given URL.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1806`** (1 nodes): `Download content from the given URL.          Args:             url: The URL`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1807`** (1 nodes): `Extract text from PDF content using in-memory processing.          This is par`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1808`** (1 nodes): `Recursively remove sensitive keys from data structures.          This method t`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1809`** (1 nodes): `Recursively redact (replace with placeholder) sensitive values in data structure`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1810`** (1 nodes): `Validate file size to prevent memory exhaustion attacks.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1811`** (1 nodes): `Validate number of files to prevent resource abuse.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1812`** (1 nodes): `Validate file MIME type and extension.          Args:             filename: O`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1813`** (1 nodes): `Validate PDF structure to detect malicious or corrupted files.          This g`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1814`** (1 nodes): `Comprehensive validation for a single file upload.          Runs all validatio`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1815`** (1 nodes): `Block-decision for a parsed IP, delegating to         ``ssrf_validator.is_ip_bl`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1816`** (1 nodes): `Check if hostname resolves to a private IP address.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1817`** (1 nodes): `Validate a notification service URL for security issues.          This functio`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1818`** (1 nodes): `Strict validation that raises an exception on invalid URLs.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1819`** (1 nodes): `Validate multiple comma-separated service URLs.          Args:             ur`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1820`** (1 nodes): `Validate and sanitize a user-provided path.          Args:             user_i`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1821`** (1 nodes): `Validate a user-provided absolute filesystem path for local indexing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1822`** (1 nodes): `Re-sanitize a validated path for static analyzer recognition.          This me`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1823`** (1 nodes): `Validate a model file path specifically.          Args:             model_pat`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1824`** (1 nodes): `Validate a path within the data directory.          Args:             file_pa`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1825`** (1 nodes): `Validate a configuration file path.          Args:             config_path: P`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1826`** (1 nodes): `Generate Permissions-Policy header value.          Disables potentially danger`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1827`** (1 nodes): `Check if the request path is an API route.          Args:             path: R`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1828`** (1 nodes): `Check if a URL uses an unsafe scheme.          Args:             url: The URL`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1829`** (1 nodes): `Validate if a URL is safe to use.          Args:             url: The URL to`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1830`** (1 nodes): `Check for suspicious patterns in URLs that might indicate attacks.          Ar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1831`** (1 nodes): `Sanitize a URL by adding a scheme if missing and validating it.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1832`** (1 nodes): `Check if a URL is from a known academic/research domain.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1833`** (1 nodes): `Extract DOI from a URL if present.          Args:             url: The URL to`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1834`** (1 nodes): `Validate that a callback URL is well-formed and safe for HTTP/HTTPS use.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1835`** (1 nodes): `Validate that a redirect target is safe (same host).          Prevents open re`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1836`** (1 nodes): `Validate a redirect target and return its path-only form.          Combines is`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1837`** (1 nodes): `Determine if this verifier handles the given file.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1838`** (1 nodes): `Get the file type identifier for this verifier.          Returns:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1839`** (1 nodes): `Whether this file type can be legitimately modified by users.          Returns`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1840`** (1 nodes): `Get a setting value.          Args:             key: Setting key`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1841`** (1 nodes): `Get all settings.          Returns:             Dictionary of all settings wi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1842`** (1 nodes): `Create or update a setting.          Args:             setting: Setting objec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1843`** (1 nodes): `Delete a setting.          Args:             key: Setting key             co`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1844`** (1 nodes): `Get a simplified settings snapshot with just key-value pairs.          Returns`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1845`** (1 nodes): `Import settings from the defaults settings file.          Args:             c`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1846`** (1 nodes): `Import settings from a dictionary.          Args:             settings_data:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1847`** (1 nodes): `Convert raw string value to the appropriate type.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1848`** (1 nodes): `Check if the environment variable is set.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1849`** (1 nodes): `Save a research report.          Args:             research_id: Unique identi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1850`** (1 nodes): `Retrieve a research report.          Args:             research_id: Unique id`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1851`** (1 nodes): `Retrieve a research report with its metadata.          Args:             rese`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1852`** (1 nodes): `List available reports.          Args:             username: Optional usernam`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1853`** (1 nodes): `Check if a report exists.          Args:             research_id: Unique iden`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1854`** (1 nodes): `Extract text and metadata from PDF in a single pass.          This method open`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1855`** (1 nodes): `Extract text from multiple PDF files.          Args:             files_data:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1856`** (1 nodes): `Save sources from research to the ResearchResource table.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1857`** (1 nodes): `Get all sources for a research from the database.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1858`** (1 nodes): `Update a completed research with its sources.         This should be called whe`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1859`** (1 nodes): `news-enhancements.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1860`** (1 nodes): `checkbox_handler.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1861`** (1 nodes): `urls.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1862`** (1 nodes): `help.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1863`** (1 nodes): `Test quick_summary with full settings propagation.          Patches happen on`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1864`** (1 nodes): `Test detailed_research with comprehensive settings.          detailed_research`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1865`** (1 nodes): `Test fallback between providers based on settings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1866`** (1 nodes): `Test that search engine specific settings are applied.          Each call's po`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1867`** (1 nodes): `Create an in-memory database session for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1868`** (1 nodes): `Create a token counting callback for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1869`** (1 nodes): `Test that overflow detection logs a warning.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1870`** (1 nodes): `Detection fires from prompt estimate when provider doesn't echo prompt_eval_coun`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1871`** (1 nodes): `[total-context] fires when input+output exceeds limit but input alone doesn't.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1872`** (1 nodes): `[total-context] fires when hosted provider input+output exceeds limit.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1873`** (1 nodes): `[estimated-total-context] fires when token_usage comes from llm_output.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1874`** (1 nodes): `Regression: TokenCountingCallback is reused across LLM calls in a         resea`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1875`** (1 nodes): `Estimation path should not fire when context_limit is not set.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1876`** (1 nodes): `Estimation path should not fire when prompt estimate is 0.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1877`** (1 nodes): `Estimation path should not crash if on_llm_start was never called.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1878`** (1 nodes): `Test with real Ollama instance if available.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1879`** (1 nodes): `Create a temporary database for testing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1880`** (1 nodes): `Create a mock LLM for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1881`** (1 nodes): `Mock database settings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1882`** (1 nodes): `Test that tracker is not used since rate limiting is disabled.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1883`** (1 nodes): `Create settings snapshot with OpenAI configuration.          Uses simplified f`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1884`** (1 nodes): `Test fallback to environment variable if API key not in settings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1885`** (1 nodes): `Create a mock language model.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1886`** (1 nodes): `Create a mock search engine.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1887`** (1 nodes): `Create a mock language model.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1888`** (1 nodes): `Create a mock search engine.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1889`** (1 nodes): `Fetch the research page HTML`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1890`** (1 nodes): `wcag-compliance.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1891`** (1 nodes): `Test evidence is collected from search results`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1892`** (1 nodes): `Test evidence is scored for quality`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1893`** (1 nodes): `Test irrelevant evidence is filtered out`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1894`** (1 nodes): `Test duplicate evidence is removed`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1895`** (1 nodes): `Test evidence has proper source attribution`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1896`** (1 nodes): `Test evidence timestamps are extracted`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1897`** (1 nodes): `Test evidence authors are extracted`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1898`** (1 nodes): `Test citation information is parsed`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1899`** (1 nodes): `Test evidence confidence is calculated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1900`** (1 nodes): `Test conflicting evidence is identified`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1901`** (1 nodes): `Test synthesis prompt is generated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1902`** (1 nodes): `Test evidence is ranked properly`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1903`** (1 nodes): `Test evidence is clustered by topic`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1904`** (1 nodes): `Test evidence gaps are identified`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1905`** (1 nodes): `Test evidence chain is built`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1906`** (1 nodes): `Test claims are extracted from text`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1907`** (1 nodes): `Test claims are classified by type`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1908`** (1 nodes): `Test claims are matched to supporting evidence`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1909`** (1 nodes): `Test claim confidence is scored`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1910`** (1 nodes): `Test contradicting claims are detected`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1911`** (1 nodes): `Test number of supporting evidence is counted`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1912`** (1 nodes): `Test source diversity for claims`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1913`** (1 nodes): `Test recent claims are weighted higher`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1914`** (1 nodes): `Test authority of sources is scored`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1915`** (1 nodes): `Test consensus level is calculated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1916`** (1 nodes): `Test multiple claims are synthesized`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1917`** (1 nodes): `Test claim hierarchy is built`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1918`** (1 nodes): `Test claim dependencies are mapped`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1919`** (1 nodes): `Test verification prompt is generated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1920`** (1 nodes): `Test uncertainty is quantified`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1921`** (1 nodes): `Test claim revisions are tracked`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1922`** (1 nodes): `Test conflicting claims are merged`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1923`** (1 nodes): `Test compound claims are split`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1924`** (1 nodes): `Test claim text is normalized`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1925`** (1 nodes): `Test semantic similarity between claims`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1926`** (1 nodes): `Test analyze_topic returns proper result`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1927`** (1 nodes): `Test progress callback is invoked during analysis`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1928`** (1 nodes): `Test source profiles are tracked`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1929`** (1 nodes): `Test query patterns are learned`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1930`** (1 nodes): `Test multi-stage discovery process`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1931`** (1 nodes): `Test initial hypothesis is generated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1932`** (1 nodes): `Test hypothesis is refined through iteration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1933`** (1 nodes): `Test evidence is integrated each iteration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1934`** (1 nodes): `Test convergence is detected`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1935`** (1 nodes): `Test divergence is handled`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1936`** (1 nodes): `Test iteration limit is enforced`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1937`** (1 nodes): `Test quality improvement is tracked`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1938`** (1 nodes): `Test reasoning chain is built`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1939`** (1 nodes): `Test reasoning steps are validated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1940`** (1 nodes): `Test contradictions are resolved`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1941`** (1 nodes): `Test reasoning gaps are filled`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1942`** (1 nodes): `Test reasoning depth is controlled`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1943`** (1 nodes): `Test reasoning breadth is controlled`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1944`** (1 nodes): `Test reasoning priorities are ordered`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1945`** (1 nodes): `Test irrelevant reasoning is pruned`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1946`** (1 nodes): `Test multiple reasoning paths are explored`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1947`** (1 nodes): `Test reasoning paths are merged`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1948`** (1 nodes): `Test confidence propagates through reasoning`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1949`** (1 nodes): `Test uncertainty is handled in reasoning`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1950`** (1 nodes): `Test assumptions are tracked`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1951`** (1 nodes): `Test conclusions are extracted`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1952`** (1 nodes): `Test supporting evidence is collected`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1953`** (1 nodes): `Test counterarguments are handled`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1954`** (1 nodes): `Test synthesis is generated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1955`** (1 nodes): `Test summary is created`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1956`** (1 nodes): `Test reasoning quality is assessed`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1957`** (1 nodes): `Test feedback is integrated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1958`** (1 nodes): `Test learning from outcomes`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1959`** (1 nodes): `Test context is managed`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1960`** (1 nodes): `Test resources are optimized`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1961`** (1 nodes): `Test next search decision`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1962`** (1 nodes): `Test search execution`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1963`** (1 nodes): `Test knowledge update`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1964`** (1 nodes): `Test answer assessment`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1965`** (1 nodes): `Test final answer synthesis`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1966`** (1 nodes): `Test modules are properly initialized`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1967`** (1 nodes): `Test module dependencies are resolved`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1968`** (1 nodes): `Test modules execute in correct order`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1969`** (1 nodes): `Test module outputs are passed between modules`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1970`** (1 nodes): `Test errors in one module don't crash others`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1971`** (1 nodes): `Test module retry on failure`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1972`** (1 nodes): `Test module timeout is handled`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1973`** (1 nodes): `Test modules can execute in parallel`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1974`** (1 nodes): `Test modules execute sequentially when needed`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1975`** (1 nodes): `Test conditional module execution`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1976`** (1 nodes): `Test module results are aggregated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1977`** (1 nodes): `Test module state is managed`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1978`** (1 nodes): `Test checkpoint is saved`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1979`** (1 nodes): `Test checkpoint can be restored`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1980`** (1 nodes): `Test progress is reported`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1981`** (1 nodes): `Test resources are allocated per module`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1982`** (1 nodes): `Test LLM is selected per module`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1983`** (1 nodes): `Test prompt templates are used`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1984`** (1 nodes): `Test module output is validated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1985`** (1 nodes): `Test module output quality is assessed`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1986`** (1 nodes): `Test strategy is configurable`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1987`** (1 nodes): `Test execution flows through all phases`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1988`** (1 nodes): `Test strategy adapts to query type`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1989`** (1 nodes): `Test fallback is used on failure`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1990`** (1 nodes): `Test quality threshold is enforced`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1991`** (1 nodes): `Test early termination on high confidence`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1992`** (1 nodes): `Test results are synthesized`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1993`** (1 nodes): `Test cost optimization is applied`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1994`** (1 nodes): `Test latency optimization is applied`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1995`** (1 nodes): `Test quality optimization is applied`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1996`** (1 nodes): `Test multi-objective optimization`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1997`** (1 nodes): `Test user preferences are respected`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1998`** (1 nodes): `Test strategy is context-aware`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 1999`** (1 nodes): `Test learning from past executions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2000`** (1 nodes): `Test feedback is incorporated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2001`** (1 nodes): `Test intelligent constraint decomposition`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2002`** (1 nodes): `Test generating search combinations`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2003`** (1 nodes): `Test creative search angle generation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2004`** (1 nodes): `Test search combination optimization`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2005`** (1 nodes): `Test quick confidence checking`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2006`** (1 nodes): `Test early rejection decision`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2007`** (1 nodes): `Test search continuation decision`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2008`** (1 nodes): `evaluation_config is set when only model is provided.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2009`** (1 nodes): `evaluation_config is set when only provider is provided.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2010`** (1 nodes): `evaluation_config includes both model and provider.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2011`** (1 nodes): `evaluation_config is None when neither model nor provider.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2012`** (1 nodes): `evaluation_config with model for browsecomp.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2013`** (1 nodes): `evaluation_config with provider for browsecomp.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2014`** (1 nodes): `evaluation_config with model for xbench.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2015`** (1 nodes): `evaluation_config with provider for xbench.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2016`** (1 nodes): `Uses default configurations when none provided.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2017`** (1 nodes): `Passes custom configurations correctly.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2018`** (1 nodes): `Comparison report is written to file.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2019`** (1 nodes): `Extra config items beyond standard ones are passed through.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2020`** (1 nodes): `Test basic initialization of search system.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2021`** (1 nodes): `Test initialization with custom model name.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2022`** (1 nodes): `Test initialization with custom temperature.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2023`** (1 nodes): `Test initialization with custom provider.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2024`** (1 nodes): `Test initialization with custom iterations.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2025`** (1 nodes): `Test initialization with custom questions per iteration.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2026`** (1 nodes): `Test initialization with progress callback.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2027`** (1 nodes): `Test initialization with custom search tool.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2028`** (1 nodes): `Test initialization with custom search strategy.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2029`** (1 nodes): `Test initialization with custom retrievers.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2030`** (1 nodes): `Test initialization with custom LLMs.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2031`** (1 nodes): `Test basic quick summary.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2032`** (1 nodes): `Test quick summary with custom provider in settings_snapshot.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2033`** (1 nodes): `Test quick summary with custom temperature in settings_snapshot.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2034`** (1 nodes): `Test quick summary registers retrievers with registry.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2035`** (1 nodes): `Test quick summary with research ID tracking.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2036`** (1 nodes): `Test quick summary search_original_query default is True.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2037`** (1 nodes): `Test quick summary with search_original_query disabled.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2038`** (1 nodes): `Test quick summary with empty query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2039`** (1 nodes): `Test quick summary with special characters.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2040`** (1 nodes): `Test quick summary with unicode characters.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2041`** (1 nodes): `Test quick summary handles system errors.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2042`** (1 nodes): `Test quick summary handles analyze_topic errors.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2043`** (1 nodes): `Test complete research workflow.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2044`** (1 nodes): `Test ALL API v1 endpoints.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2045`** (1 nodes): `Test that API accepts properly formatted requests.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2046`** (1 nodes): `Each example file must be valid Python (no syntax errors).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2047`** (1 nodes): `Each example script should define a main() function.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2048`** (1 nodes): `Each example script should have an if __name__ == '__main__' guard.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2049`** (1 nodes): `Test quick summary with minimal query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2050`** (1 nodes): `Test the quick summary test endpoint with minimal query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2051`** (1 nodes): `Test analyze documents with minimal input.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2052`** (1 nodes): `Test generate report with minimal input.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2053`** (1 nodes): `Test quick summary with the most minimal possible query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2054`** (1 nodes): `Test the test endpoint with minimal query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2055`** (1 nodes): `Test analyze documents with minimal input.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2056`** (1 nodes): `Test generate report with minimal input.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2057`** (1 nodes): `Check related search engine settings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2058`** (1 nodes): `Check all settings to see what's available.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2059`** (1 nodes): `run_pytest_tests.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2060`** (1 nodes): `test_export_minimal.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2061`** (1 nodes): `test_research_api_enhanced.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2062`** (1 nodes): `Use Puppeteer to authenticate and get cookies`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2063`** (1 nodes): `Create a temporary data directory for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2064`** (1 nodes): `Create a test Flask app with rate limiting.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2065`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2066`** (1 nodes): `Create a temporary data directory for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2067`** (1 nodes): `Create a test Flask app with rate limiting.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2068`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2069`** (1 nodes): `Test that rate limit resets after 15 minutes (for login).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2070`** (1 nodes): `Test that empty configurations list returns error.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2071`** (1 nodes): `Test that output directory is created.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2072`** (1 nodes): `Test that default metric weights are applied.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2073`** (1 nodes): `Test that compare_configurations returns a dictionary.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2074`** (1 nodes): `Test that error results have 'error' key.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2075`** (1 nodes): `Test comparing a single configuration.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2076`** (1 nodes): `Test comparing multiple configurations.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2077`** (1 nodes): `Test handling of failed configuration.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2078`** (1 nodes): `Test compare with multiple repetitions per configuration.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2079`** (1 nodes): `Test compare with custom metric weights.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2080`** (1 nodes): `Test that results are sorted by score in descending order.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2081`** (1 nodes): `Test successful configuration evaluation.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2082`** (1 nodes): `Test that evaluation handles LLM initialization errors.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2083`** (1 nodes): `Test that configuration parameters are applied correctly.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2084`** (1 nodes): `Test visualization with no successful results.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2085`** (1 nodes): `Test metric comparison chart with single metric.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2086`** (1 nodes): `Test pareto chart creation with data.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2087`** (1 nodes): `Test that visualizations create output files.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2088`** (1 nodes): `Test that default config is used.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2089`** (1 nodes): `Test that custom config overrides defaults.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2090`** (1 nodes): `Test that unsupported parameters are filtered out.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2091`** (1 nodes): `Test that API key is extracted from settings snapshot.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2092`** (1 nodes): `Test that grade_single_result grades correctly.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2093`** (1 nodes): `Test that grade_single_result handles errors gracefully.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2094`** (1 nodes): `Test BrowseComp-specific grading format extraction.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2095`** (1 nodes): `Test grading when LLM doesn't provide clear judgment.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2096`** (1 nodes): `Test that grade_results processes all items in file.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2097`** (1 nodes): `Test that progress callback is invoked during grading.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2098`** (1 nodes): `Test that grade_results handles individual grading errors.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2099`** (1 nodes): `Test that grade_results writes to output file.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2100`** (1 nodes): `Test grading with empty model response.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2101`** (1 nodes): `Test grading when LLM doesn't have invoke method.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2102`** (1 nodes): `Test grading with LLM that has chat_messages attribute.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2103`** (1 nodes): `Test SimpleQA grading with 'no' judgment.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2104`** (1 nodes): `Test that settings_snapshot is passed to get_evaluation_llm.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2105`** (1 nodes): `grade_single_result handles LLM response with .content attribute.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2106`** (1 nodes): `grade_single_result handles browsecomp extraction format.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2107`** (1 nodes): `grade_single_result falls back to calling LLM as callable.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2108`** (1 nodes): `grade_single_result handles exceptions gracefully.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2109`** (1 nodes): `grade_single_result defaults to incorrect when no 'Correct:' match.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2110`** (1 nodes): `Extracts API key from settings_snapshot when value is a dict.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2111`** (1 nodes): `Extracts API key from settings_snapshot when value is a string.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2112`** (1 nodes): `Warns when no settings_snapshot provided for openai_endpoint.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2113`** (1 nodes): `Warns when settings_snapshot has no API key.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2114`** (1 nodes): `Custom config overrides default evaluation config.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2115`** (1 nodes): `Parameters not in ldr_supported_params are filtered out.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2116`** (1 nodes): `Uses HumanMessage when LLM has chat_messages attribute.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2117`** (1 nodes): `safe_close is called on the LLM after grading completes.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2118`** (1 nodes): `safe_close is called even when grading raises.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2119`** (1 nodes): `When the LLM invoke raises, the try/except inside grade_single_result catches it`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2120`** (1 nodes): `Function creates optimizer with the provided query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2121`** (1 nodes): `Function passes all configuration parameters to optimizer.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2122`** (1 nodes): `Function calls the optimizer's optimize method.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2123`** (1 nodes): `Function returns the result from optimizer.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2124`** (1 nodes): `Function uses a parameter space optimized for speed.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2125`** (1 nodes): `Function uses metric weights that prioritize speed.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2126`** (1 nodes): `Function uses fast search strategies.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2127`** (1 nodes): `Function uses metric weights that prioritize quality.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2128`** (1 nodes): `Function passes None for param_space (uses default).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2129`** (1 nodes): `Function includes quality in optimization metrics.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2130`** (1 nodes): `Function uses balanced metric weights.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2131`** (1 nodes): `Function includes resource in optimization metrics.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2132`** (1 nodes): `Function optimizes for quality, speed, and resource.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2133`** (1 nodes): `Cover line 166-167: fallback to 'answer' when 'correct_answer' missing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2134`** (1 nodes): `When example has no 'id', fallback to example_{i}.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2135`** (1 nodes): `Cover the config_info dict passed to generate_report.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2136`** (1 nodes): `When no outer callback, the lambda should still work (returns None).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2137`** (1 nodes): `_evaluate_single_configuration must not be called for empty input.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2138`** (1 nodes): `makedirs is called even before the empty-list guard.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2139`** (1 nodes): `An exception raised by _evaluate_single_configuration counts as a failure.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2140`** (1 nodes): `Even on error the result includes timing_details and resource_details.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2141`** (1 nodes): `stop() must be called on both profiler and monitor even on error.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2142`** (1 nodes): `Early return when there are no successful results.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2143`** (1 nodes): `With one successful result all sub-chart helpers are called.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2144`** (1 nodes): `Config names used in barh must come from result['name'].`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2145`** (1 nodes): `Only successful repetitions count toward runs_completed.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2146`** (1 nodes): `_calculate_average_metrics is called with the list of successful runs.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2147`** (1 nodes): `The top-level 'repetitions' key reflects the requested count.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2148`** (1 nodes): `Results are sorted descending by overall_score.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2149`** (1 nodes): `String values are coerced to int.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2150`** (1 nodes): `None value → fallback to 8192.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2151`** (1 nodes): `Unknown provider goes through cloud branch.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2152`** (1 nodes): `Should create search engine via factory.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2153`** (1 nodes): `Should use provided search_tool argument.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2154`** (1 nodes): `Should use provided llm_instance instead of getting new one.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2155`** (1 nodes): `Should extract value when search.tool is a dict.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2156`** (1 nodes): `Should add username to settings snapshot.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2157`** (1 nodes): `Should create snapshot with just username if none provided.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2158`** (1 nodes): `Should pass programmatic_mode to factory.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2159`** (1 nodes): `Should pass all search parameters to factory.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2160`** (1 nodes): `Should return None when factory returns None.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2161`** (1 nodes): `Create an in-memory SQLite database for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2162`** (1 nodes): `Create a database session for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2163`** (1 nodes): `Create an in-memory SQLite database for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2164`** (1 nodes): `Create a database session for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2165`** (1 nodes): `Create an in-memory SQLite database for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2166`** (1 nodes): `Create a database session for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2167`** (1 nodes): `Create a temporary directory for test databases.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2168`** (1 nodes): `Create and dispose a SQLite engine with all tables.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2169`** (1 nodes): `Create a session bound to db_engine, closed on teardown.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2170`** (1 nodes): `Test pool kwargs for static pool (testing mode)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2171`** (1 nodes): `Test pool kwargs for queue pool (production mode)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2172`** (1 nodes): `Should create all predefined source types.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2173`** (1 nodes): `Should not duplicate existing source types.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2174`** (1 nodes): `Should handle IntegrityError gracefully without raising.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2175`** (1 nodes): `Should re-raise unexpected exceptions.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2176`** (1 nodes): `Should log when creating source types.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2177`** (1 nodes): `Should create source types with correct name, display_name, description, icon.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2178`** (1 nodes): `Should work when password is not provided.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2179`** (1 nodes): `Should create default Library collection when none exists.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2180`** (1 nodes): `Should return ID of existing default collection.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2181`** (1 nodes): `Should set is_default=True on new collection.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2182`** (1 nodes): `Should create collection with name='Library' and type='default_library'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2183`** (1 nodes): `Should re-raise exceptions from database operations.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2184`** (1 nodes): `Should create Research History collection when none exists.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2185`** (1 nodes): `Should return ID of existing Research History collection.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2186`** (1 nodes): `Should re-raise exceptions from database operations.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2187`** (1 nodes): `Should return dict with success=True on success.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2188`** (1 nodes): `Should include error message when seed_source_types fails.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2189`** (1 nodes): `Should include error message when ensure_default_library_collection fails.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2190`** (1 nodes): `Should call both seed_source_types and ensure_default_library_collection.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2191`** (1 nodes): `Should return dict with all expected keys.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2192`** (1 nodes): `Should return the library collection ID.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2193`** (1 nodes): `Should create library if it doesn't exist (via ensure_default_library_collection`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2194`** (1 nodes): `Should return ID for existing source type.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2195`** (1 nodes): `Should raise ValueError for non-existent type.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2196`** (1 nodes): `Should re-raise database errors after logging.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2197`** (1 nodes): `Should work when password is not provided.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2198`** (1 nodes): `Create an in-memory SQLite database for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2199`** (1 nodes): `Create a database session for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2200`** (1 nodes): `Create a database with research_resources missing document_id.          This s`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2201`** (1 nodes): `Create an in-memory SQLite database for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2202`** (1 nodes): `Create a database session for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2203`** (1 nodes): `Create an in-memory SQLite database for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2204`** (1 nodes): `Create a database session for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2205`** (1 nodes): `Create an in-memory SQLite database for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2206`** (1 nodes): `Create a database session for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2207`** (1 nodes): `Test getting sentence splitter.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2208`** (1 nodes): `Test sentence splitter with custom parameters.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2209`** (1 nodes): `breakpoint_threshold_amount=0 is forwarded (not treated as None).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2210`** (1 nodes): `Mock Wikipedia API response.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2211`** (1 nodes): `Mock arXiv XML response.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2212`** (1 nodes): `Mock PubMed search response.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2213`** (1 nodes): `Mock PubMed article detail.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2214`** (1 nodes): `Mock Semantic Scholar API response.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2215`** (1 nodes): `Mock Google Programmable Search Engine response.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2216`** (1 nodes): `Mock DuckDuckGo search response.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2217`** (1 nodes): `Collection of error responses for testing error handling.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2218`** (1 nodes): `Test that frontend_progress_sink properly handles MILESTONE logs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2219`** (1 nodes): `Test that remove_think_tags never crashes on arbitrary input.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2220`** (1 nodes): `Test that think tags are properly removed.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2221`** (1 nodes): `Test that extract_links_from_search_results handles arbitrary dicts.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2222`** (1 nodes): `Test that format_links_to_markdown handles arbitrary link data.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2223`** (1 nodes): `Test that empty input returns empty list.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2224`** (1 nodes): `Test that None input returns empty list.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2225`** (1 nodes): `Test handling of dicts with missing expected keys.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2226`** (1 nodes): `test_safe_fetch.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2227`** (1 nodes): `Load the JavaScript URLs configuration file`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2228`** (1 nodes): `checkbox-handler.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2229`** (1 nodes): `custom-dropdown.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2230`** (1 nodes): `fallback-formatting.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2231`** (1 nodes): `library-search.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2232`** (1 nodes): `news.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2233`** (1 nodes): `semantic-search.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2234`** (1 nodes): `constants.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2235`** (1 nodes): `auth-validation.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2236`** (1 nodes): `safe-fetch.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2237`** (1 nodes): `url-validator.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2238`** (1 nodes): `formatting.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2239`** (1 nodes): `keyboard.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2240`** (1 nodes): `theme.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2241`** (1 nodes): `ui.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2242`** (1 nodes): `form-validation.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2243`** (1 nodes): `log-helpers.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2244`** (1 nodes): `value-helpers.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2245`** (1 nodes): `Create settings snapshot for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2246`** (1 nodes): `Return identifier of llm.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2247`** (1 nodes): `Create a mock database session.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2248`** (1 nodes): `Create a settings snapshot for testing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2249`** (1 nodes): `Test that init_database() disposes engine even on success.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2250`** (1 nodes): `Test that init_database() disposes engine when create_all fails.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2251`** (1 nodes): `Test that init_database() calls Base.metadata.create_all().`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2252`** (1 nodes): `Test that verify_table_exists() disposes engine when table is missing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2253`** (1 nodes): `Test that verify_table_exists() disposes engine on inspect error.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2254`** (1 nodes): `Test that verify_table_exists() disposes engine on get_table_names error.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2255`** (1 nodes): `Test that verify_table_exists() uses SQLAlchemy inspect().`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2256`** (1 nodes): `Test behavior at daily limit boundary (exactly 3 retries)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2257`** (1 nodes): `Test handling of None retry counts (legacy data)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2258`** (1 nodes): `Test that headline is generated when LLM succeeds.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2259`** (1 nodes): `Test that quotes are stripped from generated headline.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2260`** (1 nodes): `Test that empty findings returns failure message.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2261`** (1 nodes): `Test that LLM exception results in failure message.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2262`** (1 nodes): `Test that empty LLM response returns failure message.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2263`** (1 nodes): `Test that LLM is called with low temperature for consistency.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2264`** (1 nodes): `Test that prompt includes the findings content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2265`** (1 nodes): `Test that missing findings returns None.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2266`** (1 nodes): `Test that punctuation is stripped from headline ends.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2267`** (1 nodes): `Test returns LLM-generated headline when successful.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2268`** (1 nodes): `Test returns failure message when LLM fails.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2269`** (1 nodes): `Test passes query to LLM generator.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2270`** (1 nodes): `Test passes findings to LLM generator.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2271`** (1 nodes): `Test passes max_length to LLM generator.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2272`** (1 nodes): `Test default max_length is 100.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2273`** (1 nodes): `Test empty findings is allowed.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2274`** (1 nodes): `Test handles unicode characters in query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2275`** (1 nodes): `Test handles unicode characters in findings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2276`** (1 nodes): `Test handles very long query string.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2277`** (1 nodes): `Test handles newlines in findings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2278`** (1 nodes): `Test handles special characters in findings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2279`** (1 nodes): `Test that LLM topics are returned when generation succeeds.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2280`** (1 nodes): `Test that failure message is returned when LLM fails.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2281`** (1 nodes): `Test parsing of JSON array from LLM.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2282`** (1 nodes): `Test handling of JSON wrapped in markdown code block.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2283`** (1 nodes): `Test fallback parsing of comma-separated topics.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2284`** (1 nodes): `Test that max_topics limit is respected.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2285`** (1 nodes): `Test that topics longer than 30 chars are filtered.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2286`** (1 nodes): `Test graceful handling of LLM exceptions.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2287`** (1 nodes): `Test that medium temperature is used for topic diversity.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2288`** (1 nodes): `Test that long queries are truncated in prompt.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2289`** (1 nodes): `Test returns validated topics from LLM.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2290`** (1 nodes): `Test returns failure marker when LLM returns empty.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2291`** (1 nodes): `Test passes max_topics to validator.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2292`** (1 nodes): `Test default max_topics is 5.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2293`** (1 nodes): `Test passes category to LLM generator.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2294`** (1 nodes): `Test handles unicode characters in topics.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2295`** (1 nodes): `Test handles zero max_topics.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2296`** (1 nodes): `Test news_page renders correct template.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2297`** (1 nodes): `Test news_page passes strategies to template.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2298`** (1 nodes): `Test news_page includes expected default strategies.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2299`** (1 nodes): `Test subscriptions_page renders correct template.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2300`** (1 nodes): `Test new_subscription_page renders correct template.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2301`** (1 nodes): `Test new_subscription_page passes default settings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2302`** (1 nodes): `Test new_subscription_page passes None for subscription.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2303`** (1 nodes): `Test edit_subscription_page loads subscription data.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2304`** (1 nodes): `Test edit_subscription_page passes subscription to template.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2305`** (1 nodes): `Test edit_subscription_page handles subscription not found.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2306`** (1 nodes): `Test edit_subscription_page handles exception.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2307`** (1 nodes): `create_compat_db.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2308`** (1 nodes): `test_ssrf_protection.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2309`** (1 nodes): `Create a test Flask app with the scheduler blueprint.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2310`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2311`** (1 nodes): `Test quick_summary with a single retriever.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2312`** (1 nodes): `Test quick_summary with multiple retrievers.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2313`** (1 nodes): `Test detailed_research with retrievers.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2314`** (1 nodes): `Test generate_report with retrievers.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2315`** (1 nodes): `Test that research_id is generated if not provided.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2316`** (1 nodes): `Register stub endpoints for `auth.login` and `settings.settings_page`         s`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2317`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2318`** (1 nodes): `Test that users can only access their own objects.          BOLA/IDOR (Insecur`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2319`** (1 nodes): `Test protection of sensitive business logic flows.          Examples:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2320`** (1 nodes): `Test API documentation and version management.          Issues:         - Und`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2321`** (1 nodes): `Test secure consumption of external APIs.          LDR consumes external APIs:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2322`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2323`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2324`** (1 nodes): `Test that passwords are hashed using a secure algorithm.         LDR uses SQLCi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2325`** (1 nodes): `Test that password requirements are enforced (if applicable).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2326`** (1 nodes): `Test that passwords are never logged or exposed in errors.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2327`** (1 nodes): `Test that authentication timing is constant to prevent timing attacks.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2328`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2329`** (1 nodes): `Test that sessions expire appropriately.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2330`** (1 nodes): `Test that session ID is regenerated after login.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2331`** (1 nodes): `Test handling of concurrent sessions.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2332`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2333`** (1 nodes): `Test that @login_required decorator is used on protected routes.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2334`** (1 nodes): `Clarify difference between authentication and authorization.          Authenti`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2335`** (1 nodes): `Test that users can only access their own data.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2336`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2337`** (1 nodes): `open_file_location must validate path via PathValidator.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2338`** (1 nodes): `open_file_location must use validated path parent, not raw input.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2339`** (1 nodes): `open_file_location returns False if PathValidator rejects path.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2340`** (1 nodes): `open_file_location blocks path traversal via PathValidator.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2341`** (1 nodes): `Wrap the root conftest app fixture with CSRF enabled.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2342`** (1 nodes): `Create a test Flask app instance.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2343`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2344`** (1 nodes): `Create a test client with CSRF disabled for comparison.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2345`** (1 nodes): `Test that CSRF tokens are not leaked in logs or URLs.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2346`** (1 nodes): `Document CSRF protection strategy for LDR.          CSRF Protection Mechanisms`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2347`** (1 nodes): `Clarify difference between CSRF and CORS.          CSRF (Cross-Site Request Fo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2348`** (1 nodes): `Test that URL redirects are handled safely.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2349`** (1 nodes): `Document input validation best practices.          Defense in Depth - Input Va`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2350`** (1 nodes): `Document common input validation mistakes to avoid.          Common Mistakes:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2351`** (1 nodes): `Load non-comment, non-empty lines from .file-whitelist.txt.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2352`** (1 nodes): `Load non-comment, non-empty lines from CODEOWNERS.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2353`** (1 nodes): `Document the SSRF protection security model.          WHY THIS EXISTS:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2354`** (1 nodes): `Well-known public IPv4 addresses are not blocked.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2355`** (1 nodes): `Public IPs remain unblocked when allow_localhost=True.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2356`** (1 nodes): `Public IPs remain unblocked when allow_private_ips=True.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2357`** (1 nodes): `Whitelisted module '{module_path}' can be imported.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2358`** (1 nodes): `Create a test Flask app instance.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2359`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2360`** (1 nodes): `Test prevention of DOM-based XSS through JavaScript.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2361`** (1 nodes): `Test that stored XSS (persistent XSS) is prevented.         User-submitted cont`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2362`** (1 nodes): `Create a test client.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2363`** (1 nodes): `Test that various truthy string values convert to True.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2364`** (1 nodes): `Test that various falsy string values convert to False.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2365`** (1 nodes): `Test common environment variable values for true.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2366`** (1 nodes): `Test common environment variable values for false.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2367`** (1 nodes): `Clean environment before each test.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2368`** (1 nodes): `Clean environment before each test.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2369`** (1 nodes): `Clean environment before each test.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2370`** (1 nodes): `Clean environment before each test.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2371`** (1 nodes): `Clean environment before each test.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2372`** (1 nodes): `Clean environment before each test.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2373`** (1 nodes): `Test that 'unsafe' and 'raw' also map to 'none'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2374`** (1 nodes): `Import the module for tests.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2375`** (1 nodes): `Import the module for tests.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2376`** (1 nodes): `Test that various env values map to correct log levels.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2377`** (1 nodes): `Import the module for tests.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2378`** (1 nodes): `Test strategy with empty query string.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2379`** (1 nodes): `Test strategy with whitespace-only query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2380`** (1 nodes): `Test strategy with very long query.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2381`** (1 nodes): `Test strategy with unicode characters.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2382`** (1 nodes): `Test strategy with special characters.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2383`** (1 nodes): `Test when LLM returns empty response.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2384`** (1 nodes): `Test when LLM returns None.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2385`** (1 nodes): `Test when LLM raises an exception.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2386`** (1 nodes): `Test when search returns empty list.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2387`** (1 nodes): `Test when search returns None.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2388`** (1 nodes): `Test when search raises exception.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2389`** (1 nodes): `Test with search results missing expected fields.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2390`** (1 nodes): `Test with search results containing None values.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2391`** (1 nodes): `Test that callback receives valid progress values.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2392`** (1 nodes): `Test that exception in callback doesn't crash strategy.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2393`** (1 nodes): `Test multiple analyze_topic calls on same strategy instance.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2394`** (1 nodes): `Test that constrained strategies can analyze topics.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2395`** (1 nodes): `Test that dual confidence strategies work.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2396`** (1 nodes): `Test that modular strategies work.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2397`** (1 nodes): `Test getting formatter with number hyperlinks mode.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2398`** (1 nodes): `Test getting formatter with domain hyperlinks mode.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2399`** (1 nodes): `Test getting formatter with no hyperlinks mode.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2400`** (1 nodes): `Test getting formatter with invalid mode falls back to default.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2401`** (1 nodes): `Test citation formatting with real-world example.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2402`** (1 nodes): `Test automatic export to multiple formats based on settings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2403`** (1 nodes): `Load or generate themes.css content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2404`** (1 nodes): `Check each theme defines all required variables.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2405`** (1 nodes): `Check each theme defines RGB variants.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2406`** (1 nodes): `Check if a theme is a light theme based on name patterns.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2407`** (1 nodes): `Load themes.css content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2408`** (1 nodes): `Dark themes should have low luminance backgrounds.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2409`** (1 nodes): `Light themes should have high luminance backgrounds.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2410`** (1 nodes): `Load themes.css content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2411`** (1 nodes): `Check that critical CSS files use theme variables.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2412`** (1 nodes): `Load all CSS files content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2413`** (1 nodes): `Load themes.css content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2414`** (1 nodes): `Load themes.css content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2415`** (1 nodes): `Load themes.css content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2416`** (1 nodes): `Load themes.css content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2417`** (1 nodes): `Load themes.css content.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2418`** (1 nodes): `browser_config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2419`** (1 nodes): `test_api_key_simple_verify.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2420`** (1 nodes): `test_api_key_via_api.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2421`** (1 nodes): `test_context_overflow.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2422`** (1 nodes): `test_metrics.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2423`** (1 nodes): `test_metrics_chart.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2424`** (1 nodes): `test_metrics_with_llm.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2425`** (1 nodes): `test_research_submit.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2426`** (1 nodes): `test_settings_exploration.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2427`** (1 nodes): `test_settings_simple.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2428`** (1 nodes): `test_simple_cost.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2429`** (1 nodes): `test_toast_notifications.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2430`** (1 nodes): `test_scheduler_activity.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2431`** (1 nodes): `test_scheduler_simple.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2432`** (1 nodes): `auth-pages-mobile.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2433`** (1 nodes): `benchmark-page-mobile.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2434`** (1 nodes): `breakpoint-edge-cases.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2435`** (1 nodes): `embedding-settings-dropdown.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2436`** (1 nodes): `empty-states-mobile.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2437`** (1 nodes): `history-page-mobile.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2438`** (1 nodes): `interactive-states.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2439`** (1 nodes): `library-subpages-mobile.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2440`** (1 nodes): `loading-states-mobile.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2441`** (1 nodes): `metrics-subpages-mobile.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2442`** (1 nodes): `mobile-components.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2443`** (1 nodes): `mobile-ui-audit.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2444`** (1 nodes): `mobile-ui-issues.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2445`** (1 nodes): `news-subpages-mobile.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2446`** (1 nodes): `orientation-change.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2447`** (1 nodes): `research-page.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2448`** (1 nodes): `settings-subpages-mobile.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2449`** (1 nodes): `theme-switching-behavior.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2450`** (1 nodes): `untested-subpages.spec.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2451`** (1 nodes): `test_subscription_form.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2452`** (1 nodes): `The user-facing regression. Before the fix, calling         ``_close_base_llm```
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2453`** (1 nodes): `If the resolved URL is None/empty, fall back to localhost.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2454`** (1 nodes): `Whitespace around truthy strings should be stripped.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2455`** (1 nodes): `Only exact matches (after strip+lower) should be truthy.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2456`** (1 nodes): `Only '1' is truthy; other numeric strings are not.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2457`** (1 nodes): `Quotes around truthy values should NOT match.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2458`** (1 nodes): `Should return a dict.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2459`** (1 nodes): `Should contain all expected configuration keys.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2460`** (1 nodes): `Default host should be 0.0.0.0.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2461`** (1 nodes): `Default port should be 5000.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2462`** (1 nodes): `Default debug should be False.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2463`** (1 nodes): `Default use_https should be True.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2464`** (1 nodes): `Default allow_registrations should be True.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2465`** (1 nodes): `Default rate_limit_default value.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2466`** (1 nodes): `Default rate_limit_login value.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2467`** (1 nodes): `Default rate_limit_registration value.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2468`** (1 nodes): `Default rate_limit_settings value.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2469`** (1 nodes): `Default rate_limit_upload_user value.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2470`** (1 nodes): `Default rate_limit_upload_ip value.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2471`** (1 nodes): `Should return all defaults when no environment variables are set.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2472`** (1 nodes): `Recognized boolean env-var values should NOT trigger fail-closed override.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2473`** (1 nodes): `Unrecognized env-var value should force allow_registrations=False.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2474`** (1 nodes): `Should log a warning for unrecognized env-var value.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2475`** (1 nodes): `When env var is not set, allow_registrations should use default value.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2476`** (1 nodes): `Empty-string env var should trigger fail-closed (registrations=False).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2477`** (1 nodes): `Security-critical: allow_registrations=false from legacy file must be honored.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2478`** (1 nodes): `Env var should take priority over legacy file value.          We use _env_type`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2479`** (1 nodes): `Without a legacy file, defaults should be returned.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2480`** (1 nodes): `Corrupt JSON should log a warning and return defaults.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2481`** (1 nodes): `Invalid UTF-8 bytes should log a warning and return defaults.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2482`** (1 nodes): `Non-dict JSON (e.g. array) should log a warning and return defaults.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2483`** (1 nodes): `Partial legacy file: port from file, rest defaults.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2484`** (1 nodes): `Security warning with 'SECURITY' should be logged for allow_registrations.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2485`** (1 nodes): `Non-security settings should log at info level, not warning.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2486`** (1 nodes): `Unrecognized keys in legacy file produce a warning listing them.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2487`** (1 nodes): `Empty dict {} should produce no warnings and return defaults.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2488`** (1 nodes): `Info banner should be logged when recognized keys are present.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2489`** (1 nodes): `Legacy file with all default values should not produce per-key messages.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2490`** (1 nodes): `Legacy JSON 'allow_registrations': 'disabled' should fail closed.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2491`** (1 nodes): `Truthy recognized strings should NOT be overridden by the guard.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2492`** (1 nodes): `Falsy recognized strings — guard should not override.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2493`** (1 nodes): `Native JSON bool should not trigger the string guard.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2494`** (1 nodes): `When both env var and legacy JSON have bad values, the env var guard fires.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2495`** (1 nodes): `Ensure the 1% random sampling gate always passes so tests         exercise the`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2496`** (1 nodes): `period='all' → days=None → no time filter applied.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2497`** (1 nodes): `Unknown period string falls back to 30 days.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2498`** (1 nodes): `Any exception → returns zero-count fallback dict.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2499`** (1 nodes): `Build a MagicMock refDB whose .get_journals_page echoes the         per_page va`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2500`** (1 nodes): `When period='all', days is None so no time filter applied.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2501`** (1 nodes): `Tests the 'all' period branch where cutoff_time=0.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2502`** (1 nodes): `Resource with url=None should be skipped.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2503`** (1 nodes): `When getting user satisfaction raises an exception, it should fallback.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2504`** (1 nodes): `When record_count > 1000, it limits to 1000.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2505`** (1 nodes): `period='all' → days=None → no time filter.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2506`** (1 nodes): `When total_research is 0 after time filter, percentages should be 0.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2507`** (1 nodes): `Failures with error_type='RateLimitError' are counted as rate_limit_events.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2508`** (1 nodes): `estimate.success_rate > 0.8 → 'healthy'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2509`** (1 nodes): `0.5 < estimate.success_rate <= 0.8 → 'degraded'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2510`** (1 nodes): `estimate.success_rate <= 0.5 → 'poor'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2511`** (1 nodes): `No estimate → uses recent_success_rate with 80/50 thresholds.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2512`** (1 nodes): `period='all' → cutoff_time=0 → no time filter applied.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2513`** (1 nodes): `Ollama returns 200 with models list (new API format).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2514`** (1 nodes): `Ollama returns 200 with array (old API format).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2515`** (1 nodes): `Ollama returns 200 but invalid JSON.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2516`** (1 nodes): `Ollama returns non-200 status code.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2517`** (1 nodes): `Ollama connection refused.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2518`** (1 nodes): `Ollama request times out.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2519`** (1 nodes): `Model exists in Ollama (new API format).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2520`** (1 nodes): `Model not found in Ollama.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2521`** (1 nodes): `Ollama has no models.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2522`** (1 nodes): `Model name comparison should be case-insensitive.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2523`** (1 nodes): `Model name from query parameter overrides config.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2524`** (1 nodes): `Ollama API returns non-200.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2525`** (1 nodes): `Ollama returns invalid JSON.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2526`** (1 nodes): `Test with old Ollama API format (plain array).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2527`** (1 nodes): `Simulate the date replacement logic from start_research.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2528`** (1 nodes): `Value '[' is detected as corrupted; search.tool gets default 'auto'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2529`** (1 nodes): `Value '{}' is detected as corrupted; app.theme gets default 'dark'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2530`** (1 nodes): `report.* keys with corrupted values get replaced with empty dict.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2531`** (1 nodes): `When create_or_update_setting returns None, a validation error is recorded.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2532`** (1 nodes): `A new setting with a list value gets ui_element 'textarea'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2533`** (1 nodes): `Updating a warning-affecting key includes warnings in response.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2534`** (1 nodes): `PUT creates a new setting when key doesn't exist.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2535`** (1 nodes): `Update an existing editable setting.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2536`** (1 nodes): `Checkbox string value gets converted to bool.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2537`** (1 nodes): `Creating a new setting when key not in DB.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2538`** (1 nodes): `Creating a new setting that fails produces validation error.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2539`** (1 nodes): `Updating warning-affecting key includes warnings.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2540`** (1 nodes): `If favorites is not a list, it gets reset to empty list.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2541`** (1 nodes): `Bool value creates checkbox UI element.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2542`** (1 nodes): `Numeric value creates number UI element.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2543`** (1 nodes): `Dict value creates textarea UI element.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2544`** (1 nodes): `Database-prefixed key gets correct type.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2545`** (1 nodes): `Single boolean update uses enabled/disabled language.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2546`** (1 nodes): `Multiple updates use count message.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2547`** (1 nodes): `Unknown prefix is rejected by the namespace gate with 400.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2548`** (1 nodes): `Value '{' (single bracket) is detected as corrupted.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2549`** (1 nodes): `llm.temperature -> category=llm_parameters.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2550`** (1 nodes): `Response should only contain expected safe fields.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2551`** (1 nodes): `Test PDF generation from markdown`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2552`** (1 nodes): `Test PDF generation with embedded images`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2553`** (1 nodes): `Test PDF generation with tables`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2554`** (1 nodes): `Test PDF generation with code blocks`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2555`** (1 nodes): `Test PDF generation with math expressions`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2556`** (1 nodes): `Test PDF generation with unicode content`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2557`** (1 nodes): `Test PDF generation for large documents`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2558`** (1 nodes): `Test PDF page layout settings`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2559`** (1 nodes): `Test PDF headers and footers`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2560`** (1 nodes): `Test PDF table of contents generation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2561`** (1 nodes): `Test PDF hyperlink preservation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2562`** (1 nodes): `Test PDF metadata embedding`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2563`** (1 nodes): `Test error recovery during PDF generation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2564`** (1 nodes): `Test timeout handling during generation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2565`** (1 nodes): `Test text extraction from PDF`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2566`** (1 nodes): `Test handling corrupted PDF`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2567`** (1 nodes): `Test handling encrypted PDF`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2568`** (1 nodes): `Test handling scanned (image-based) PDF`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2569`** (1 nodes): `Test metadata extraction`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2570`** (1 nodes): `Test image extraction from PDF`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2571`** (1 nodes): `Test table extraction from PDF`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2572`** (1 nodes): `Test streaming extraction for large PDFs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2573`** (1 nodes): `Test extracting specific pages`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2574`** (1 nodes): `Test extraction timeout handling`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2575`** (1 nodes): `Test markdown to HTML conversion`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2576`** (1 nodes): `Test markdown extensions are applied`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2577`** (1 nodes): `Test default CSS is generated`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2578`** (1 nodes): `Test custom CSS is applied`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2579`** (1 nodes): `Socket errors in cleanup should not raise.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2580`** (1 nodes): `Research exists in DB in_progress state, not in active dict -> suspend it.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2581`** (1 nodes): `number_hyperlinks' maps to CitationMode.NUMBER_HYPERLINKS.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2582`** (1 nodes): `domain_hyperlinks' maps to CitationMode.DOMAIN_HYPERLINKS.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2583`** (1 nodes): `no_hyperlinks' maps to CitationMode.NO_HYPERLINKS.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2584`** (1 nodes): `An unrecognised setting value falls back to NUMBER_HYPERLINKS.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2585`** (1 nodes): `When the setting returns its default, formatter uses NUMBER_HYPERLINKS.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2586`** (1 nodes): `The format string is lowered before being passed to get_exporter.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2587`** (1 nodes): `When ExporterRegistry.get_exporter returns None, ValueError is raised.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2588`** (1 nodes): `Successful export returns (content, filename, mimetype).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2589`** (1 nodes): `Mixed-case format strings are normalised before lookup.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2590`** (1 nodes): `Cleanup calls cleanup_research to remove from active dicts.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2591`** (1 nodes): `Cleanup notifies queue processor of completion.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2592`** (1 nodes): `Cleanup handles socket emit failure gracefully.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2593`** (1 nodes): `Cleanup handles database session properly.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2594`** (1 nodes): `Progress callbacks integrate with socket service.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2595`** (1 nodes): `Progress callbacks queue database updates.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2596`** (1 nodes): `Report generation completes successfully.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2597`** (1 nodes): `Report PDF export succeeds.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2598`** (1 nodes): `Report PDF export handles failure.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2599`** (1 nodes): `Report generation commits to database.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2600`** (1 nodes): `Report generation handles database commit failure.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2601`** (1 nodes): `Citation formatter handles domain_id_hyperlinks mode.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2602`** (1 nodes): `Citation formatter handles domain_id_always_hyperlinks mode.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2603`** (1 nodes): `Test authenticated socket connection`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2604`** (1 nodes): `Test unauthenticated socket connection`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2605`** (1 nodes): `Test cleanup on disconnect`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2606`** (1 nodes): `Test reconnection handling`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2607`** (1 nodes): `Test session binding to socket`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2608`** (1 nodes): `Test namespace isolation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2609`** (1 nodes): `Test connection timeout handling`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2610`** (1 nodes): `Test heartbeat/ping mechanism`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2611`** (1 nodes): `Test max connections enforcement`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2612`** (1 nodes): `Test connection metadata storage`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2613`** (1 nodes): `Test rate limiting on connections`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2614`** (1 nodes): `Test emitting to single subscriber`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2615`** (1 nodes): `Test emitting to multiple subscribers`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2616`** (1 nodes): `Test emitting to room`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2617`** (1 nodes): `Test broadcast emission`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2618`** (1 nodes): `Test emit with acknowledgment callback`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2619`** (1 nodes): `Test emit with ack response`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2620`** (1 nodes): `Test emitting binary data`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2621`** (1 nodes): `Test emitting large payload`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2622`** (1 nodes): `Test emission queue management`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2623`** (1 nodes): `Test priority-based emission ordering`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2624`** (1 nodes): `Test retry on emission failure`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2625`** (1 nodes): `Test emission timeout handling`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2626`** (1 nodes): `Test batch emission optimization`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2627`** (1 nodes): `Test emission logging control`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2628`** (1 nodes): `Test emission thread safety`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2629`** (1 nodes): `Test handling lock contention`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2630`** (1 nodes): `Test handling subscriber errors`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2631`** (1 nodes): `Test partial emission failure handling`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2632`** (1 nodes): `Test emission metrics tracking`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2633`** (1 nodes): `Test event filtering before emission`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2634`** (1 nodes): `Test subscribing to research updates`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2635`** (1 nodes): `Test unsubscribing from research`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2636`** (1 nodes): `Test getting subscribers for research`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2637`** (1 nodes): `Test singleton pattern is enforced`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2638`** (1 nodes): `Should return dict containing search engine configs.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2639`** (1 nodes): `Should include 'auto' key in result.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2640`** (1 nodes): `Should add 'meta' as alias for 'auto'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2641`** (1 nodes): `Should include registered retrievers as search engines.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2642`** (1 nodes): `Should add library search engine when enabled.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2643`** (1 nodes): `Should skip library search engine when disabled.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2644`** (1 nodes): `Should return configured default search engine.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2645`** (1 nodes): `Should return 'wikipedia' as default when not configured.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2646`** (1 nodes): `Should query the correct setting key.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2647`** (1 nodes): `Should pass db_session to _get_setting.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2648`** (1 nodes): `Should pass settings_snapshot to _get_setting.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2649`** (1 nodes): `Run the agent function and return its output.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2650`** (1 nodes): `Run the quickstart function and return its output.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2651`** (1 nodes): `downloadBinary.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2652`** (1 nodes): `Convert a PIL Image to base64 string for IPC.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2653`** (1 nodes): `Resolve a list of local dataset paths to concrete file paths.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2654`** (1 nodes): `Determine the HF datasets loader type from file extensions.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2655`** (1 nodes): `Compatibility shim for routes that access backend.trainer.*`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2656`** (1 nodes): `Configure structured logging for the application.         Args:             serv`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2657`** (1 nodes): `Accept legacy 'split' field as alias for 'train_split'.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2658`** (1 nodes): `POST /api/providers/test → success: true.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2659`** (1 nodes): `POST /api/providers/models → non-empty list, print first 3.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2660`** (1 nodes): `POST /v1/chat/completions with provider fields → streamed reply.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2661`** (1 nodes): `Image URL + text message → non-empty streamed reply.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2662`** (1 nodes): `Calling is_vision_model() twice for the same model should invoke         the unc`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2663`** (1 nodes): `Different model names should each trigger detection.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2664`** (1 nodes): `The cached value must match what _is_vision_model_uncached returned.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2665`** (1 nodes): `Subprocess should only fire on the first call; second is cached.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2666`** (1 nodes): `A permanent failure (ValueError / RepositoryNotFoundError /         GatedRepoErr`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2667`** (1 nodes): `A transient failure (OSError, timeouts) should return None from         _is_visi`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2668`** (1 nodes): `A standard VLM detected via architecture suffix should be cached.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2669`** (1 nodes): `A standard text model (no VLM indicators) should cache False.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2670`** (1 nodes): `Models with vision_config (LLaVA, Qwen2-VL, etc.) should be cached as True.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2671`** (1 nodes): `Audio-only models (csm, whisper) with ForConditionalGeneration         should be`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2672`** (1 nodes): `Calls with different tokens should trigger separate detections to         handle`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2673`** (1 nodes): `Repeated calls with identical model + token should hit cache.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2674`** (1 nodes): `_studio_release_build.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2675`** (1 nodes): `speech-recognition.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2676`** (1 nodes): `aspect-ratio.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2677`** (1 nodes): `steps.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2678`** (1 nodes): `Extract cu* suffixes from the major/minor comparison chain in install.sh.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2679`** (1 nodes): `Extract cu* suffixes from the major/minor comparison chain in install.ps1.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2680`** (1 nodes): `Start the studio backend server without torch, yield (proc, port), then stop.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2681`** (1 nodes): `Skip if requirements files are missing.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2682`** (1 nodes): `test_mistral_non_peft.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2683`** (1 nodes): `test_whisper_non_peft.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2684`** (1 nodes): `NVIDIA host should NOT hit the ROCm path -- gets CPU asset (CUDA handled elsewhe`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2685`** (1 nodes): `AMD ROCm Linux host should get the ROCm prebuilt.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2686`** (1 nodes): `CPU-only Linux host should get CPU asset.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2687`** (1 nodes): `macOS arm64 host should get macOS asset.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2688`** (1 nodes): `Windows CPU-only host should get Windows CPU asset.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2689`** (1 nodes): `Windows ROCm host should get Windows HIP asset.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2690`** (1 nodes): `Host with both NVIDIA and ROCm should use NVIDIA (CPU path here, CUDA elsewhere)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2691`** (1 nodes): `AMD ROCm host should fall back to source build when no ROCm prebuilt exists.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2692`** (1 nodes): `Windows+ROCm with HIP prebuilt missing should fall through to CPU.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2693`** (1 nodes): `macOS host should never have has_rocm=True in practice; verify it gets macOS ass`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2694`** (1 nodes): `Linux aarch64 with ROCm -- no x86_64 match, should raise PrebuiltFallback.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2695`** (1 nodes): `No ROCm toolchain should skip entirely.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2696`** (1 nodes): `If torch already has CUDA, should skip ROCm reinstall.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2697`** (1 nodes): `If torch already has HIP, should skip ROCm reinstall.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2698`** (1 nodes): `CPU-only torch on ROCm host should trigger reinstall.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2699`** (1 nodes): `ROCm 6.3 should select rocm6.3 tag.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2700`** (1 nodes): `ROCm version too old (below 6.0) should skip.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2701`** (1 nodes): `ROCm detected but version unreadable should print warning and skip.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2702`** (1 nodes): `ROCm 7.2 should select rocm7.1 tag (capped, not in mapping).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2703`** (1 nodes): `Probe subprocess timeout should not crash; should proceed to reinstall.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2704`** (1 nodes): `ROCm tools present but no actual AMD GPU should skip entirely.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2705`** (1 nodes): `_auto_install.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2706`** (1 nodes): `llama4.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2707`** (1 nodes): `Compute the top-``rank`` orthogonal matrix via truncated SVD.          Args:`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2708`** (1 nodes): `Pipe character triggers shell=True so bash can interpret it.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2709`** (1 nodes): `Simple commands (no shell operators) must NOT use shell=True.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2710`** (1 nodes): `&& operator also triggers shell=True.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2711`** (1 nodes): `install_cli('jimeng') succeeds and invokes the pipe command via shell.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2712`** (1 nodes): `A non-zero exit from the curl|bash script surfaces as failure.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2713`** (1 nodes): `Uninstalling jimeng (no uninstall_cmd defined) returns a non-crash message.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2714`** (1 nodes): `After a successful install, jimeng appears in installed.json.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2715`** (1 nodes): `cli-install event name is static; CLI name lives in properties.cli.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2716`** (1 nodes): `cli-uninstall event name is static; CLI name lives in properties.cli.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2717`** (1 nodes): `cli-launch event fires with the CLI name in properties.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2718`** (1 nodes): `cli-hub call event sent when not detected as agent.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2719`** (1 nodes): `cli-hub call event captures the agent flag.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2720`** (1 nodes): `Clean env with a tty should not detect as agent.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2721`** (1 nodes): `First invocation sends cli-hub-installed event.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2722`** (1 nodes): `Second invocation does NOT send cli-hub-installed event.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2723`** (1 nodes): `When agent env detected, track_visit is called with the new cli-hub call metadat`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2724`** (1 nodes): `Post-install output includes both entry point and cli-hub launch hint.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2725`** (1 nodes): `launch execs the CLI entry point, passing through extra args.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2726`** (1 nodes): `launch fails gracefully when entry point not on PATH.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2727`** (1 nodes): `launch with an unknown CLI name exits with error.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2728`** (1 nodes): `List all saved sessions.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2729`** (1 nodes): `Test --json project info via subprocess.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2730`** (1 nodes): `Test --json export pdf via subprocess.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2731`** (1 nodes): `Test --json transpose by-key via subprocess.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2732`** (1 nodes): `Execute a macro step.          Args:             step: The MacroStep definiti`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2733`** (1 nodes): `Parse a condition dict like {file_exists: /tmp/out.png}.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2734`** (1 nodes): `Load a session from disk.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2735`** (1 nodes): `List all saved sessions (metadata only).`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2736`** (1 nodes): `Load session metadata from disk.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2737`** (1 nodes): `List all saved sessions.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2738`** (1 nodes): `Build a minimal snapshot dict.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2739`** (1 nodes): `Load session metadata from disk.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2740`** (1 nodes): `List all saved sessions.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2741`** (1 nodes): `build.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2742`** (1 nodes): `Test training a classification model.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2743`** (1 nodes): `Test training a regression model.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2744`** (1 nodes): `Test making predictions with a trained model.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2745`** (1 nodes): `Convert metrics (dict/list/numpy) to JSON-serializable format`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2746`** (1 nodes): `Check if unimol_tools is available`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2747`** (1 nodes): `Reset WireMock state before each test.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2748`** (1 nodes): `get_config_dir should force 700 permissions on POSIX.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2749`** (1 nodes): `save_tokens should force 600 on tokens.json on POSIX.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2750`** (1 nodes): `check-goal-protocol.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2751`** (1 nodes): `check-shared-agent-skills.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2752`** (1 nodes): `gbrain.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2753`** (1 nodes): `setup-gsd.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2754`** (1 nodes): `sync-goal-protocol-all.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2755`** (1 nodes): `update-shared-agent-skills.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2756`** (1 nodes): `use-local-deep-research-mcp.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2757`** (1 nodes): `use-unsloth-claude-code.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2758`** (1 nodes): `use-unsloth-openai-compatible.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2759`** (1 nodes): `vibium.ps1`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2760`** (1 nodes): `auto-tmux-dev.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2761`** (1 nodes): `check-console-log.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2762`** (1 nodes): `check-hook-enabled.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2763`** (1 nodes): `post-bash-build-complete.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2764`** (1 nodes): `post-bash-pr-created.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2765`** (1 nodes): `post-edit-console-warn.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2766`** (1 nodes): `post-edit-typecheck.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2767`** (1 nodes): `pre-bash-git-push-reminder.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2768`** (1 nodes): `pre-bash-tmux-reminder.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2769`** (1 nodes): `pre-write-doc-warn.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2770`** (1 nodes): `package-manager.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2771`** (1 nodes): `session-aliases.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2772`** (1 nodes): `session-manager.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2773`** (1 nodes): `utils.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2774`** (1 nodes): `claude-home.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2775`** (1 nodes): `codex-home.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2776`** (1 nodes): `opencode-home.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2777`** (1 nodes): `charts-bar-chart.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2778`** (1 nodes): `text-animations-word-highlight.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Utility modules for cli-anything-zotero.` connect `Community 2` to `Community 1`, `Community 3`, `Community 4`, `Community 5`, `Community 6`, `Community 7`, `Community 10`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 18`, `Community 20`, `Community 21`, `Community 23`, `Community 25`, `Community 26`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 37`, `Community 38`, `Community 42`, `Community 45`, `Community 47`, `Community 52`, `Community 55`, `Community 62`, `Community 64`, `Community 90`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Why does `BaseSearchEngine` connect `Community 5` to `Community 0`, `Community 1`, `Community 2`, `Community 129`, `Community 6`, `Community 135`, `Community 7`, `Community 12`, `Community 17`, `Community 22`, `Community 153`, `Community 28`, `Community 43`, `Community 53`, `Community 56`, `Community 69`, `Community 74`, `Community 77`, `Community 79`, `Community 214`, `Community 89`, `Community 96`, `Community 109`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `Session` connect `Community 3` to `Community 32`, `Community 2`, `Community 38`, `Community 72`, `Community 9`, `Community 75`, `Community 336`, `Community 19`, `Community 373`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Are the 1954 inferred relationships involving `Constraint` (e.g. with `Candidate` and `Base candidate class for tracking potential answers.`) actually correct?**
  _`Constraint` has 1954 INFERRED edges - model-reasoned connections that need verification._
- **Are the 1934 inferred relationships involving `CardSource` (e.g. with `CardFactory` and `Factory for creating and managing different types of cards. Handles card creati`) actually correct?**
  _`CardSource` has 1934 INFERRED edges - model-reasoned connections that need verification._
- **Are the 1787 inferred relationships involving `Session` (e.g. with `AnyGen CLI — Generate docs, slides, websites and more.` and `Task management — create, poll, download, and run tasks.`) actually correct?**
  _`Session` has 1787 INFERRED edges - model-reasoned connections that need verification._
- **Are the 1761 inferred relationships involving `ConstraintType` (e.g. with `ConstraintGuidedExplorer` and `Constraint-guided candidate explorer implementation.  This explorer uses const`) actually correct?**
  _`ConstraintType` has 1761 INFERRED edges - model-reasoned connections that need verification._