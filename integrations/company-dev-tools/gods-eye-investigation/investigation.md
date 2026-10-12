# God's Eye View: SeaBridgeAI climate and nature integration investigation

Investigated 2026-10-11. Upstream source pinned to `591f299d11f38a612629a274463196d57ae3862e` (package version 0.2.1). This is a read-only design investigation: no app changes, provider/data downloads, account registration, running globe, risk recalculation or deployment occurred. Selected code/docs are retained in `source/`; individual digests and line-level evidence are in `evidence.json`.

## Recommendation

Reuse selected environmental-feed design and provenance patterns inside the existing GIS/Mapbox interfaces. Do not embed the complete Cesium console or install a second surveillance/voice stack. The useful product outcome is a property-linked, time-labelled environmental context layer with explicit unavailable states. It is not a new climate or biodiversity risk score.

The current SeaBridgeAI GIS catalog already contains `esri_firms_fire` and `esri_land_cover` descriptors (`gis/adapters/land_cover/arcgis_adapter.py:135-146,190-202`). The frontend already has `EsriLayerPanel`, `useEsriLayers` and `PropertyRiskMap`. Verify those existing layers before building direct adapters. Catalog metadata is configuration evidence, not proof of a working, current, commercially admitted dataset.

Climate calculations remain paused. Any subsequent Climate implementation must obtain explicit resumption. Nature investigation does not resume the separate active Nature implementation assignment or bypass its Save/reopen/attachment priorities. No Cecil integration or egress is proposed.

## What could add value

| Capability | Product use | Meaning and limitations |
| --- | --- | --- |
| NASA FIRMS detections | Show recent fire detections near a verified asset/AOI; support operator investigation of a disturbance | Preserve sensor, acquisition UTC, native confidence and FRP in MW. A detection is not a burned-area perimeter, fire forecast, validated biodiversity loss or annual wildfire probability. Multiple sensors may observe the same event; upstream deliberately does not deduplicate across sources. |
| NOAA nowCOAST radar/infrared | Optional operational weather context around an asset | Radar reflectivity is dBZ, not rainfall depth or flood loss. Infrared imagery is not a classified cloud mask. Advertised observation time differs from fetch time. Preserve regional extent and gaps. |
| NOAA GFS / ECMWF IFS | Short-term forecast context for operators | Wind U/V at 10 m in m/s; optional 2 m temperature K to °C and sea-level pressure Pa to hPa. Store native units as well as transformations. Keep model issue time and forecast-valid time separately. Upstream resamples a 0.25° source to about 1° display; that does not become property-resolution evidence. |
| NOAA NHC/CPHC advisories | Display official forecast track/cone near portfolios in covered basins | Atlantic/eastern/central North Pacific only. Match advisory numbers across point, track and cone geometry. Cone describes uncertainty in center track, not full storm extent or loss. |
| USGS earthquake events | Separate geophysical incident context | Preserve event identifier, magnitude/type, depth km, source time and revisions. Earthquake is not a climate hazard. Upstream all-day feed/display filtering is not an earthquake hazard model or complete historical catalog. |
| Natural Earth regions | Coarse regional navigation and source labels | Appropriate for broad map context. Simplified global polygons are unsuitable as cadastral AOIs, ecological condition evidence or parcel-scale habitat boundaries. |

No land-cover-change, species-occurrence, protected-area, biodiversity-loss or habitat-condition implementation was identified in the pinned upstream tree. Nature Risk needs its own eligible ecological datasets and methods. Existing SeaBridgeAI ESA/land-cover tooling is the relevant source-specific lane; a globe display contributes presentation, not ecological validation.

## Reuse review from actual upstream code

Useful patterns include fixed provider endpoints, bounded response bodies, cancellation, singleflight cache refresh, source-specific partial states, latest-versus-stale distinction and staged imagery replacement. Weather uses a 12-second deadline, eight-request concurrency bound and bounded imagery cache; cyclone geometry and advisory consistency are checked. Wind retains both current and prior grid generations to avoid manifest/grid races.

Do not copy adapters wholesale. FIRMS currently fetches global feeds sequentially with up-to-60-second per-source deadlines and disk caching; a multi-tenant deployment needs bounded spatial queries, request/transaction limits and approved cache retention. Its CSV parser calls `finiteOrZero` for missing FRP/brightness (`src/data/firmsCsv.js:113-118`), which conflicts with SeaBridgeAI's missing-is-not-zero contract. Preserve missing measurements as null/unavailable. Do not convert categorical VIIRS confidence into invented numerical probabilities, or reinterpret MODIS confidence as risk effectiveness.

The WMS code is tuned to Cesium's geographic tiling. SeaBridgeAI uses Mapbox/Web Mercator: port the provider/time/bounds contract and explicitly test projection/axis order rather than copying geographic tile indices. Preserve MIT notices for reused substantial code and independently inspect dependencies; no third-party assets were fetched here.

## Exact proposed touchpoints, after a separately scoped implementation decision

