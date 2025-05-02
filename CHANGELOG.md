# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2023-11-17

### Added
- New `metadata` field to store additional properties in a structured way
- Updated type definitions to support the metadata field
- Modified `trackEvent` function to properly separate standard fields from additional properties
- Added documentation and examples for using the metadata field

### Changed
- Events now strictly follow the schema, with all additional properties placed in the metadata field
- Improved TypeScript type safety for the analytics provider

## [1.1.0] - 2023-10-30

### Added
- Initial public release
- Support for automatic page view tracking
- Custom event tracking
- Device detection (mobile, tablet, desktop)
- Error handling support 