1. **Backend service:** add `app/services/environmental_context.py` and provider modules under `app/services/environmental_context/`, or the matching GIS adapter namespace, for a small allowlisted set of feeds. Reuse existing HTTP/caching conventions. Check `app/services/climate_data/mrms.py` before introducing another MRMS path: current `/api/v1/gis/weather/mrms` returns numeric summaries from a Zarr mirror, while upstream nowCOAST returns observational imagery. Those are different contracts.
2. **Backend contract:** add `app/schemas/environmental_context.py` with explicit versioned metadata, bounded GeoJSON/rasters and state enums. Proposed fields: company/property IDs, source/product/version, source URL, license URL, attribution, native units, display units/transform, source CRS, source/display resolution, geographic coverage, observation interval or issue/valid time, fetched time, expiry, source revision/hash, uncertainty/confidence in native representation, data state and limitations. Keep context outside saved risk score fields.
3. **Backend route:** add authenticated, property-authorized `GET /api/v1/gis/environment/context?company_id=...&property_id=...&layer=...`; proposed raster companion `GET /api/v1/gis/environment/tiles/{product}/{time}/{z}/{x}/{y}` must authorize scope and bound geometry/time/size. Register through `app/api/v1/endpoints/gis_toolkit.py` (mounted under `/gis` in `app/api/v1/api.py:467`). The route should use the saved verified property geometry, not an arbitrary browser address or caller-supplied upstream URL. Public provider caches may be shared by immutable source request; property selections/results remain tenant scoped.
4. **Frontend:** reuse `src/components/map/EsriLayerPanel.tsx` and `src/hooks/useEsriLayers.ts` for existing catalog raster layers. A separately scoped `useEnvironmentalContext` hook and small metadata/legend panel could deliver direct event GeoJSON to `PropertyRiskMap.tsx` and the appropriate Nature AOI/assessment map. Preserve approved layout/tokens, existing map ownership and cleanup; no Cesium dependency or restyling. Keep attribution and time visible in screenshots/exports as well as live view.
5. **Nature boundary:** `useNatureLocationContext.ts` already expects a cache-only, property-scoped contract and explicitly supplies no score. A new environmental context contract should remain separate unless that existing contract is deliberately versioned. **Observed source gap:** this frontend calls `/api/v1/nature-risk/location-context/{companyId}`, but no matching route or contract string was found in current backend `app/` or `seabridge_ai/src/`. Verify the intended backend revision before promising hook reuse. Do not silently repair this unrelated mismatch in this task.

`physical_twin/context_layers.py` is currently a stub returning `[]`; it is not an installed external adapter. Do not claim integration based on its presence. OpenSeaBri consumers would need separately versioned HTTP responses if the context is exposed there; no direct coupling to upstream MCP or Node code in the MIT app.

## Source rights and exclusions

MIT applies to upstream source, not fetched or bundled data. Commercial candidates require a per-product receipt:

- Natural Earth's official terms explicitly permit commercial use; regional-scale accuracy still limits use.
- ECMWF's official Open Data page permits commercial use under CC BY 4.0 plus ECMWF terms. Retain attribution, modification notices and disclaimer; delivery/service charges can still apply.
- NOAA/NWS public information may be used under its disclaimer, subject to exceptions for third-party material, no endorsement and no presenting modified information as official. Check each exact product; derived lightning density does not license raw Vaisala detections.
- FIRMS and USGS are candidates based on upstream documentation; independently archive the exact dataset's official rights/acknowledgement and technical specification before enabling acquisition. NASA official pages were inaccessible through this research browser, so no complete independent NASA rights receipt is claimed.
- OSM datacenters/dams retain ODbL attribution and applicable database obligations. No general commercial clearance is inferred for provider basemaps or imagery.

Exclude TeleGeography submarine-cable data (CC BY-NC-SA 3.0), Bhote Koshi Vantor/GeoPera imagery **and** `src/data/bhoteKoshiFloodPath.js` derived coordinates (CC BY-NC 4.0) from commercial sources/builds absent separate permission. Remove scene imports/registrations in a future approved integration; omitting the public image directory alone leaves restricted derived data compiled. No existing source folder was deleted. Also exclude Google News personal/noncommercial briefing and third-party model assets; review Google/Cesium/Esri terms separately if using their map products.

## Phased acceptance

**Phase 0 — current task, completed investigation:** pinned selected source, actual interfaces, license carve-outs and unresolved gaps recorded. No live data readiness or product implementation claim.

**Phase 1 — smallest useful slice:** after required implementation/resumption authorization, select one commercially admitted feed and one property. Prefer first verifying the existing FIRMS catalog layer; if numeric detections are required, implement the explicit context contract. Use source-backed or clearly labelled fixture data for local contract checks. Test tenant rejection, invalid coordinates/bounds, antimeridian handling, native missing values, sensor confidence, time revisions, stale/empty/out-of-coverage, cancellation and cache races.

**Phase 2 — live acceptance:** obtain named bounded provider acquisition authorization/credentials where needed. On signed-in localhost:3000, show the agreed property's saved coordinates/AOI, source/time/units/coverage, real feed geometry and deliberate missing/stale states; verify reload, attribution and any approved export provenance. Distinguish this from fixture/tests/401/temporary-port evidence.

**Phase 3 — any risk-model use:** remains a separate scientific/model assignment with eligible historical/property inputs, defensible methods, calibration and uncertainty. Do not map a fire count, forecast wind grid, land-cover class or seismic magnitude directly into physical risk, resilience-adjusted risk, biodiversity rating or financial impact. No weights, thresholds or effectiveness are supplied by this investigation.
